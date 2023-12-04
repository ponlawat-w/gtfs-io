import { readFileSync } from 'fs';
import { join } from 'path';
import { test, expect } from 'vitest';
import {
  GTFSContinuousPickupDropOff,
  GTFSFeedReader,
  GTFSAsyncFeedReader,
  GTFSRouteType,
  GTFSStopLocationType,
  GTFSStopTimePickupDropOff,
  GTFSStopTimeTimepoint,
  GTFSTripBikesAllowed,
  GTFSTripDirection,
  GTFSWheelchairAccessbility
} from '../dist';
import type { GTFSFileContent, GTFSLoadedFeed } from '../dist';

const ZIP_PATH = './tests/data/gtfs.zip';
const DIR_PATH = './tests/data/gtfs';

const assert = (feed: GTFSLoadedFeed) => {
  expect(feed.agency).toBeDefined();
  expect(feed.calendar_dates).toBeDefined();
  expect(feed.calendar).toBeDefined();
  expect(feed.routes).toBeDefined();
  expect(feed.shapes).toBeDefined();
  expect(feed.stop_times).toBeDefined();
  expect(feed.stops).toBeDefined();
  expect(feed.trips).toBeDefined();
  
  expect(feed.fare_attributes).toBeUndefined();
  expect(feed.fare_rules).toBeUndefined();
  expect(feed.timeframes).toBeUndefined();
  expect(feed.fare_media).toBeUndefined();
  expect(feed.fare_products).toBeUndefined();
  expect(feed.fare_leg_rules).toBeUndefined();
  expect(feed.fare_transfer_rules).toBeUndefined();
  expect(feed.areas).toBeUndefined();
  expect(feed.stop_areas).toBeUndefined();
  expect(feed.networks).toBeUndefined();
  expect(feed.route_networks).toBeUndefined();
  expect(feed.frequencies).toBeUndefined();
  expect(feed.transfers).toBeUndefined();
  expect(feed.pathways).toBeUndefined();
  expect(feed.levels).toBeUndefined();
  expect(feed.translations).toBeUndefined();
  expect(feed.feed_info).toBeUndefined();
  expect(feed.attributions).toBeUndefined();

  expect(feed.agency.length).toEqual(1);
  expect(feed.agency[0].agency_id).toEqual('A01');
  expect(feed.agency[0].agency_name).toEqual('This Agency');
  expect(feed.agency[0].agency_url).toEqual('https://test.agency');
  expect(feed.agency[0].agency_timezone).toEqual('Europe/Madrid');
  expect(feed.agency[0].agency_lang).toEqual('en');
  expect(feed.agency[0].agency_phone).toEqual('+34000000000');
  expect(feed.agency[0].agency_fare_url).toEqual('https://test.agency/fare');
  expect(feed.agency[0].agency_email).toEqual('contact@test.agency');

  expect(feed.calendar_dates!.length).toEqual(0);

  expect(feed.calendar!.length).toEqual(2);
  expect(feed.calendar![0].monday).toBeTypeOf('number');
  expect(feed.calendar![0].tuesday).toBeTypeOf('number');
  expect(feed.calendar![0].wednesday).toBeTypeOf('number');
  expect(feed.calendar![0].thursday).toBeTypeOf('number');
  expect(feed.calendar![0].friday).toBeTypeOf('number');
  expect(feed.calendar![0].saturday).toBeTypeOf('number');
  expect(feed.calendar![0].sunday).toBeTypeOf('number');
  expect(feed.calendar![1].service_id).toEqual('S02');
  expect(feed.calendar![1].monday).toEqual(0);
  expect(feed.calendar![1].tuesday).toEqual(0);
  expect(feed.calendar![1].wednesday).toEqual(0);
  expect(feed.calendar![1].thursday).toEqual(0);
  expect(feed.calendar![1].friday).toEqual(0);
  expect(feed.calendar![1].saturday).toEqual(1);
  expect(feed.calendar![1].sunday).toEqual(1);
  expect(feed.calendar![1].start_date).toEqual('20231201');
  expect(feed.calendar![1].end_date).toEqual('20231231');

  expect(feed.routes.length).toEqual(2);
  expect(feed.routes![1].route_type).toBeTypeOf('number');
  expect(feed.routes![1].route_sort_order).toBeTypeOf('number');
  expect(feed.routes![1].continuous_pickup).toBeTypeOf('number');
  expect(feed.routes![1].continuous_drop_off).toBeTypeOf('number');
  expect(feed.routes![0].route_id).toEqual('R01');
  expect(feed.routes![0].agency_id).toEqual('A01');
  expect(feed.routes![0].route_short_name).toEqual('01');
  expect(feed.routes![0].route_long_name).toEqual('Route Number 1');
  expect(feed.routes![0].route_type).toEqual(GTFSRouteType.Bus);
  expect(feed.routes![0].route_color).toEqual('ffffff');
  expect(feed.routes![0].route_text_color).toEqual('000000');
  expect(feed.routes![0].route_sort_order).toEqual(1);
  expect(feed.routes![0].continuous_pickup).toEqual(GTFSContinuousPickupDropOff.Default);
  expect(feed.routes![0].continuous_drop_off).toEqual(GTFSContinuousPickupDropOff.NoContinuous);

  expect(feed.shapes!.length).toEqual(4);
  expect(feed.shapes![1].shape_pt_lat).toBeTypeOf('number');
  expect(feed.shapes![1].shape_pt_lon).toBeTypeOf('number');
  expect(feed.shapes![1].shape_pt_sequence).toBeTypeOf('number');
  expect(feed.shapes![1].shape_dist_traveled).toBeTypeOf('number');
  expect(feed.shapes![3].shape_id).toEqual('SH01');
  expect(feed.shapes![3].shape_pt_lat).toEqual(39.47324);
  expect(feed.shapes![3].shape_pt_lon).toEqual(-0.36546);
  expect(feed.shapes![3].shape_pt_sequence).toEqual(4);
  expect(feed.shapes![3].shape_dist_traveled).toEqual(1.29);

  expect(feed.stop_times.length).toEqual(2);
  expect(feed.stop_times[0].shape_dist_traveled).toBeTypeOf('number');
  expect(feed.stop_times[0].stop_sequence).toBeTypeOf('number');
  expect(feed.stop_times[1].trip_id).toEqual('T0101');
  expect(feed.stop_times[1].arrival_time).toEqual('08:03:00');
  expect(feed.stop_times[1].departure_time).toBeFalsy();
  expect(feed.stop_times[1].stop_id).toEqual('ST02');
  expect(feed.stop_times[1].stop_sequence).toEqual(2);
  expect(feed.stop_times[1].pickup_type).toEqual(GTFSStopTimePickupDropOff.Scheduled);
  expect(feed.stop_times[1].drop_off_type).toEqual(GTFSStopTimePickupDropOff.Scheduled);
  expect(feed.stop_times[1].continuous_pickup).toEqual(GTFSContinuousPickupDropOff.NoContinuous);
  expect(feed.stop_times[1].continuous_drop_off).toEqual(GTFSContinuousPickupDropOff.Default);
  expect(feed.stop_times[1].shape_dist_traveled).toEqual(1.29);
  expect(feed.stop_times[1].timepoint).toEqual(GTFSStopTimeTimepoint.Exact);

  expect(feed.stops.length).toEqual(2);
  expect(feed.stops[0].stop_lat).toBeTypeOf('number');
  expect(feed.stops[0].stop_lon).toBeTypeOf('number');
  expect(feed.stops[0].stop_id).toEqual('ST01');
  expect(feed.stops[0].stop_code).toEqual('ST01');
  expect(feed.stops[0].stop_name).toEqual('Xàtiva');
  expect(feed.stops[1].stop_lat).toEqual(39.47345);
  expect(feed.stops[1].stop_lon).toEqual(-0.36553);
  expect(feed.stops[1].location_type).toEqual(GTFSStopLocationType.Stop);
  expect(feed.stops[1].wheelchair_boarding).toEqual(GTFSWheelchairAccessbility.Inaccessible);

  expect(feed.trips.length).toEqual(1);
  expect(feed.trips[0].route_id).toEqual('R01');
  expect(feed.trips[0].service_id).toEqual('S01');
  expect(feed.trips[0].trip_id).toEqual('T0101');
  expect(feed.trips[0].trip_headsign).toEqual('Headsign');
  expect(feed.trips[0].trip_short_name).toEqual('Short Name');
  expect(feed.trips[0].direction_id).toEqual(GTFSTripDirection.OneDirection);
  expect(feed.trips[0].shape_id).toEqual('SH01');
  expect(feed.trips[0].wheelchair_accessible).toEqual(GTFSWheelchairAccessbility.Accessible);
  expect(feed.trips[0].bikes_allowed).toEqual(GTFSTripBikesAllowed.NotAllowed);
};

