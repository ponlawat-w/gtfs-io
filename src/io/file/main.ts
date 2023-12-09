import { getInitialReadChunkParams, readChunk } from './reader.js';
import { getInitialWriteChunkParams, getRecordsHeader, writeRecords } from './writer.js';
import type { GTFSIOWriteOptions } from './types.js';
import type { GTFSFileInfo } from '../../file-info.js';
import type { GTFSAsyncFileRecords, GTFSFileRecords, GTFSFileRow } from '../../types.js';

/**
 * Create or modify given options object to define default values if not provided.
 * @param options Options object
 * @returns Normalised writer options
 */
function normaliseWriteOptions(options?: GTFSIOWriteOptions): GTFSIOWriteOptions {
  if (!options) options = {};
  options.newline = options.newline ?? '\n';
  options.recordsBufferSize = options.recordsBufferSize ?? 64;
  return options;
}

/**
 * File IO
 */
export class GTFSFileIO {
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

/**
 * File Async IO
 */
export class GTFSAsyncFileIO {
  protected constructor() {}

  /**
   * Read chunks and returns records.
   * @param file File information
   * @param chunks Iterable file content chunks
   * @returns Iterable records
   */
  public static async *read<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, chunks: AsyncIterableIterator<string>): AsyncIterableIterator<RowType> {
    const params = getInitialReadChunkParams<RowType>(file);
    for await (const chunk of chunks) {
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
  public static async *write<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo, records: GTFSAsyncFileRecords<RowType>, options?: GTFSIOWriteOptions): AsyncIterableIterator<string> {
    options = normaliseWriteOptions(options);
    const params = getInitialWriteChunkParams<RowType>(file);
    yield getRecordsHeader(params, options);
    for await (const record of records) {
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
   * Await for all chunks and return all the records.
   * @param file File information
   * @param chunks Chunks generator
   * @returns Promise of all records
   */
  public static async readAll<RowType extends GTFSFileRow>(file: GTFSFileInfo, chunks: AsyncIterableIterator<string>): Promise<RowType[]> {
    const records: RowType[] = [];
    for await (const record of GTFSAsyncFileIO.read<RowType>(file, chunks)) {
      records.push(record);
    }
    return records;
  }

  /**
   * Read file content and return all the records.
   * @param file File information
   * @param content File content
   * @returns Promise of all records
   */
  public static async readAllContent<RowType extends GTFSFileRow>(file: GTFSFileInfo, content: string): Promise<RowType[]> {
    const generator = async function*() { yield content; };
    return GTFSAsyncFileIO.readAll(file, generator());
  }

  /**
   * Await for all records and return file content.
   * @param file File information
   * @param records Records generator
   * @param options Write options
   * @returns Promise of file content
   */
  public static async writeAll<RowType extends GTFSFileRow>(file: GTFSFileInfo, records: AsyncIterableIterator<RowType>, options?: GTFSIOWriteOptions): Promise<string> {
    let result = '';
    for await (const content of GTFSAsyncFileIO.write(file, records, options)) {
      result += content;
    }
    return result;
  }

  /**
   * Write file content from given records.
   * @param file File information
   * @param records Records array
   * @param options Write options
   * @returns Promise of all records
   */
  public static async writeAllRecords<RowType extends GTFSFileRow>(file: GTFSFileInfo, records: RowType[], options?: GTFSIOWriteOptions): Promise<string> {
    const generator = async function*() { for (const record of records) yield record; };
    return GTFSAsyncFileIO.writeAll(file, generator(), options);
  }
}
