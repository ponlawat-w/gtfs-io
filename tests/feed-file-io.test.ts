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

test('Test agency.txt IO', () => {
  const io = new GTFSAgencyIO();
  expect(io.fileName).toEqual('agency.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.agency.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test stops.txt IO', () => {
  const io = new GTFSStopIO();
  expect(io.fileName).toEqual('stops.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.stops.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test routes.txt IO', () => {
  const io = new GTFSRouteIO();
  expect(io.fileName).toEqual('routes.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.routes.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test trips.txt IO', () => {
  const io = new GTFSTripIO();
  expect(io.fileName).toEqual('trips.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.trips.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test stop_times.txt IO', () => {
  const io = new GTFSStopTimeIO();
  expect(io.fileName).toEqual('stop_times.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.stop_times.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test calendar.txt IO', () => {
  const io = new GTFSCalendarIO();
  expect(io.fileName).toEqual('calendar.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.calendar.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test calendar_dates.txt IO', () => {
  const io = new GTFSCalendarDateIO();
  expect(io.fileName).toEqual('calendar_dates.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.calendar_dates.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_attributes.txt IO', () => {
  const io = new GTFSFareAttributeIO();
  expect(io.fileName).toEqual('fare_attributes.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_attributes.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_rules.txt IO', () => {
  const io = new GTFSFareRuleIO();
  expect(io.fileName).toEqual('fare_rules.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_rules.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test timeframes.txt IO', () => {
  const io = new GTFSTimeframeIO();
  expect(io.fileName).toEqual('timeframes.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.timeframes.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_media.txt IO', () => {
  const io = new GTFSFareMediaIO();
  expect(io.fileName).toEqual('fare_media.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_media.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_products.txt IO', () => {
  const io = new GTFSFareProductIO();
  expect(io.fileName).toEqual('fare_products.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_products.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_leg_rules.txt IO', () => {
  const io = new GTFSFareLegRuleIO();
  expect(io.fileName).toEqual('fare_leg_rules.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_leg_rules.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test fare_transfer_rules.txt IO', () => {
  const io = new GTFSFareTransferRuleIO();
  expect(io.fileName).toEqual('fare_transfer_rules.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.fare_transfer_rules.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test areas.txt IO', () => {
  const io = new GTFSAreaIO();
  expect(io.fileName).toEqual('areas.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.areas.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test stop_areas.txt IO', () => {
  const io = new GTFSStopAreaIO();
  expect(io.fileName).toEqual('stop_areas.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.stop_areas.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test networks.txt IO', () => {
  const io = new GTFSNetworkIO();
  expect(io.fileName).toEqual('networks.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.networks.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test route_networks.txt IO', () => {
  const io = new GTFSRouteNetworkIO();
  expect(io.fileName).toEqual('route_networks.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.route_networks.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test shapes.txt IO', () => {
  const io = new GTFSShapeIO();
  expect(io.fileName).toEqual('shapes.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.shapes.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test frequencies.txt IO', () => {
  const io = new GTFSFrequencyIO();
  expect(io.fileName).toEqual('frequencies.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.frequencies.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test transfers.txt IO', () => {
  const io = new GTFSTransferIO();
  expect(io.fileName).toEqual('transfers.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.transfers.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test pathways.txt IO', () => {
  const io = new GTFSPathwayIO();
  expect(io.fileName).toEqual('pathways.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.pathways.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test levels.txt IO', () => {
  const io = new GTFSLevelIO();
  expect(io.fileName).toEqual('levels.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.levels.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test translations.txt IO', () => {
  const io = new GTFSTranslationIO();
  expect(io.fileName).toEqual('translations.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.translations.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test feed_info.txt IO', () => {
  const io = new GTFSFeedInfoIO();
  expect(io.fileName).toEqual('feed_info.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.feed_info.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

test('Test attributions.txt IO', () => {
  const io = new GTFSAttributionIO();
  expect(io.fileName).toEqual('attributions.txt');
  expect(io.columns).toEqual(Object.keys(GTFS_FILES.attributions.columns));

  const content = io.columns.join(',') + '\n' + io.columns.map(_ => '').join(',');
  const records = io.readContentSync(content);
  expect(records.length).toEqual(1);
  expect(Object.keys(records[0])).toEqual(io.columns);

  const lines = io.writeLinesSync(records);
  expect(lines.length).toEqual(2);
  expect(lines[0]).toEqual(io.columns.join(',') + '\n');
});

