import AdmZip from 'adm-zip';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable.js';
import { GTFSLoadedFeed } from '../../feed/loaded.js';
import type { GTFSFileContent } from '../../types.js';

/**
 * GTFS feed writer.
 * For static usage only.
 */
export class GTFSFeedWriter {
  private constructor() {}

  /**
   * Create a zip instance in memory.
   * @param feed GTFS Feed
   * @returns AdmZip instance
   */
  public static createZip(feed: GTFSIterableFeed|GTFSLoadedFeed): AdmZip {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getIterable();

    const zip = new AdmZip();
    for (const table of feed.getAllTables()) {
      const io = getIOFromFileName(table.info.fileName);
      zip.addFile(
        io.fileName,
        Buffer.from([...io.write(table.records)].join(''))
      );
    }
    return zip;
  }

  /**
   * Create file contents in memory.
   * @param feed GTFS Feed
   * @returns File contents
   */
  public static createFileContents(feed: GTFSIterableFeed|GTFSLoadedFeed): GTFSFileContent[] {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getIterable();

    const fileContents: GTFSFileContent[] = [];
    for (const table of feed.getAllTables()) {
      const io = getIOFromFileName(table.info.fileName);
      fileContents.push({
        name: io.fileName,
        content: [...io.write(table.records)].join('')
      });
    }
    return fileContents;
  }
};

/**
 * GTFS feed writer.
 * For static usage only.
 */
export class GTFSAsyncFeedWriter {
  private constructor() {}

  /**
   * Create a zip instance in memory.
   * @param feed GTFS Feed
   * @returns AdmZip instance
   */
  public static async createZip(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed): Promise<AdmZip> {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getAsyncIterable();
    else if (feed instanceof GTFSIterableFeed) feed = feed.toAsync();

    const zip = new AdmZip();
    for (const table of feed.getAllTables()) {
      const io = getAsyncIOFromFileName(table.info.fileName);
      zip.addFile(
        io.fileName,
        Buffer.from(await io.writeAll(table.records))
      );
    }
    return zip;
  }

  /**
   * Create file contents in memory.
   * @param feed GTFS Feed
   * @returns File contents
   */
  public static async createFileContents(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed): Promise<GTFSFileContent[]> {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getAsyncIterable();
    else if (feed instanceof GTFSIterableFeed) feed = feed.toAsync();

    const fileContents: GTFSFileContent[] = [];
    for (const table of feed.getAllTables()) {
      const io = getAsyncIOFromFileName(table.info.fileName);
      fileContents.push({
        name: io.fileName,
        content: await io.writeAll(table.records)
      });
    }
    return fileContents;
  }
};