const getFiles = (): GTFSFileContent[] => [
  { name: 'agency.txt', content: readFileSync(join(DIR_PATH, 'agency.txt')) },
  { name: 'calendar_dates.txt', content: readFileSync(join(DIR_PATH, 'calendar_dates.txt')) },
  { name: 'calendar.txt', content: readFileSync(join(DIR_PATH, 'calendar.txt')) },
  { name: 'routes.txt', content: readFileSync(join(DIR_PATH, 'routes.txt')) },
  { name: 'shapes.txt', content: readFileSync(join(DIR_PATH, 'shapes.txt')) },
  { name: 'stop_times.txt', content: readFileSync(join(DIR_PATH, 'stop_times.txt')) },
  { name: 'stops.txt', content: readFileSync(join(DIR_PATH, 'stops.txt')) },
  { name: 'trips.txt', content: readFileSync(join(DIR_PATH, 'trips.txt')) }
];

test('Test FeedReader: zip path', () => {
  const reader = GTFSFeedReader.fromZip(ZIP_PATH);
  const feed = reader.loadFeed();
  assert(feed);
});

test('Test AsyncFeedReader: zip path', async() => {
  const reader = GTFSAsyncFeedReader.fromZip(ZIP_PATH);
  const feed = await reader.loadFeed();
  assert(feed);
});

test('Test FeedReader: zip content', () => {
  const zip = readFileSync(ZIP_PATH);
  const reader = GTFSFeedReader.fromZip(zip);
  const feed = reader.loadFeed();
  assert(feed);
});

test('Test AsyncFeedReader: zip content', async() => {
  const zip = readFileSync(ZIP_PATH);
  const reader = GTFSAsyncFeedReader.fromZip(zip);
  const feed = await reader.loadFeed();
  assert(feed);
});

test('Test FeedReader: directory path', () => {
  const reader = GTFSFeedReader.fromDirectoy(DIR_PATH);
  const feed = reader.loadFeed();
  assert(feed);
});

test('Test AsyncFeedReader: directory path', async () => {
  const reader = GTFSAsyncFeedReader.fromDirectoy(DIR_PATH);
  const feed = await reader.loadFeed();
  assert(feed);
});

test('Test FeedReader: file contents', () => {
  const reader = GTFSFeedReader.fromFiles(getFiles());
  const feed = reader.loadFeed();
  assert(feed);
});

test('Test AsyncFeedReader: file contents', async() => {
  const reader = GTFSAsyncFeedReader.fromFiles(getFiles());
  const feed = await reader.loadFeed();
  assert(feed);
});
