import { stringify, parse } from 'csv/sync';
import { GTFSRow } from '../types';
import { GTFSFileInfo } from '../file-info';

export default class GTFSFileIO {
  private constructor() {}

  public static *read<FileType extends GTFSRow>(file: GTFSFileInfo, lines: IterableIterator<string>): IterableIterator<FileType> {
    const head = lines.next();
    if (head.done) return;
    if (!head.value || !head.value.trim()) return;
    let columns = (parse(head.value) as string[][])[0]
      .map(c => c.trim())
      .filter(c => file.columns[c]);

    for (const line of lines) {
      if (!line.trim()) continue;
      let row = (parse(line) as string[][])[0].slice(0, columns.length);
      let record: Record<string, any> = {};

      for (let i = 0; i < row.length; i++) {
        const column = file.columns[columns[i]];
        record[columns[i]] = column === 'string' ? row[i].toString() : parseInt(row[i]);
      }
      yield record as FileType;
    }

    return;
  }

  public static *write<FileType extends GTFSRow>(file: GTFSFileInfo, records: IterableIterator<FileType>): IterableIterator<string> {
    const columns = Object.keys(file.columns);
    yield stringify([columns], { record_delimiter: '' });

    for (const record of records) {
      yield stringify([columns.map(c => (record as Record<string, any>)[c] ?? undefined)], { record_delimiter: '' });
    }
    
    return;
  }
};
