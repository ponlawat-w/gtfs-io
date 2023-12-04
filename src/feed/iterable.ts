import { GTFSFeedBase } from './base';
import { GTFSLoadedFeed } from './loaded';
import type { GTFSTableName } from '../file-info';
import type { GTFSAsyncFileRecords, GTFSFileRecords, GTFSFileRow } from '../types';

export class GTFSIterableFeed extends GTFSFeedBase<GTFSFileRecords> {
  public constructor(defaultValues: Partial<Record<GTFSTableName, GTFSFileRecords>> = {}) {
    super(defaultValues, [].values());
  }

  public load(): GTFSLoadedFeed {
    const result = new GTFSLoadedFeed();
    for (const table of this.getAllTables()) {
      result.setTable(table.name, [...table.records]);
    }
    return result;
  }
};

export class GTFSAsyncIterableFeed extends GTFSFeedBase<GTFSAsyncFileRecords> {
  public constructor(defaultValues: Partial<Record<GTFSTableName, GTFSAsyncFileRecords>> = {}) {
    super(defaultValues, (async function*() {})());
  }

  public async getRecords(tableName: GTFSTableName): Promise<GTFSFileRow[]> {
    const results = [];
    const records = this.getTable(tableName);
    if (records === undefined) return [];
    for await (const record of records) {
      results.push(record);
    }
    return results;
  }

  public async load(): Promise<GTFSLoadedFeed> {
    const result = new GTFSLoadedFeed();
    for (const table of this.getAllTables()) {
      result.setTable(table.name, await this.getRecords(table.name));
    }
    return result;
  }
};
