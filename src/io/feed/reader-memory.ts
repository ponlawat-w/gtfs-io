import AdmZip from 'adm-zip';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { GTFSFeedReaderBase } from './reader-base.js';
import { GTFSFeedBase } from '../../feed/base.js';
import { getGTFSFileInfos } from '../../file-info.js';
import type { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable';
import type { GTFSLoadedFeed } from '../../feed/loaded';
import type { GTFSFileInfo } from '../../file-info';
import type { GTFSAsyncFileRecords, GTFSFileContent, GTFSFileRecords } from '../../types';

/**
 * GTFS file object to read
 */
type GTFSFile = {
  /** File information */
  info: GTFSFileInfo,
  /** File content array buffer */
  content: Buffer
};

/**
 * Feed Reader with input in memory.
 */
abstract class GTFSFeedReaderFromMemoryBase<RecordsType extends GTFSFileRecords|GTFSAsyncFileRecords, FeedType extends GTFSFeedBase<RecordsType>|Promise<GTFSFeedBase<RecordsType>>> extends GTFSFeedReaderBase<RecordsType, FeedType> {
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
    fileContents?: GTFSFileContent[]
  ) {
    super()
    if (zip) {
      this.zip = new AdmZip(typeof zip === 'string' || Buffer.isBuffer(zip) ? zip : Buffer.from(zip));
      return;
    }
    this.files = [];
    if (fileContents) {
      for (const info of getGTFSFileInfos()) {
        const file = fileContents.filter(f => f.name === info.fileName);
        if (!file.length) continue;
        this.files.push({ info, content: Buffer.from(file[0].content) })
      }
      return;
    }
    throw new Error('Invalid constructor argument');
  }

  /**
   * Get records from an AdmZip entry.
   * @param info File information
   * @param entry Zip entry
   */
  protected abstract getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): RecordsType;
  /**
   * Get records from file content.
   * @param info File information
   * @param content File content buffer
   */
  protected abstract getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): RecordsType;

  public abstract loadFeed(): GTFSLoadedFeed|Promise<GTFSLoadedFeed>;
  public abstract getFeed(): FeedType;

  public getRecords(info: GTFSFileInfo): RecordsType|undefined {
    if (this.zip) {
      const entry = this.zip.getEntries().filter(entry => entry.entryName === info.fileName);
      if (!entry.length) return undefined;
      return this.getRecordsFromZipEntry(info, entry[0]);
    } else if (this.files) {
      const file = this.files.filter(f => f.info.fileName === info.fileName);
      if (!file.length) return undefined;
      return this.getRecordsFromFileContent(info, file[0].content);
    }
    return undefined;
  }
};

/**
 * Synchronous Feed Reader from Data in Memory
 */
export class GTFSFeedReaderFromMemory extends GTFSFeedReaderFromMemoryBase<GTFSFileRecords, GTFSIterableFeed> {
  protected getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(entry.getData().toString()).values();
  }

  protected getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(content.toString()).values();
  }

  public getFeed(): GTFSIterableFeed {
    return super.getFeedSync();
  }

  public loadFeed(): GTFSLoadedFeed {
    return super.loadFeedSync();
  }

  /**
   * Create an instance of GTFSFeedWriter from zip file.
   * @param zip Zip file path or content buffer
   * @returns GTFSFeedWriter instance
   */
  public static fromZip(zip: string|Buffer|ArrayBuffer): GTFSFeedReaderFromMemory {
    return new GTFSFeedReaderFromMemory(zip);
  }

  /**
   * Create an instance of GTFSFeedWriter from in-memory file contents.
   * @param files Feed files object
   * @returns GTFSFeedWriter instance
   */
  public static fromFileContents(files: GTFSFileContent[]): GTFSFeedReaderFromMemory {
    return new GTFSFeedReaderFromMemory(undefined, files);
  }
};

/**
 * Asynchronous Feed Reader from Data in Memory
 */
export class GTFSAsyncFeedReaderFromMemory extends GTFSFeedReaderFromMemoryBase<GTFSAsyncFileRecords, GTFSAsyncIterableFeed> {
  protected getRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield entry.getData().toString(); };
    return io.read(generator());
  }

  protected getRecordsFromFileContent(info: GTFSFileInfo, content: Buffer): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield content.toString(); };
    return io.read(generator());
  }

  public getFeed(): GTFSAsyncIterableFeed {
    return super.getFeedAsync();
  }

  public loadFeed(): Promise<GTFSLoadedFeed> {
    return super.loadFeedAsync();
  }

  /**
   * Create an instance of GTFSFeedWriter from zip file.
   * @param zip Zip file path or content buffer
   * @returns GTFSFeedWriter instance
   */
  public static fromZip(zip: string|Buffer|ArrayBuffer): GTFSAsyncFeedReaderFromMemory {
    return new GTFSAsyncFeedReaderFromMemory(zip);
  }

  /**
   * Create an instance of GTFSFeedWriter from in-memory file contents.
   * @param files Feed files object
   * @returns GTFSFeedWriter instance
   */
  public static fromFileContents(files: GTFSFileContent[]): GTFSAsyncFeedReaderFromMemory {
    return new GTFSAsyncFeedReaderFromMemory(undefined, files);
  }
}
