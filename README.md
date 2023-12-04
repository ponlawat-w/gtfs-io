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
import { GTFSFeedReader } from 'gtfs-io';
const reader = GTFSFeedReader.fromZip('gtfs.zip');
const reader = GTFSFeedReader.fromDirectory('path/to/dir');
const feed = reader.loadFeed();
console.log(feed.stops[0].stop_id);
console.log(feed.trips[1].trip_id);

// Asynchronously
import { GTFSAsyncFeedReader } from 'gtfs-io';
const reader = GTFSAsyncFeedReader.fromZip('gtfs.zip');
const reader = GTFSAsyncFeedReader.fromDirectory('path/to/dir');
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
import { GTFSFeedWriter } from 'gtfs-io';
GTFSFeedWriter.writeZip(feed, 'gtfs.zip');
GTFSFeedWriter.writeDirectory(feed, 'path/to/dir');

// Asynchronously
import { GTFSAsyncFeedWriter } from 'gtfs-io';
await GTFSAsyncFeedWriter.writeZip(feed, 'gtfs.zip');
await GTFSAsyncFeedWriter.writeDirectory(feed, 'path/to/dir');
```

---
