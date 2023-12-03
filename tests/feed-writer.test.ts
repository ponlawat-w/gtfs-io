import { expect, test } from 'vitest';
import AdmZip from 'adm-zip';
import { existsSync, readFileSync, readdirSync, rmSync } from 'fs';
import { join as joinPath } from 'path';
import {
  GTFSContinuousPickupDropOff,
  GTFSFeed,
  GTFSFeedWriter,
  GTFSRouteType,
  GTFSStopTimePickupDropOff,
  GTFSStopTimeTimepoint,
  GTFSTripBikesAllowed,
  GTFSTripDirection,
  GTFSWheelchairAccessbility
} from '../dist';

const OUTPUT_DIR = './tests/data/ignore';
const COMPARE_DIR = './tests/data/gtfs';

const getTestFeed = (): GTFSFeed => ({
  agency: [{
    agency_id: 'A01',
    agency_name: 'This Agency',
    agency_url: 'https://test.agency',
    agency_timezone: 'Europe/Madrid',
    agency_lang: 'en',
    agency_phone: '+34000000000',
    agency_fare_url: 'https://test.agency/fare',
    agency_email: 'contact@test.agency'
  }],
  calendar_dates: [],
  calendar: [
    { service_id: 'S01', monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1, saturday: 0, sunday: 0, start_date: '20231201', end_date: '20231231' },
    { service_id: 'S02', monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 1, sunday: 1, start_date: '20231201', end_date: '20231231' }
  ],
  routes: [
    {
      route_id: 'R01', agency_id: 'A01', route_short_name: '01', route_long_name: 'Route Number 1', route_desc: '', route_type: GTFSRouteType.Bus,
      route_url: '', route_color: 'ffffff', route_text_color: '000000', route_sort_order: 1,
      continuous_pickup: GTFSContinuousPickupDropOff.Default, continuous_drop_off: GTFSContinuousPickupDropOff.NoContinuous, network_id: ''
    },
    {
      route_id: 'R02', agency_id: 'A01', route_short_name: '02', route_long_name: 'Route Number 2', route_desc: '', route_type: GTFSRouteType.Bus,
      route_url: '', route_color: '000000', route_text_color: 'ffffff', route_sort_order: 2,
      continuous_pickup: GTFSContinuousPickupDropOff.NoContinuous, continuous_drop_off: GTFSContinuousPickupDropOff.NoContinuous, network_id: ''
    }
  ],
  shapes: [
    { shape_id: 'SH01', shape_pt_lat: 39.46717, shape_pt_lon: -0.37727, shape_pt_sequence: 1, shape_dist_traveled: 0.0 },
    { shape_id: 'SH01', shape_pt_lat: 39.46694, shape_pt_lon: -0.37485, shape_pt_sequence: 2, shape_dist_traveled: 0.2 },
    { shape_id: 'SH01', shape_pt_lat: 39.47166, shape_pt_lon: -0.36901, shape_pt_sequence: 3, shape_dist_traveled: 1.0 },
    { shape_id: 'SH01', shape_pt_lat: 39.47324, shape_pt_lon: -0.36546, shape_pt_sequence: 4, shape_dist_traveled: 1.29 }
  ],
  stop_times: [
    {
      trip_id: 'T0101', arrival_time: '', departure_time: '08:00:00', stop_id: 'ST01', stop_sequence: 1, stop_headsign: 'Alameda',
      pickup_type: GTFSStopTimePickupDropOff.Scheduled, drop_off_type: GTFSStopTimePickupDropOff.Scheduled,
      continuous_pickup: GTFSContinuousPickupDropOff.Default, continuous_drop_off: GTFSContinuousPickupDropOff.Default,
      shape_dist_traveled: 0, timepoint: GTFSStopTimeTimepoint.Exact
    },
    {
      trip_id: 'T0101', arrival_time: '08:03:00', departure_time: '', stop_id: 'ST02', stop_sequence: 2, stop_headsign: '',
      pickup_type: GTFSStopTimePickupDropOff.Scheduled, drop_off_type: GTFSStopTimePickupDropOff.Scheduled,
      continuous_pickup: GTFSContinuousPickupDropOff.NoContinuous, continuous_drop_off: GTFSContinuousPickupDropOff.Default,
      shape_dist_traveled: 1.29, timepoint: GTFSStopTimeTimepoint.Exact
    }
  ],
  stops: [
    {
      stop_id: 'ST01', stop_code: 'ST01', stop_name: 'Xàtiva', stop_lat: 39.46603, stop_lon: -0.37754,
      location_type: 0, wheelchair_boarding: GTFSWheelchairAccessbility.Accessible
    },
    {
      stop_id: 'ST02', stop_code: 'ST02', stop_name: 'Alameda', stop_lat: 39.47345, stop_lon: -0.36553,
      location_type: 0, wheelchair_boarding: GTFSWheelchairAccessbility.Inaccessible
    }
  ],
  trips: [{
    route_id: 'R01', service_id: 'S01', trip_id: 'T0101', trip_headsign: 'Headsign', trip_short_name: 'Short Name',
    direction_id: GTFSTripDirection.OneDirection, block_id: '', shape_id: 'SH01',
    wheelchair_accessible: GTFSWheelchairAccessbility.Accessible, bikes_allowed: GTFSTripBikesAllowed.NotAllowed
  }]
});

