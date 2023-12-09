import AdmZip from 'adm-zip';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';
import { getAsyncIOFromFileName, getIOFromFileName } from './feed-file.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from '../feed/iterable.js';
import { GTFSLoadedFeed } from '../feed/loaded.js';
import type { GTFSFileContent } from '../types';

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

  /**
   * Create a zip of GTFS feed and write to the specific path.
   * @param feed GTFS Feed
   * @param path Path to output zip file
   */
  public static writeZip(feed: GTFSIterableFeed|GTFSLoadedFeed, path: string): void {
    GTFSFeedWriter.createZip(feed).writeZip(path);
  }

  /**
   * Write GTFS feed to the specific directory path.
   * @param feed GTFS Feed
   * @param path Path to output directory
   * @param mkdirIfNotExists True to recursively create a directory at the path if does not exist
   * @returns File names without directory path, with .txt extension.
   */
  public static writeDirectory(feed: GTFSIterableFeed|GTFSLoadedFeed, path: string, mkdirIfNotExists: boolean = true): string[] {
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

  /**
   * Create a zip of GTFS feed and write to the specific path.
   * @param feed GTFS Feed
   * @param path Path to output zip file
   */
  public static async writeZip(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed, path: string): Promise<void> {
    (await GTFSAsyncFeedWriter.createZip(feed)).writeZip(path);
  }

  /**
   * Write GTFS feed to the specific directory path.
   * @param feed GTFS Feed
   * @param path Path to output directory
   * @param mkdirIfNotExists True to recursively create a directory at the path if does not exist
   * @returns File names without directory path, with .txt extension.
   */
  public static async writeDirectory(feed: GTFSAsyncIterableFeed|GTFSIterableFeed|GTFSLoadedFeed, path: string, mkdirIfNotExists: boolean = true): Promise<string[]> {
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

