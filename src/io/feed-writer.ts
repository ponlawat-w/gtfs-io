import AdmZip from 'adm-zip';
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from 'fs';
import { join as joinPath } from 'path';
import { getIOFromFileName } from './feed-file';
import { GTFSFileName, GTFS_FILES } from '../file-info';
import type { GTFSFeed, GTFSFileContent, GTFSFileRecords, GTFSIterableFeedFiles } from '../types';

/**
 * GTFS feed writer.
 * For static usage only.
 */
export default class GTFSFeedWriter {
  private constructor() {}

  /**
   * Generator of feed by file.
   * @param feed GTFS Feed
   * @returns Iterable feed files
   */
  private static *getIterableFiles(feed: GTFSFeed): GTFSIterableFeedFiles {
    const keys = Object.keys(feed) as GTFSFileName[];
    for (const key of keys) {
      const info = GTFS_FILES[key];
      if (!info) continue;
      const records = feed[key] as GTFSFileRecords;
      yield { info, records: Array.isArray(records) ? records.values() : records };
    }
    return;
  }

  /**
   * Create a zip instance in memory.
   * @param feed GTFS Feed
   * @returns AdmZip instance
   */
  public static createZip(feed: GTFSFeed): AdmZip {
    const zip = new AdmZip();
    const files = GTFSFeedWriter.getIterableFiles(feed);
    for (const file of files) {
      const io = getIOFromFileName(file.info.name);
      zip.addFile(io.fileName, Buffer.from(
        Array.isArray(file.records) ? io.writeContent(file.records) : [...io.write(file.records)].join('')
      ));
    }
    return zip;
  }

  /**
   * Create file contents in memory.
   * @param feed GTFS Feed
   * @returns File contents
   */
  public static createFileContents(feed: GTFSFeed): GTFSFileContent[] {
    const fileContents: GTFSFileContent[] = [];
    const files = GTFSFeedWriter.getIterableFiles(feed);
    for (const file of files) {
      const io = getIOFromFileName(file.info.name);
      fileContents.push({
        name: io.fileName,
        content: Array.isArray(file.records) ? io.writeContent(file.records) : [...io.write(file.records)].join('')
      });
    }
    return fileContents;
  }

  /**
   * Create a zip of GTFS feed and write to the specific path.
   * @param feed GTFS Feed
   * @param path Path to output zip file
   */
  public static writeZip(feed: GTFSFeed, path: string): void {
    GTFSFeedWriter.createZip(feed).writeZip(path);
  }

  /**
   * Write GTFS feed to the specific directory path.
   * @param feed GTFS Feed
   * @param path Path to output directory
   * @param mkdirIfNotExists True to recursively create a directory at the path if does not exist
   * @returns File names without directory path, with .txt extension.
   */
  public static writeDirectory(feed: GTFSFeed, path: string, mkdirIfNotExists: boolean = true): string[] {
    if (!existsSync(path) && mkdirIfNotExists) {
      mkdirSync(path, { recursive: true });
    }
    const files = GTFSFeedWriter.getIterableFiles(feed);
    const fileNames = [];
    for (const file of files) {
      const io = getIOFromFileName(file.info.name);
      const filePath = joinPath(path, io.fileName);
      writeFileSync(filePath, '');
      const contents = Array.isArray(file.records) ? [io.writeContent(file.records)] : io.write(file.records);
      for (const content of contents) {
        appendFileSync(filePath, content);
      }
      fileNames.push(io.fileName);
    }
    return fileNames;
  }
};