test('Test FeedWriter: zip', () => {
  const path = joinPath(OUTPUT_DIR, 'gtfs.zip');
  GTFSFeedWriter.writeZipSync(getTestFeed(), path);

  expect(existsSync(path)).toBeTruthy();

  const zip = new AdmZip(path);
  const entries = zip.getEntries();
  expect(entries.length).toEqual(8);
  const files = [
    'agency.txt', 'calendar_dates.txt', 'calendar.txt', 'routes.txt', 'shapes.txt', 'stop_times.txt', 'stops.txt', 'trips.txt'
  ];
  expect(entries.map(x => x.entryName).every(x => files.indexOf(x) > -1)).toBeTruthy();

  for (const entry of entries) {
    expect(
      entry.getData().toString().split(/\r?\n/g),
      entry.entryName
    ).toEqual(
      readFileSync(joinPath(COMPARE_DIR, entry.entryName)).toString().split(/\r?\n/g)
    );
  }
});

test('Test FeedWriter: dir', () => {
  if (existsSync(OUTPUT_DIR)) {
    for (const file of readdirSync(OUTPUT_DIR).filter(x => x.endsWith('.txt')).map(x => joinPath(OUTPUT_DIR, x))) {
      rmSync(file);
    }
  }

  GTFSFeedWriter.writeDirectorySync(getTestFeed(), OUTPUT_DIR);
  const files = [
    'agency.txt', 'calendar_dates.txt', 'calendar.txt', 'routes.txt', 'shapes.txt', 'stop_times.txt', 'stops.txt', 'trips.txt'
  ];

  expect(files.every(x => existsSync(joinPath(OUTPUT_DIR, x)))).toBeTruthy();
  for (const file of files) {
    expect(
      readFileSync(joinPath(OUTPUT_DIR, file)).toString().split(/\r?\n/g),
      file
    ).toEqual(
      readFileSync(joinPath(COMPARE_DIR, file)).toString().split(/\r?\n/g)
    );
  }
});

test('Test FeedWriter: contents', () => {
  const contents = GTFSFeedWriter.createFileContents(getTestFeed());
  expect(contents.length).toEqual(8);

  const files = [
    'agency.txt', 'calendar_dates.txt', 'calendar.txt', 'routes.txt', 'shapes.txt', 'stop_times.txt', 'stops.txt', 'trips.txt'
  ];
  expect(contents.every(c => files.indexOf(c.name) > -1)).toBeTruthy();

  for (const content of contents) {
    expect(content.content.toString().split(/\r?\n/g), content.name)
      .toEqual(readFileSync(joinPath(COMPARE_DIR, content.name)).toString().split(/\r?\n/g));
  }
});
