import { getInitialReadChunkParams, readChunk } from './reader';
import type { GTFSFileInfo } from '../file-info';
import type { GTFSFileRecords, GTFSFileRow } from '../types';
import { getInitialWriteChunkParams, getRecordsHeader, writeRecords } from './writer';
import { GTFSIOWriteOptions } from './types';

function normaliseWriteOptions(options?: GTFSIOWriteOptions): GTFSIOWriteOptions {
  if (!options) options = {};
  options.newline = options.newline ?? '\n';
  options.recordsBufferSize = options.recordsBufferSize ?? 64;
  return options;
}

/**
 * File IO
 */
export default class GTFSFileIO {
  protected constructor() {}

  /**
   * Read chunks and returns records.
   * @param file File information
   * @param chunks Iterable file content chunks
   * @returns Iterable records
   */
  public static *read<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, chunks: IterableIterator<string>): IterableIterator<RowType> {
    const params = getInitialReadChunkParams<RowType>(file);
    for (const chunk of chunks) {
      params.chunk = chunk.replace(/\r?\n/g, '\n');
      readChunk<RowType>(params);
      for (const record of params.records) yield record;
    }
    if (params.leftOver) {
      params.chunk = params.leftOver;
      params.leftOver = undefined;
      readChunk<RowType>(params);
      for (const record of params.records) yield record;
    }
    return;
  }

  /**
   * Write records into line contents.
   * @param file File Information
   * @param records Iterable records
   * @param options write options
   * @returns Iterable file contents by line
   */
  public static *write<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, records: GTFSFileRecords<RowType>, options?: GTFSIOWriteOptions): IterableIterator<string> {
    options = normaliseWriteOptions(options);
    const params = getInitialWriteChunkParams<RowType>(file);
    yield getRecordsHeader(params, options);
    for (const record of records) {
      params.records.push(record);
      if (params.records.length >= options.recordsBufferSize!) {
        writeRecords<RowType>(params, options);
        yield params.output;
        params.records = [];
      }
    }
    if (params.records.length) {
      writeRecords<RowType>(params, options);
      yield params.output;
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
  public static readContent<RowType extends GTFSFileRow>(file: GTFSFileInfo, content: string): RowType[] {
    return [...GTFSFileIO.read<RowType>(file, [content].values())];
  }

  /**
   * Write records into file content.
   * @param file File information
   * @param records Row records
   * @param options Write options
   * @returns File content
   */
  public static writeContent<RowType extends GTFSFileRow>(file: GTFSFileInfo, records: RowType[], options?: GTFSIOWriteOptions): string {
    return [...GTFSFileIO.write(file, records.values(), options)].join('');
  }
};
