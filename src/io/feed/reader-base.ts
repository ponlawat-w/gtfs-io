import AdmZip from 'adm-zip';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable.js';
import { getGTFSFileInfos } from '../../file-info.js';
import type { GTFSFeedBase } from '../../feed/base';
import type { GTFSLoadedFeed } from '../../feed/loaded';
import type { GTFSFileInfo } from '../../file-info';
import type { GTFSAsyncFileRecords, GTFSFileRecords } from '../../types';

/**
 * Feed Reader Base
 */
export abstract class GTFSFeedReaderBase<RecordsType extends GTFSFileRecords|GTFSAsyncFileRecords, FeedType extends GTFSFeedBase<RecordsType>|Promise<GTFSFeedBase<RecordsType>>> {
  /**
   * Get iterable feed.
   * @returns Iterable Feed
   */
  protected getFeedSync(): GTFSIterableFeed {
    const feed = new GTFSIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo) as GTFSFileRecords;
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  /**
   * Get async iterable feed.
   * @returns Async iterable feed
   */
  protected getFeedAsync(): GTFSAsyncIterableFeed {
    const feed = new GTFSAsyncIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo) as GTFSAsyncFileRecords;
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  /**
   * Load iterable feed.
   * @returns Loaded feed
   */
  protected loadFeedSync(): GTFSLoadedFeed {
    return this.getFeedSync().load();
  }

  /**
   * Get async iterable feed and return promise of loaded feed.
   * @returns Loaded feed promise
   */
  protected loadFeedAsync(): Promise<GTFSLoadedFeed> {
    return this.getFeedAsync().load();
  }

  /**
   * Get records from file information.
   * @param fileInfo File information
   * @returns Records or undefined if files does not exist
   */
  protected abstract getRecords(fileInfo: GTFSFileInfo): RecordsType|undefined;

  /**
   * Get iterable feed.
   */
  public abstract getFeed(): FeedType;

  /**
   * Load feed into memory.
   */
  public abstract loadFeed(): GTFSLoadedFeed|Promise<GTFSLoadedFeed>;

  /**
   * Get file records from zip file entry.
   * @param info File information
   * @param entry AdmZip entry
   * @returns File records
   */
  protected static getSyncRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(entry.getData().toString()).values();
  }

  /**
   * Get async file records from zip file entry.
   * @param info File information
   * @param entry AdmZip entry
   * @returns Async file records
   */
  protected static getAsyncRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield entry.getData().toString(); };
    return io.read(generator());
  }
}
