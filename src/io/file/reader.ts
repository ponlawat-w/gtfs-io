import { parse } from 'csv/sync';
import type { GTFSFileInfo } from '../../file-info.d.ts';
import type { GTFSFileRow } from '../../types.d.ts';

/**
 * Parameter for readChunk()
 */
export type ReadChunkParam<RowType extends GTFSFileRow = GTFSFileRow> = {
  /** GTFS file information, to be defined once. */
  file: GTFSFileInfo,
  /** Columns (table header), array if have been read, undefined if not yet. The method alters this property. */
  columns: string[]|undefined,
  /** Input, to redefine this property before calling GTFSFileIO.readChunk. */
  chunk: string,
  /** Output, this will get set by the method. */
  records: RowType[],
  /**
   * Input, leave as is or set to undefine for the last iteration.
   * It contains string (or empty string) when there is left over string from the previous iteration to prepend to the current chunk.
   * It contains undefuned for the last iteration.
   */
  leftOver: string|undefined
};

/**
 * Get initial state of read chunk parameters.
 * @param file File information
 * @returns Object of chunk reading parameters in the initial state
 */
export function getInitialReadChunkParams<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo): ReadChunkParam<RowType> {
  return {
    file,
    columns: undefined,
    chunk: '',
    records: [],
    leftOver: ''
  };
};

/**
 * Read chunk to records, this alter params object in the argument.
 * @param params Chunk reading parameters
 */
export function readChunk<RowType extends GTFSFileRow = GTFSFileRow>(params: ReadChunkParam<RowType>) {
  params.records = [];

  // Cut the current chunk until the last occurence of new line, in case of the last line of current chunk is not complete.
  // Read chunk to content by appending to the previous leftover,
  // and set the next leftover to be the substring after the last occurence of new line.
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

  // If content cannot be parsed due to quotes not being closed,
  // cut the last line out of the content and prepend it to the leftover.
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

  // If columns are not defined, then the first row is.
  if (params.columns === undefined) {
    params.columns = rows[0];
    rows.splice(0, 1);
  }

  // Parse rows and set records.
  const { columns } = params;
  params.records = rows.map(row => {
    let record: Record<string, any> = {};
    for (let i = 0; i < row.length; i++) {
      const field = columns ? columns[i] : undefined;
      if (!field) continue;
      const columnType = columns ? params.file.columns[field] : undefined;
      if (!columnType) continue;
      if (columnType === 'int') {
        record[columns![i]] = row[i].trim() ? parseInt(row[i]) : undefined;
      } else if (columnType === 'float') {
        record[columns![i]] = row[i].trim() ? parseFloat(row[i]) : undefined;
      } else if (columnType === 'ioe') {
        record[columns![i]] = row[i].trim() ? parseInt(row[i]) : '';
      } else {
        record[columns![i]] = row[i].toString();
      }
    }
    return record as RowType;
  });
};
