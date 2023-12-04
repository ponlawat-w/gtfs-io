import { GTFSFeedBase } from './base';
import type { GTFSFileRow } from '../types';
import type { GTFSTableName } from '../file-info';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from './iterable';

export class GTFSLoadedFeed extends GTFSFeedBase<GTFSFileRow[]> {
  public constructor(defaultValues: Partial<Record<GTFSTableName, GTFSFileRow[]>> = {}) {
    super(defaultValues, (() => [])());
  }

  public getIterable(): GTFSIterableFeed {
    const feed = new GTFSIterableFeed({});
    for (const table of this.getAllTables()) {
      feed.setTable(table.name, table.records.values());
    }
    return feed;
  }

  public getAsyncIterable(): GTFSAsyncIterableFeed {
    const feed = new GTFSAsyncIterableFeed({});
    for (const table of this.getAllTables()) {
      const generator = async function*() { for (const record of table.records) yield record; }
      feed.setTable(table.name, generator());
    }
    return feed;
  }
};
