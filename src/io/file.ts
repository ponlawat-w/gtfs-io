import { stringify, parse } from 'csv/sync';
import type { GTFSFileInfo } from '../file-info';
import type { GTFSFileRecords, GTFSFileRow } from '../types';

type ReadChunkObject<RowType extends GTFSFileRow = GTFSFileRow> = {
  file: GTFSFileInfo,
  columns: string[]|undefined,
  /** To redefine before reading chunk. */
  chunk: string,
  /** For returning. */
  records: RowType[],
  leftOver: string|undefined
};

/**
 * File IO
 */
export default class GTFSFileIO {
  protected constructor() {}

  private static readChunk<RowType extends GTFSFileRow = GTFSFileRow>(params: ReadChunkObject) {
    params.records = [];

    let content: string;
    if (params.leftOver === undefined) {
      content = params.chunk;
    } else {
      let lastNewLineIdx = params.chunk.lastIndexOf('\n');
      if (lastNewLineIdx < 0) {
        params.leftOver += params.chunk;
        params.chunk = '';
        return;
      }
      content = params.leftOver + params.chunk.slice(0, lastNewLineIdx);
      params.leftOver = params.chunk.slice(lastNewLineIdx + 1);
    }

    let rows: string[][] = [];
    while (content) {
      try {
        rows = parse(content) as string[][];
        break;
      } catch (ex: any) {
        if (ex && ex.code && ex.code === 'CSV_QUOTE_NOT_CLOSED') {
          let lastNewLineIdx = content.lastIndexOf('\n');
          content = content.slice(0, lastNewLineIdx);
          params.leftOver = content.slice(lastNewLineIdx) + params.leftOver;
          continue;
        }
        throw ex;
      }
    }

    if (!rows.length) {
      return;
    }

    if (params.columns === undefined) {
      params.columns = rows[0];
      rows.splice(0, 1);
    }

    const { columns } = params;
    params.records = rows.map(row => {
      let record: Record<string, any> = {};
      for (let i = 0; i < row.length; i++) {
        const field = columns ? columns[i] : undefined;
        if (!field) continue;
        const columnType = columns ? params.file.columns[field] : undefined;
        if (!columnType) continue;
        if (columnType === 'int') {
          record[columns![i]] = parseInt(row[i]);
        } else if (columnType === 'float') {
          record[columns![i]] = parseFloat(row[i]);
        } else if (columnType === 'ioe') {
          record[columns![i]] = row[i].trim() ? parseInt(row[i]) : '';
        } else {
          record[columns![i]] = row[i].toString();
        }
      }
      return record as RowType;
    });
  }

  /**
   * Read lines and returns records.
   * @param file File information
   * @param chunks Iterable file content chunks
   * @returns Iterable records
   */
  public static *readSync<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, chunks: IterableIterator<string>): IterableIterator<RowType> {
    const params: ReadChunkObject<RowType> = {
      file,
      columns: undefined,
      chunk: '',
      records: [],
      leftOver: ''
    };
    for (const chunk of chunks) {
      params.chunk = chunk.replace(/\r?\n/g, '\n');
      GTFSFileIO.readChunk<RowType>(params);
      for (const record of params.records) {
        yield record;
      }
    }
    if (params.leftOver) {
      params.chunk = params.leftOver;
      params.leftOver = undefined;
      GTFSFileIO.readChunk<RowType>(params);
      for (const record of params.records) {
        yield record;
      }
    }
    return;
  }

  /**
   * Write records into line contents.
   * @param file File Information
   * @param records Iterable records
   * @param newLine New line delimiter
   * @returns Iterable file contents by line
   */
  public static *writeSync(file: GTFSFileInfo, records: GTFSFileRecords, newLine = '\n'): IterableIterator<string> {
    const columns = Object.keys(file.columns);
    yield stringify([columns], { record_delimiter: newLine });

    for (const record of records) {
      yield stringify([columns.map(c => (record as Record<string, any>)[c] ?? undefined)], { record_delimiter: newLine });
    }
    
    return;
  }

  /**
   * Read file content into records array.
   * @param file File information
   * @param content File content
   * @param newLine Line separator (default: \n)
   * @returns Array of record
   */
  public static readContentSync<RowType extends GTFSFileRow>(file: GTFSFileInfo, content: string): RowType[] {
    return [...GTFSFileIO.readSync<RowType>(file, [content].values())];
  }

  /**
   * Write records into array of lines content.
   * @param file File information
   * @param records Row records
   * @param newLine Line separator (default: \n)
   * @returns Lines array
   */
  public static writeLinesSync<RowType extends GTFSFileRow>(file: GTFSFileInfo, records: RowType[], newLine = '\n'): string[] {
    return [...GTFSFileIO.writeSync(file, records.values(), newLine)];
  }

  /**
   * Write records into file content.
   * @param file File information
   * @param records Row records
   * @param newLine Line separator (default: \n)
   * @returns File content
   */
  public static writeContentSync<RowType extends GTFSFileRow>(file: GTFSFileInfo, records: RowType[], newLine = '\n'): string {
    return GTFSFileIO.writeLinesSync(file, records, newLine).join('');
  }
};
