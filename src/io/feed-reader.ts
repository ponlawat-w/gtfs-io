import AdmZip from 'adm-zip';
import {
  existsSync as exists,
  openSync as openFile,
  readSync as readFile
} from 'fs';
import { join as joinPath } from 'path';
import { getIOFromFileName } from './feed-file';
import { getGTFSFileInfos } from '../file-info';
import type { GTFSFileInfo, GTFSFileName } from '../file-info';
import type { GTFSFeed, GTFSFileContent, GTFSFileRecords, GTFSFileRow, GTFSIterableFeedFiles, GTFSLoadedFeed } from '../types';

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
 * Generator of iterable lines from a file path.
 * @param filePath File path
 * @returns Iterable file lines
 */
function *readLine(filePath: string): IterableIterator<string> {
  const file = openFile(filePath, 'r');
  const bufferSize = 1024;
  const buffer = Buffer.alloc(bufferSize);
  let leftOver = '';
  
  let readPos;
  while ((readPos = readFile(file, buffer, 0, bufferSize, null)) !== 0) {
    const lines = (leftOver + buffer.toString('utf8', 0, readPos)).split(/\r?\n/g);
    for (const line of lines.splice(0, lines.length - 1)) {
      yield line;
    }
    leftOver = lines[0];
  }
  if (leftOver) yield leftOver;
  return;
}

function *readZip(zipEntry: AdmZip.IZipEntry): IterableIterator<string> {
  const lines = zipEntry.getData().toString().split(/\r?\n/g);
  yield *lines;
  return;
}

/**
 * GTFS feed reader.
 * Do not use constructor, instead, use the following static methods to initiate an instance:
 * GTFSFeedReader.fromZip,
 * GTFSFeedReader.fromDir,
 * GTFSFeedReader.fromFiles
 */
export default class GTFSFeedReader {
  /** Zip object */
  private zip?: AdmZip = undefined;

  /** File objects */
  private files?: GTFSFile[] = undefined;

  /**
   * Constructor, the object of this class is to be created by static methods.
   * The constructor is limited for internal calling.
   * @param zip Zip file path or buffer
   * @param directoryPath Directory path
   * @param fileContents Array of file content objects
   */
  private constructor(
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
        const path = joinPath(directoryPath, info.name);
        if (!exists(path)) continue;
        this.files.push({ info, path });
      }
      return;
    }
    if (fileContents) {
      for (const info of getGTFSFileInfos()) {
        const file = fileContents.filter(f => f.name === info.name);
        if (!file.length) continue;
        this.files.push({ info, buffer: Buffer.from(file[0].content) })
      }
      return;
    }
  }

  /**
   * Get files existing in the feed and return their iterables (without reading them yet, depending on the initialisation).
   * @returns Iterable feed files
   */
  public *getIterableFilesSync(): GTFSIterableFeedFiles {
    for (const info of getGTFSFileInfos()) {
      if (this.zip) {
        const entry = this.zip.getEntries().filter(entry => entry.entryName === info.name);
        if (!entry.length) continue;
        const fileIO = getIOFromFileName(info.name);
        yield { info, records: fileIO.readSync(readZip(entry[0])) };
      } else if (this.files) {
        const file = this.files.filter(f => f.info.name === info.name);
        if (!file.length) continue;
        const fileIO = getIOFromFileName(info.name);
        if (file[0].path) {
          yield { info, records: fileIO.readSync(readLine(file[0].path)) };
        } else if (file[0].buffer) {
          const lines = file[0].buffer.toString().replace(/\r\n/g, '\n').split('\n').values();
          yield { info, records: fileIO.readSync(lines) };
        }
      }
    }
    return;
  }

  /**
   * Get feed object with row being file name without .txt and value being iterable records.
   * @returns Feed object with row being file name without .txt and value being iterable records.
   */
  public getFeedSync(): GTFSFeed {
    const results: Partial<Record<GTFSFileName, GTFSFileRecords>> = {
      agency: [],
      stops: [],
      routes: [],
      trips: [],
      stop_times: []
    };

    for (const file of this.getIterableFilesSync()) {
      const key = file.info.name.slice(0, file.info.name.length - 4) as GTFSFileName;
      results[key] = file.records;
    }

    return results as GTFSFeed;
  }

  /**
   * Get feed object with row being file name without .txt and value being array of records.
   * @returns Feed object with row being file name without .txt and value being array of records.
   */
  public loadFeedSync(): GTFSLoadedFeed {
    const feed = this.getFeedSync();
    const results: Partial<Record<string, GTFSFileRow[]>> = {};

    for (const key of Object.keys(feed) as GTFSFileName[]) {
      results[key] = [...feed[key]!];
    }

    return results as GTFSLoadedFeed;
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
  public static fromDir(dirPath: string): GTFSFeedReader {
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
