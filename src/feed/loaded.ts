import { GTFSFeedBase } from './base.js';
import { GTFSAsyncIterableFeed, GTFSIterableFeed } from './iterable.js';
import type { GTFSTableName } from '../file-info.d.ts';
import type { GTFSFileRow } from '../types.d.ts';

/**
 * GTFS Feed that is loaded into memory, records type being array.
 */
export class GTFSLoadedFeed extends GTFSFeedBase<GTFSFileRow[]> {
  /**
   * Constructor
   * @param initialValues Initial values
   */
  public constructor(initialValues: Partial<Record<GTFSTableName, GTFSFileRow[]>> = {}) {
    super(initialValues, () => []);
  }

  /**
   * Convert records into generator function and return an instance of iterable feed.
   * @returns Iterable feed
   */
  public getIterable(): GTFSIterableFeed {
    const feed = new GTFSIterableFeed({});
    for (const table of this.getAllTables()) {
      feed.setTable(table.name, table.records.values());
    }
    return feed;
  }

  /**
   * Convert records into asynchronous generator function and return an instance of async iterable feed.
   * @returns Async iterable feed
   */
  public getAsyncIterable(): GTFSAsyncIterableFeed {
    const feed = new GTFSAsyncIterableFeed({});
    for (const table of this.getAllTables()) {
      const generator = async function*() { for (const record of table.records) yield record; }
      feed.setTable(table.name, generator());
    }
    return feed;
  }
};
