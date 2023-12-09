import AdmZip from 'adm-zip';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable.js';
import { getGTFSFileInfos } from '../../file-info.js';
import type { GTFSFeedBase } from '../../feed/base';
import type { GTFSLoadedFeed } from '../../feed/loaded';
import type { GTFSFileInfo } from '../../file-info';
import type { GTFSAsyncFileRecords, GTFSFileRecords } from '../../types';

export abstract class GTFSFeedReaderBase<RecordsType extends GTFSFileRecords|GTFSAsyncFileRecords, FeedType extends GTFSFeedBase<RecordsType>|Promise<GTFSFeedBase<RecordsType>>> {
  protected getFeedSync(): GTFSIterableFeed {
    const feed = new GTFSIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo) as GTFSFileRecords;
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  protected getFeedAsync(): GTFSAsyncIterableFeed {
    const feed = new GTFSAsyncIterableFeed();

    for (const fileInfo of getGTFSFileInfos()) {
      const records = this.getRecords(fileInfo) as GTFSAsyncFileRecords;
      if (records === undefined) continue;
      feed.setTable(fileInfo.tableName, records);
    }

    return feed;
  }

  protected loadFeedSync(): GTFSLoadedFeed {
    return this.getFeedSync().load();
  }

  protected loadFeedAsync(): Promise<GTFSLoadedFeed> {
    return this.getFeedAsync().load();
  }

  protected abstract getRecords(fileInfo: GTFSFileInfo): RecordsType|undefined;
  public abstract getFeed(): FeedType;
  public abstract loadFeed(): GTFSLoadedFeed|Promise<GTFSLoadedFeed>;

  protected static getSyncRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSFileRecords {
    const io = getIOFromFileName(info.fileName);
    return io.readContent(entry.getData().toString()).values();
  }

  protected static getAsyncRecordsFromZipEntry(info: GTFSFileInfo, entry: AdmZip.IZipEntry): GTFSAsyncFileRecords {
    const io = getAsyncIOFromFileName(info.fileName);
    const generator = async function*() { yield entry.getData().toString(); };
    return io.read(generator());
  }
}
