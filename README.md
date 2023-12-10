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
import { GTFSFeedReaderFromFile, GTFSFeedReaderFromMemory } from 'gtfs-io';
const reader = GTFSFeedReaderFromFile.fromZip('gtfs.zip');
const reader = GTFSFeedReaderFromFile.fromDirectory('path/to/dir');
const reader = GTFSFeedReaderFromMemory.fromZip(zipBuffer);
// OR
import { GTFSFeedReader } from 'gtfs-io/io/file';
const reader = GTFSFeedReader.fromZip('gtfs.zip');
const reader = GTFSFeedReader.fromDirectory('path/to/dir');
// OR
import { GTFSFeedReader } from 'gtfs-io/io/memory';
const reader = GTFSFeedReader.fromZip(zipBuffer);
// THEN
const feed = reader.loadFeed();
console.log(feed.stops[0].stop_id);
console.log(feed.trips[1].trip_id);

// ===

// Asynchronously
import { GTFSAsyncFeedReaderFromFile, GTFSAsyncFeedReaderFromMemory } from 'gtfs-io';
const reader = GTFSAsyncFeedReaderFromFile.fromZip('gtfs.zip');
const reader = GTFSAsyncFeedReaderFromFile.fromDirectory('path/to/dir');
const reader = GTFSAsyncFeedReaderFromMemory.fromZip(zipBuffer);
// OR
import { GTFSAsyncFeedReader } from 'gtfs-io/io/file';
const reader = GTFSAsyncFeedReader.fromZip('gtfs.zip');
const reader = GTFSAsyncFeedReader.fromDirectory('path/to/dir');
// OR
import { GTFSAsyncFeedReader } from 'gtfs-io/io/memory';
const reader = GTFSAsyncFeedReader.fromZip(zipBuffer);
// THEN
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
GTFSFeedWriterToFile.toZip(feed, 'gtfs.zip');
GTFSFeedWriterToFile.toDirectory(feed, 'path/to/dir');
// OR
import { GTFSFeedWriter } from 'gtfs-io/io/file';
GTFSFeedWriter.toZip(feed, 'gtfs.zip');
GTFSFeedWriter.toDirectory(feed, 'path/to/dir');

// ===

// Asynchronously
import { GTFSAsyncFeedWriterToFile } from 'gtfs-io';
await GTFSAsyncFeedWriterToFile.toZip(feed, 'gtfs.zip');
await GTFSAsyncFeedWriterToFiler.toDirectory(feed, 'path/to/dir');
// OR
import { GTFSAsyncFeedWriter } from 'gtfs-io/io/file';
await GTFSAsyncFeedWriter.toZip(feed, 'gtfs.zip');
await GTFSAsyncFeedWriter.toDirectory(feed, 'path/to/dir');
```

---
