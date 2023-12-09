import AdmZip from 'adm-zip';
import {
  existsSync as exists,
  openSync as openFile,
  read as readAsync,
  readSync as readFileSync
} from 'fs';
import { join as joinPath } from 'path';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { getGTFSFileInfos } from '../../file-info.js';
import { GTFSFeedBase } from '../../feed/base.js';
import { GTFSLoadedFeed } from '../../feed/loaded.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable.js';
import type { GTFSFileInfo } from '../../file-info.js';
import type { GTFSAsyncFileRecords, GTFSFileContent, GTFSFileRecords } from '../../types.js';

/**
 * GTFS file object to read
 */
type GTFSFile = {
  /** File information */
  info: GTFSFileInfo,
  /** File path */
  path?: string,
  /** File content buffer */
  buffer?: Buffer
};

/**
 * GTFS feed reader abstract
 */
abstract class FeedReader<RecordsType, FeedType extends GTFSFeedBase<RecordsType>|Promise<GTFSFeedBase<RecordsType>>> {
  /** Zip object */
  protected zip?: AdmZip = undefined;

  /** File objects */
  protected files?: GTFSFile[] = undefined;

  /**
   * Constructor, the object of this class is to be created by static methods.
   * The constructor is limited for internal calling.
   * @param zip Zip file path or buffer
   * @param directoryPath Directory path
   * @param fileContents Array of file content objects
   */
  protected constructor(
    zip?: string|Buffer|ArrayBuffer,
    directoryPath?: string,
    fileContents?: GTFSFileContent[]
  ) {
    if (zip) {
      this.zip = new AdmZip(typeof zip === 'string' || Buffer.isBuffer(zip) ? zip : Buffer.from(zip));
      return;
    }
    this.files = [];
    if (directoryPath) {
      for (const info of getGTFSFileInfos()) {
        const path = joinPath(directoryPath, info.fileName);
        if (!exists(path)) continue;
        this.files.push({ info, path });
      }
      return;
    }
    if (fileContents) {
      for (const info of getGTFSFileInfos()) {
        const file = fileContents.filter(f => f.name === info.fileName);
        if (!file.length) continue;
        this.files.push({ info, buffer: Buffer.from(file[0].content) })
      }
      return;
    }
  }

  /**
   * Get records from an AdmZip entry.
   * @param info File information
   * @param entry Zip entry
   */
  protected abstract getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): RecordsType;
  /**
   * Get records from file path.
   * @param info File information
   * @param path File path
   */
  protected abstract getRecordsFromFilePath(info: GTFSFileInfo, path: string): RecordsType;
  /**
   * Get records from file content.
   * @param info File information
   * @param content File content buffer
   */
  protected abstract getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): RecordsType;
  /**
   * Read all records and load into array in memory.
   */
  public abstract loadFeed(): GTFSLoadedFeed|Promise<GTFSLoadedFeed>;

  /**
   * From file information, get records.
   * Undefined if file does not exist in the feed.
   * @param info file information
   * @returns Records
   */
  public getRecords(info: GTFSFileInfo): RecordsType|undefined {
    if (this.zip) {
      const entry = this.zip.getEntries().filter(entry => entry.entryName === info.fileName);
      if (!entry.length) return undefined;
      return this.getRecordsFromZipEntry(info, entry[0]);
    } else if (this.files) {
      const file = this.files.filter(f => f.info.fileName === info.fileName);
      if (!file.length) return undefined;
      if (file[0].path) {
        return this.getRecordsFromFilePath(info, file[0].path);
      } else if (file[0].buffer) {
        return this.getRecordsFromFileContent(info, file[0].buffer);
      }
    }
    return undefined;
  }

  /**
   * Get feed object with row being file name without .txt and value being iterable records.
   * @returns Feed object with row being file name without .txt and value being iterable records.
   */
  public abstract getFeed(): FeedType;
};

/**
 * GTFS feed reader.
 * Do not use constructor, instead, use the following static methods to initiate an instance:
 * GTFSFeedReader.fromZip,
 * GTFSFeedReader.fromDirectory,
 * GTFSFeedReader.fromFiles
 */
export class GTFSFeedReader extends FeedReader<GTFSFileRecords, GTFSIterableFeed> {
  /**
   * Generator of iterable chunks from a file path.
   * @param filePath File path
   * @returns Iterable file chunks
   */
  private static *readFileChunks(filePath: string): IterableIterator<string> {
    const file = openFile(filePath, 'r');
    const bufferSize = 1024;
    const buffer = Buffer.alloc(bufferSize);
    let leftOver = '';
    
    let readPos;
    while ((readPos = readFileSync(file, buffer, 0, bufferSize, null)) !== 0) {
      const content = leftOver + buffer.toString('utf8', 0, readPos);
      const newLineIdx = content.lastIndexOf('\n');
      yield content.slice(0, newLineIdx);
      leftOver = content.slice(newLineIdx);
    }

    if (leftOver) yield leftOver;
    return;
  }

