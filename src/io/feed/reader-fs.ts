import AdmZip from 'adm-zip';
import {
  statSync,
  existsSync as exists,
  openSync as openFile,
  read as readAsync,
  readSync as readFileSync
} from 'fs';
import { join as joinPath } from 'path';
import { GTFSFeedReaderBase } from './reader-base.js';
import { getGTFSFileInfos } from '../../file-info.js';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import type { GTFSFeedBase } from '../../feed/base';
import type { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable';
import type { GTFSLoadedFeed } from '../../feed/loaded';
import type { GTFSFileInfo } from '../../file-info';
import type { GTFSAsyncFileRecords,  GTFSFileRecords } from '../../types';

/**
 * GTFS file object to read
 */
type GTFSFile = {
  /** File information */
  info: GTFSFileInfo,
  /** File path */
  path: string
};

abstract class GTFSFeedReaderFromFileBase<RecordsType extends GTFSFileRecords|GTFSAsyncFileRecords, FeedType extends GTFSFeedBase<RecordsType>|Promise<GTFSFeedBase<RecordsType>>> extends GTFSFeedReaderBase<RecordsType, FeedType> {
  /** Zip object */
  protected zip?: AdmZip = undefined;

  /** File objects */
  protected files?: GTFSFile[] = undefined;

  /**
   * The constructor
   * @param Directory Path to directory
   */
  public constructor(readPath: string) {
    super();
    if (statSync(readPath).isDirectory()) {
      this.files = [];
      for (const info of getGTFSFileInfos()) {
        const path = joinPath(readPath, info.fileName);
        if (!exists(path)) continue;
        this.files.push({ info, path });
      }
      return;
    }
    this.zip = new AdmZip(readPath);
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
      return this.getRecordsFromFilePath(info, file[0].path);
    }
    return undefined;
  }
};

export class GTFSFeedReaderFromFile extends GTFSFeedReaderFromFileBase<GTFSFileRecords, GTFSIterableFeed> {
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
    const chunks = GTFSFeedReaderFromFile.readFileChunks(path);
    for (const record of io.read(chunks)) {
      yield record;
    }
  }

  public getFeed(): GTFSIterableFeed {
    return super.getFeedSync();
  }

  public loadFeed(): GTFSLoadedFeed {
    return super.loadFeedSync();
  }
};

export class GTFSAsyncFeedReaderFromFile extends GTFSFeedReaderFromFileBase<GTFSAsyncFileRecords, GTFSAsyncIterableFeed> {
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
    return io.read(GTFSAsyncFeedReaderFromFile.readFileChunks(path));
  }

  public getFeed(): GTFSAsyncIterableFeed {
    return super.getFeedAsync();
  }

  public loadFeed(): Promise<GTFSLoadedFeed> {
    return super.loadFeedAsync();
  }
}
