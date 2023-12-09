import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';
import { getAsyncIOFromFileName, getIOFromFileName } from './file.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../../feed/iterable.js';
import { GTFSLoadedFeed } from '../../feed/loaded.js';
import { GTFSAsyncFeedWriter, GTFSFeedWriter } from './writer.js';

/**
 * GTFS feed writer.
 * For static usage only.
 */
export class GTFSFeedWriterToFile {
  private constructor() {}

  /**
   * Create a zip of GTFS feed and write to the specific path.
   * @param feed GTFS Feed
   * @param path Path to output zip file
   */
  public static asZip(feed: GTFSIterableFeed|GTFSLoadedFeed, path: string): void {
    GTFSFeedWriter.createZip(feed).writeZip(path);
  }

  /**
   * Write GTFS feed to the specific directory path.
   * @param feed GTFS Feed
   * @param path Path to output directory
   * @param mkdirIfNotExists True to recursively create a directory at the path if does not exist
   * @returns File names without directory path, with .txt extension.
   */
  public static asDirectory(feed: GTFSIterableFeed|GTFSLoadedFeed, path: string, mkdirIfNotExists: boolean = true): string[] {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getIterable();

    if (!existsSync(path) && mkdirIfNotExists) {
      mkdirSync(path, { recursive: true });
    }
    const fileNames = [];
    for (const table of feed.getAllTables()) {
      const io = getIOFromFileName(table.info.fileName);
      const filePath = joinPath(path, io.fileName);
      writeFileSync(filePath, '');
      const contents = io.write(table.records);
      for (const content of contents) {
        appendFileSync(filePath, content);
      }
      fileNames.push(io.fileName);
    }
    return fileNames;
  }
};

/**
 * GTFS feed writer.
 * For static usage only.
 */
export class GTFSAsyncFeedWriterToFile {
  private constructor() {}

  /**
   * Create a zip of GTFS feed and write to the specific path.
   * @param feed GTFS Feed
   * @param path Path to output zip file
   */
  public static async asZip(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed, path: string): Promise<void> {
    (await GTFSAsyncFeedWriter.createZip(feed)).writeZip(path);
  }

  /**
   * Write GTFS feed to the specific directory path.
   * @param feed GTFS Feed
   * @param path Path to output directory
   * @param mkdirIfNotExists True to recursively create a directory at the path if does not exist
   * @returns File names without directory path, with .txt extension.
   */
  public static async asDirectory(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed, path: string, mkdirIfNotExists: boolean = true): Promise<string[]> {
    if (feed instanceof GTFSLoadedFeed) feed = feed.getAsyncIterable();
    else if (feed instanceof GTFSIterableFeed) feed = feed.toAsync();

    if (!existsSync(path) && mkdirIfNotExists) {
      mkdirSync(path, { recursive: true });
    }
    const fileNames = [];
    for (const table of feed.getAllTables()) {
      const io = getAsyncIOFromFileName(table.info.fileName);
      const filePath = joinPath(path, io.fileName);
      writeFileSync(filePath, '');
      const contents = io.write(table.records);
      for await (const content of contents) {
        appendFileSync(filePath, content);
      }
      fileNames.push(io.fileName);
    }
    return fileNames;
  }
};

