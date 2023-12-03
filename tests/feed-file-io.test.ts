import { test, expect } from 'vitest';
import {
  GTFS_FILES,
  GTFSAgencyIO,
  GTFSStopIO,
  GTFSRouteIO,
  GTFSTripIO,
  GTFSStopTimeIO,
  GTFSCalendarIO,
  GTFSCalendarDateIO,
  GTFSFareAttributeIO,
  GTFSFareRuleIO,
  GTFSTimeframeIO,
  GTFSFareMediaIO,
  GTFSFareProductIO,
  GTFSFareLegRuleIO,
  GTFSFareTransferRuleIO,
  GTFSAreaIO,
  GTFSStopAreaIO,
  GTFSNetworkIO,
  GTFSRouteNetworkIO,
  GTFSShapeIO,
  GTFSFrequencyIO,
  GTFSTransferIO,
  GTFSPathwayIO,
  GTFSLevelIO,
  GTFSTranslationIO,
  GTFSFeedInfoIO,
  GTFSAttributionIO
} from '../dist';
import type {
  GTFSFeedFileIO, GTFSFileInfo
} from '../dist';

const assert = (io: GTFSFeedFileIO, fileName: string, fileInfo: GTFSFileInfo) => {
  expect(io.fileName).toEqual(fileName);
  expect(io.columns).toEqual(Object.keys(fileInfo.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
}

test('Test agency.txt IO', () => {
  const io = new GTFSAgencyIO();
  assert(io, 'agency.txt', GTFS_FILES.agency);
});

test('Test stops.txt IO', () => {
  const io = new GTFSStopIO();
  assert(io, 'stops.txt', GTFS_FILES.stops);
});

test('Test routes.txt IO', () => {
  const io = new GTFSRouteIO();
  assert(io, 'routes.txt', GTFS_FILES.routes);
});

test('Test trips.txt IO', () => {
  const io = new GTFSTripIO();
  assert(io, 'trips.txt', GTFS_FILES.trips);
});

test('Test stop_times.txt IO', () => {
  const io = new GTFSStopTimeIO();
  assert(io, 'stop_times.txt', GTFS_FILES.stop_times);
});

test('Test calendar.txt IO', () => {
  const io = new GTFSCalendarIO();
  assert(io, 'calendar.txt', GTFS_FILES.calendar);
});

test('Test calendar_dates.txt IO', () => {
  const io = new GTFSCalendarDateIO();
  assert(io, 'calendar_dates.txt', GTFS_FILES.calendar_dates);
});

test('Test fare_attributes.txt IO', () => {
  const io = new GTFSFareAttributeIO();
  assert(io, 'fare_attributes.txt', GTFS_FILES.fare_attributes);
});

test('Test fare_rules.txt IO', () => {
  const io = new GTFSFareRuleIO();
  assert(io, 'fare_rules.txt', GTFS_FILES.fare_rules);
});

test('Test timeframes.txt IO', () => {
  const io = new GTFSTimeframeIO();
  assert(io, 'timeframes.txt', GTFS_FILES.timeframes);
});

test('Test fare_media.txt IO', () => {
  const io = new GTFSFareMediaIO();
  assert(io, 'fare_media.txt', GTFS_FILES.fare_media);
});

test('Test fare_products.txt IO', () => {
  const io = new GTFSFareProductIO();
  assert(io, 'fare_products.txt', GTFS_FILES.fare_products);
});

test('Test fare_leg_rules.txt IO', () => {
  const io = new GTFSFareLegRuleIO();
  assert(io, 'fare_leg_rules.txt', GTFS_FILES.fare_leg_rules);
});

test('Test fare_transfer_rules.txt IO', () => {
  const io = new GTFSFareTransferRuleIO();
  assert(io, 'fare_transfer_rules.txt', GTFS_FILES.fare_transfer_rules);
});

test('Test areas.txt IO', () => {
  const io = new GTFSAreaIO();
  assert(io, 'areas.txt', GTFS_FILES.areas);
});

test('Test stop_areas.txt IO', () => {
  const io = new GTFSStopAreaIO();
  assert(io, 'stop_areas.txt', GTFS_FILES.stop_areas);
});

test('Test networks.txt IO', () => {
  const io = new GTFSNetworkIO();
  assert(io, 'networks.txt', GTFS_FILES.networks);
});

test('Test route_networks.txt IO', () => {
  const io = new GTFSRouteNetworkIO();
  assert(io, 'route_networks.txt', GTFS_FILES.route_networks);
});

test('Test shapes.txt IO', () => {
  const io = new GTFSShapeIO();
  assert(io, 'shapes.txt', GTFS_FILES.shapes);
});

test('Test frequencies.txt IO', () => {
  const io = new GTFSFrequencyIO();
  assert(io, 'frequencies.txt', GTFS_FILES.frequencies);
});

test('Test transfers.txt IO', () => {
  const io = new GTFSTransferIO();
  assert(io, 'transfers.txt', GTFS_FILES.transfers);
});

test('Test pathways.txt IO', () => {
  const io = new GTFSPathwayIO();
  assert(io, 'pathways.txt', GTFS_FILES.pathways);
});

test('Test levels.txt IO', () => {
  const io = new GTFSLevelIO();
  assert(io, 'levels.txt', GTFS_FILES.levels);
});

test('Test translations.txt IO', () => {
  const io = new GTFSTranslationIO();
  assert(io, 'translations.txt', GTFS_FILES.translations);
});

test('Test feed_info.txt IO', () => {
  const io = new GTFSFeedInfoIO();
  assert(io, 'feed_info.txt', GTFS_FILES.feed_info);
});

test('Test attributions.txt IO', () => {
  const io = new GTFSAttributionIO();
  assert(io, 'attributions.txt', GTFS_FILES.attributions);
});