  protected getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(entry.getData().toString()).values();
  }
  
  protected *getRecordsFromFilePath(info: GTFSFileInfo, path: string): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    const chunks = GTFSFeedReader.readFileChunks(path);
    for (const record of io.read(chunks)) {
      yield record;
    }
  }

  protected getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(content.toString()).values();
  }

  public getFeed(): GTFSIterableFeed {
    const feed = new GTFSIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo);
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  public loadFeed(): GTFSLoadedFeed {
    return this.getFeed().load();
  }

  /**
   * Create an instance of GTFSFeedWriter from zip file.
   * @param zip Zip file path or content buffer
   * @returns GTFSFeedWriter instance
   */
  public static fromZip(zip: string|Buffer|ArrayBuffer): GTFSFeedReader {
    return new GTFSFeedReader(zip);
  }

  /**
   * Create an instance of GTFSFeedWriter from directory path.
   * @param dirPath Path to GTFS feed directory
   * @returns GTFSFeedWriter instance
   */
  public static fromDirectoy(dirPath: string): GTFSFeedReader {
    return new GTFSFeedReader(undefined, dirPath);
  }

  /**
   * Create an instance of GTFSFeedWriter from in-memory file contents.
   * @param files Feed files object
   * @returns GTFSFeedWriter instance
   */
  public static fromFiles(files: GTFSFileContent[]): GTFSFeedReader {
    return new GTFSFeedReader(undefined, undefined, files);
  }
};

/**
 * GTFS feed reader.
 * Do not use constructor, instead, use the following static methods to initiate an instance:
 * GTFSFeedReader.fromZip,
 * GTFSFeedReader.fromDirectory,
 * GTFSFeedReader.fromFiles
 */
export class GTFSAsyncFeedReader extends FeedReader<GTFSAsyncFileRecords, Promise<GTFSAsyncIterableFeed>> {
  /**
   * Generator of iterable chunks from a file path.
   * @param filePath File path
   * @returns Iterable file chunks
   */
  private static async *readFileChunks(filePath: string): AsyncIterableIterator<string> {
    const file = openFile(filePath, 'r');
    const bufferSize = 1024;
    const buffer = Buffer.alloc(bufferSize);
    let leftOver = '';

    const reads = (): Promise<number> => new Promise((resolve, reject) => {
      readAsync(file, buffer, 0, bufferSize, null, (err, pos) => {
        if (err) return reject(err);
        resolve(pos);
      });
    });
    
    let readPos = -1;
    while (readPos !== 0) {
      readPos = await reads();
      const content = leftOver + buffer.toString('utf8', 0, readPos);
      const newLineIdx = content.lastIndexOf('\n');
      yield content.slice(0, newLineIdx);
      leftOver = content.slice(newLineIdx);
    }

    if (leftOver) yield leftOver;
    return;
  }

  protected getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield entry.getData().toString(); };
    return io.read(generator());
  }

  protected getRecordsFromFilePath(info: GTFSFileInfo, path: string): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    return io.read(GTFSAsyncFeedReader.readFileChunks(path));
  }

  protected getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield content.toString(); };
    return io.read(generator());
  }

  public async getFeed(): Promise<GTFSAsyncIterableFeed> {
    const feed = new GTFSAsyncIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo);
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  public async loadFeed(): Promise<GTFSLoadedFeed> {
    return (await this.getFeed()).load();
  }

  /**
   * Create an instance of GTFSFeedWriter from zip file.
   * @param zip Zip file path or content buffer
   * @returns GTFSFeedWriter instance
   */
  public static fromZip(zip: string|Buffer|ArrayBuffer): GTFSAsyncFeedReader {
    return new GTFSAsyncFeedReader(zip);
  }

  /**
   * Create an instance of GTFSFeedWriter from directory path.
   * @param dirPath Path to GTFS feed directory
   * @returns GTFSFeedWriter instance
   */
  public static fromDirectoy(dirPath: string): GTFSAsyncFeedReader {
    return new GTFSAsyncFeedReader(undefined, dirPath);
  }

  /**
   * Create an instance of GTFSFeedWriter from in-memory file contents.
   * @param files Feed files object
   * @returns GTFSFeedWriter instance
   */
  public static fromFiles(files: GTFSFileContent[]): GTFSAsyncFeedReader {
    return new GTFSAsyncFeedReader(undefined, undefined, files);
  }
}
