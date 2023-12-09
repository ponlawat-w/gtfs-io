# GTFS-IO

IO Operations for GTFS dataset in node / javascript.

## Installation

```bash
npm i gtfs-io
```

## Examples

### Load Feed

```ts
// Synchronously
import { GTFSFeedReaderFromFile } from 'gtfs-io';
const reader = GTFSFeedReaderFromFile.fromZip('gtfs.zip');
const reader = GTFSFeedReaderFromFile.fromDirectory('path/to/dir');
const feed = reader.loadFeed();
console.log(feed.stops[0].stop_id);
console.log(feed.trips[1].trip_id);

// Asynchronously
import { GTFSAsyncFeedReaderFromFile } from 'gtfs-io';
const reader = GTFSAsyncFeedReaderFromFile.fromZip('gtfs.zip');
const reader = GTFSAsyncFeedReaderFromFile.fromDirectory('path/to/dir');
const feed = await reader.loadFeed();
console.log(feed.stops[0].stop_id);
console.log(feed.trips[1].trip_id);
```

### Write Feed

```ts
import { GTFSLoadedFeed } from 'gtfs-io';
const feed = new GTFSLoadedFeed({
  agency: [{ agency_id: '...', agency_name: '...', ... }, ...],
  stops: [{ stop_id: '...', ... }, { ... }, ...],
  routes: [{ ... }, { ... }, ...],
  trips: [{ ... }, ...],
  ...
});

// Synchronously
import { GTFSFeedWriterToFile } from 'gtfs-io';
GTFSFeedWriterToFile.asZip(feed, 'gtfs.zip');
GTFSFeedWriterToFile.asDirectory(feed, 'path/to/dir');

// Asynchronously
import { GTFSAsyncFeedWriterToFile } from 'gtfs-io';
await GTFSAsyncFeedWriterToFile.asZip(feed, 'gtfs.zip');
await GTFSAsyncFeedWriterToFiler.asDirectory(feed, 'path/to/dir');
```

---
