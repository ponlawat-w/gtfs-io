import { test, expect } from 'vitest';
import { GTFS_FILES, getIOFromFileName, getAsyncIOFromFileName } from '../dist';
import type { GTFSAsyncFeedFileIO, GTFSFeedFileIO, GTFSFileInfo } from '../dist';

const assertSync = (io: GTFSFeedFileIO, fileName: string, fileInfo: GTFSFileInfo) => {
  expect(io.fileName).toEqual(fileName);
  expect(io.columns).toEqual(Object.keys(fileInfo.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContent(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const writtenContent = io.writeContent(records);
  expect(writtenContent).toEqual(content + '\n');
};

const assertAsync = async(io: GTFSAsyncFeedFileIO, fileName: string, fileInfo: GTFSFileInfo) => {
  expect(io.fileName).toEqual(fileName);
  expect(io.columns).toEqual(Object.keys(fileInfo.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = await io.readAllContent(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const writtenContent = await io.writeAllRecords(records);
  expect(writtenContent).toEqual(content + '\n');
};

test('Test agency.txt IO', async() => {
  const io = getIOFromFileName('agency.txt');
  assertSync(io, 'agency.txt', GTFS_FILES.agency);
  const asyncIO = getAsyncIOFromFileName('agency.txt');
  assertAsync(asyncIO, 'agency.txt', GTFS_FILES.agency);
});

test('Test stops.txt IO', async() => {
  const io = getIOFromFileName('stops.txt');
  assertSync(io, 'stops.txt', GTFS_FILES.stops);
  const asyncIO = getAsyncIOFromFileName('stops.txt');
  assertAsync(asyncIO, 'stops.txt', GTFS_FILES.stops);
});

test('Test routes.txt IO', async() => {
  const io = getIOFromFileName('routes.txt');
  assertSync(io, 'routes.txt', GTFS_FILES.routes);
  const asyncIO = getAsyncIOFromFileName('routes.txt');
  assertAsync(asyncIO, 'routes.txt', GTFS_FILES.routes);
});

test('Test trips.txt IO', async() => {
  const io = getIOFromFileName('trips.txt');
  assertSync(io, 'trips.txt', GTFS_FILES.trips);
  const asyncIO = getAsyncIOFromFileName('trips.txt');
  assertAsync(asyncIO, 'trips.txt', GTFS_FILES.trips);
});

test('Test stop_times.txt IO', async() => {
  const io = getIOFromFileName('stop_times.txt');
  assertSync(io, 'stop_times.txt', GTFS_FILES.stop_times);
  const asyncIO = getAsyncIOFromFileName('stop_times.txt');
  assertAsync(asyncIO, 'stop_times.txt', GTFS_FILES.stop_times);
});

test('Test calendar.txt IO', async() => {
  const io = getIOFromFileName('calendar.txt');
  assertSync(io, 'calendar.txt', GTFS_FILES.calendar);
  const asyncIO = getAsyncIOFromFileName('calendar.txt');
  assertAsync(asyncIO, 'calendar.txt', GTFS_FILES.calendar);
});

test('Test calendar_dates.txt IO', async() => {
  const io = getIOFromFileName('calendar_dates.txt');
  assertSync(io, 'calendar_dates.txt', GTFS_FILES.calendar_dates);
  const asyncIO = getAsyncIOFromFileName('calendar_dates.txt');
  assertAsync(asyncIO, 'calendar_dates.txt', GTFS_FILES.calendar_dates);
});

test('Test fare_attributes.txt IO', async() => {
  const io = getIOFromFileName('fare_attributes.txt');
  assertSync(io, 'fare_attributes.txt', GTFS_FILES.fare_attributes);
  const asyncIO = getAsyncIOFromFileName('fare_attributes.txt');
  assertAsync(asyncIO, 'fare_attributes.txt', GTFS_FILES.fare_attributes);
});

test('Test fare_rules.txt IO', async() => {
  const io = getIOFromFileName('fare_rules.txt');
  assertSync(io, 'fare_rules.txt', GTFS_FILES.fare_rules);
  const asyncIO = getAsyncIOFromFileName('fare_rules.txt');
  assertAsync(asyncIO, 'fare_rules.txt', GTFS_FILES.fare_rules);
});

test('Test timeframes.txt IO', async() => {
  const io = getIOFromFileName('timeframes.txt');
  assertSync(io, 'timeframes.txt', GTFS_FILES.timeframes);
  const asyncIO = getAsyncIOFromFileName('timeframes.txt');
  assertAsync(asyncIO, 'timeframes.txt', GTFS_FILES.timeframes);
});

test('Test fare_media.txt IO', async() => {
  const io = getIOFromFileName('fare_media.txt');
  assertSync(io, 'fare_media.txt', GTFS_FILES.fare_media);
  const asyncIO = getAsyncIOFromFileName('fare_media.txt');
  assertAsync(asyncIO, 'fare_media.txt', GTFS_FILES.fare_media);
});

test('Test fare_products.txt IO', async() => {
  const io = getIOFromFileName('fare_products.txt');
  assertSync(io, 'fare_products.txt', GTFS_FILES.fare_products);
  const asyncIO = getAsyncIOFromFileName('fare_products.txt');
  assertAsync(asyncIO, 'fare_products.txt', GTFS_FILES.fare_products);
});

test('Test fare_leg_rules.txt IO', async() => {
  const io = getIOFromFileName('fare_leg_rules.txt');
  assertSync(io, 'fare_leg_rules.txt', GTFS_FILES.fare_leg_rules);
  const asyncIO = getAsyncIOFromFileName('fare_leg_rules.txt');
  assertAsync(asyncIO, 'fare_leg_rules.txt', GTFS_FILES.fare_leg_rules);
});

test('Test fare_transfer_rules.txt IO', async() => {
  const io = getIOFromFileName('fare_transfer_rules.txt');
  assertSync(io, 'fare_transfer_rules.txt', GTFS_FILES.fare_transfer_rules);
  const asyncIO = getAsyncIOFromFileName('fare_transfer_rules.txt');
  assertAsync(asyncIO, 'fare_transfer_rules.txt', GTFS_FILES.fare_transfer_rules);
});

test('Test areas.txt IO', async() => {
  const io = getIOFromFileName('areas.txt');
  assertSync(io, 'areas.txt', GTFS_FILES.areas);
  const asyncIO = getAsyncIOFromFileName('areas.txt');
  assertAsync(asyncIO, 'areas.txt', GTFS_FILES.areas);
});

test('Test stop_areas.txt IO', async() => {
  const io = getIOFromFileName('stop_areas.txt');
  assertSync(io, 'stop_areas.txt', GTFS_FILES.stop_areas);
  const asyncIO = getAsyncIOFromFileName('stop_areas.txt');
  assertAsync(asyncIO, 'stop_areas.txt', GTFS_FILES.stop_areas);
});

test('Test networks.txt IO', async() => {
  const io = getIOFromFileName('networks.txt');
  assertSync(io, 'networks.txt', GTFS_FILES.networks);
  const asyncIO = getAsyncIOFromFileName('networks.txt');
  assertAsync(asyncIO, 'networks.txt', GTFS_FILES.networks);
});

test('Test route_networks.txt IO', async() => {
  const io = getIOFromFileName('route_networks.txt');
  assertSync(io, 'route_networks.txt', GTFS_FILES.route_networks);
  const asyncIO = getAsyncIOFromFileName('route_networks.txt');
  assertAsync(asyncIO, 'route_networks.txt', GTFS_FILES.route_networks);
});

test('Test shapes.txt IO', async() => {
  const io = getIOFromFileName('shapes.txt');
  assertSync(io, 'shapes.txt', GTFS_FILES.shapes);
  const asyncIO = getAsyncIOFromFileName('shapes.txt');
  assertAsync(asyncIO, 'shapes.txt', GTFS_FILES.shapes);
});

test('Test frequencies.txt IO', async() => {
  const io = getIOFromFileName('frequencies.txt');
  assertSync(io, 'frequencies.txt', GTFS_FILES.frequencies);
  const asyncIO = getAsyncIOFromFileName('frequencies.txt');
  assertAsync(asyncIO, 'frequencies.txt', GTFS_FILES.frequencies);
});

test('Test transfers.txt IO', async() => {
  const io = getIOFromFileName('transfers.txt');
  assertSync(io, 'transfers.txt', GTFS_FILES.transfers);
  const asyncIO = getAsyncIOFromFileName('transfers.txt');
  assertAsync(asyncIO, 'transfers.txt', GTFS_FILES.transfers);
});

test('Test pathways.txt IO', async() => {
  const io = getIOFromFileName('pathways.txt');
  assertSync(io, 'pathways.txt', GTFS_FILES.pathways);
  const asyncIO = getAsyncIOFromFileName('pathways.txt');
  assertAsync(asyncIO, 'pathways.txt', GTFS_FILES.pathways);
});

test('Test levels.txt IO', async() => {
  const io = getIOFromFileName('levels.txt');
  assertSync(io, 'levels.txt', GTFS_FILES.levels);
  const asyncIO = getAsyncIOFromFileName('levels.txt');
  assertAsync(asyncIO, 'levels.txt', GTFS_FILES.levels);
});

test('Test translations.txt IO', async() => {
  const io = getIOFromFileName('translations.txt');
  assertSync(io, 'translations.txt', GTFS_FILES.translations);
  const asyncIO = getAsyncIOFromFileName('translations.txt');
  assertAsync(asyncIO, 'translations.txt', GTFS_FILES.translations);
});

test('Test feed_info.txt IO', async() => {
  const io = getIOFromFileName('feed_info.txt');
  assertSync(io, 'feed_info.txt', GTFS_FILES.feed_info);
  const asyncIO = getAsyncIOFromFileName('feed_info.txt');
  assertAsync(asyncIO, 'feed_info.txt', GTFS_FILES.feed_info);
});

test('Test attributions.txt IO', async() => {
  const io = getIOFromFileName('attributions.txt');
  assertSync(io, 'attributions.txt', GTFS_FILES.attributions);
  const asyncIO = getAsyncIOFromFileName('attributions.txt');
  assertAsync(asyncIO, 'attributions.txt', GTFS_FILES.attributions);
});
