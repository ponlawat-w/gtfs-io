import { GTFSFeedBase } from './base.js';
import { GTFSLoadedFeed } from './loaded.js';
import type { GTFSTableName } from '../file-info';
import type { GTFSAsyncFileRecords, GTFSFileRecords, GTFSFileRow } from '../types';

/**
 * GTFS Feed whoose records are iterable iterator.
 */
export class GTFSIterableFeed extends GTFSFeedBase<GTFSFileRecords> {
  /**
   * Constructor
   * @param initialValues Initial values.
   */
  public constructor(initialValues: Partial<Record<GTFSTableName, GTFSFileRecords>> = {}) {
    super(initialValues, function*() {});
  }

  /**
   * Load all table records into array and return GTFSLoadedFeed.
   * BEWARE NOT TO CALL ON THE SAME TABLE TWICE AS THE RECORDS TYPE IS ITERATOR.
   * @returns Loaded feed
   */
  public load(): GTFSLoadedFeed {
    const result = new GTFSLoadedFeed();
    for (const table of this.getAllTables()) {
      result.setTable(table.name, [...table.records]);
    }
    return result;
  }

  /**
   * Convert generator of the records into asynchronous.
   * BEWARE NOT TO CALL ON THE SAME TABLE TWICE AS THE RECORDS TYPE IS ITERATOR.
   * @returns Async iterable feed
   */
  public toAsync(): GTFSAsyncIterableFeed {
    const result = new GTFSAsyncIterableFeed();
    for (const table of this.getAllTables()) {
      const generator = async function*() { for (const record of table.records) yield record; };
      result.setTable(table.name, generator());
    }
    return result;
  }
};

/**
 * GTFS Feed whoose records are asynchornous iterable iterator.
 */
export class GTFSAsyncIterableFeed extends GTFSFeedBase<GTFSAsyncFileRecords> {
  /**
   * Constructor
   * @param initialValues Initial values.
   */
  public constructor(initialValues: Partial<Record<GTFSTableName, GTFSAsyncFileRecords>> = {}) {
    super(initialValues, async function*() {});
  }

  /**
   * Get records of a specific table.
   * BEWARE NOT TO CALL ON THE SAME TABLE TWICE AS THE RECORDS TYPE IS ITERATOR.
   * @param tableName Table name
   * @returns Promise of records
   */
  public async getRecords(tableName: GTFSTableName): Promise<GTFSFileRow[]> {
    const results = [];
    const records = this.getTable(tableName);
    if (records === undefined) return [];
    for await (const record of records) {
      results.push(record);
    }
    return results;
  }

  /**
   * Load all table records into array and return GTFSLoadedFeed.
   * @returns Loaded feed
   */
  public async load(): Promise<GTFSLoadedFeed> {
    const result = new GTFSLoadedFeed();
    for (const table of this.getAllTables()) {
      result.setTable(table.name, await this.getRecords(table.name));
    }
    return result;
  }
};
