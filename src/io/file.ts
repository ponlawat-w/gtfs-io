import { stringify, parse } from 'csv/sync';
import type { GTFSFileInfo } from '../file-info';
import type { GTFSFileRecords, GTFSFileRow } from '../types';

/**
 * File IO
 */
export default class GTFSFileIO {
  protected constructor() {}

  /**
   * Read lines and returns records.
   * @param file File information
   * @param lines Iterable file contents by line
   * @returns Iterable records
   */
  public static *readSync<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, lines: IterableIterator<string>): IterableIterator<RowType> {
    const head = lines.next();
    if (head.done) return;
    if (!head.value || !head.value.trim()) return;
    let columns = (parse(head.value) as string[][])[0]
      .map(c => c.trim())
      .filter(c => file.columns[c]);

    let lineContent = '';
    for (const line of lines) {
      lineContent += line;
      if (!lineContent.trim()) continue;

      let row: string[];
      try {
        row = (parse(lineContent) as string[][])[0].slice(0, columns.length);
        lineContent = '';
      } catch (ex: any) {
        if (ex && ex.code && ex.code === 'CSV_QUOTE_NOT_CLOSED') {
          lineContent += '\n';
          continue;
        }
        throw ex;
      }

      let record: Record<string, any> = {};
      for (let i = 0; i < row.length; i++) {
        const columnType = file.columns[columns[i]];
        if (columnType === 'int') {
          record[columns[i]] = parseInt(row[i]);
        } else if (columnType === 'float') {
          record[columns[i]] = parseFloat(row[i]);
        } else if (columnType === 'ioe') {
          record[columns[i]] = row[i].trim() ? parseInt(row[i]) : '';
        } else {
          record[columns[i]] = row[i].toString();
        }
      }
      yield record as RowType;
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
   * Read array of content lines into records array.
   * @param file File information
   * @param lines Array of content lines
   * @returns Array of records
   */
  public static readLinesSync<RowType extends GTFSFileRow>(file: GTFSFileInfo, lines: string[]): RowType[] {
    return [...GTFSFileIO.readSync<RowType>(file, lines.values())];
  }

  /**
   * Read file content into records array.
   * @param file File information
   * @param content File content
   * @param newLine Line separator (default: \n)
   * @returns Array of record
   */
  public static readContentSync<RowType extends GTFSFileRow>(file: GTFSFileInfo, content: string, newLine = '\n'): RowType[] {
    return GTFSFileIO.readLinesSync<RowType>(file, content.split(newLine));
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
