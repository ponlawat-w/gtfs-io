import { describe, expect, it } from 'vitest';
import {
  GTFS_FILES,
  GTFSAsyncFileIO,
  GTFSFileIO,
  GTFSStopLocationType,
  GTFSTripDirection
} from '../dist';
import type {
  GTFSFileRecords,
  GTFSAgency,
  GTFSRoute,
  GTFSStop,
  GTFSTrip
} from '../dist';

describe('Test GTFSFileIO reading', () => {
  const content = 'stop_id,stop_name,stop_code,stop_desc,stop_lat,stop_lon,location_type,parent_station\n'
    + 'STOP_01,"Test",1001,,50.25,-23.28,1,\n'
    + '"STOP_02",Test2,"1002",,50.25,-23.28,"0",STOP_01\n'
    + 'STOP_03,"NameWith,Comma",1003,,50.30,-23.30,0,\n'
    + 'STOP_04,Test4,1004,"Description with\nNew line",50.31,-23.48,0,\n';
  const chunks = [
    'stop_id,stop_name,stop_code,stop_desc,stop_lat,stop_', 'lon,location_type,parent_station\n',
    'STOP_01,"Test",1001,,50.25,-23.28,1,\n"STOP_02",Test2,"1002",,50',
    '.25,-23.28,"0",STOP_01\n',
    'STOP_03,"NameWith,Comma",1003,,50.30,-23.30,0,\nSTOP_04,Test4',
    ',1004,"Description with',
    '\nNew line",50.31,-23.48,0,\n'
  ];

  it('reads rows into records', () => {
    const records = GTFSFileIO.readContent<GTFSStop>(GTFS_FILES.stops, content);
    expect(records.length).toEqual(4);
    expect(records[0].stop_id).toEqual('STOP_01');
    expect(records[0].stop_code).toBeTypeOf('string');
    expect(records[0].stop_code).toEqual('1001');
    expect(records[0].stop_name).toEqual('Test');
    expect(records[0].location_type).toBeTypeOf('number');
    expect(records[0].location_type).toEqual(1);
    expect(records[0].location_type).toEqual(GTFSStopLocationType.Station);
    expect(records[0].parent_station).toBeFalsy();
    expect(records[1].stop_id).toBeTruthy();
    expect(records[1].stop_id).toEqual('STOP_02');
    expect(records[1].stop_code).toEqual('1002');
    expect(records[1].stop_name).toEqual('Test2');
    expect(records[1].location_type).toBeTypeOf('number');
    expect(records[1].location_type).toEqual(0);
    expect(records[1].location_type).toEqual(GTFSStopLocationType.Stop);
    expect(records[1].parent_station).toEqual('STOP_01');
    expect(records[2].stop_name).toEqual('NameWith,Comma');
    expect(records[2].stop_code).toEqual('1003');
    expect(records[3].stop_id).toEqual('STOP_04');
    expect(records[3].stop_desc).toEqual('Description with\nNew line');
    expect(records[3].stop_lat).toEqual(50.31);
    expect(records[3].stop_lon).toEqual(-23.48);
  });

  it('reads chunks into records', () => {
    const recordsFromContent = GTFSFileIO.readContent<GTFSStop>(GTFS_FILES.stops, content);
    const recordsFromChunks = [...GTFSFileIO.read<GTFSStop>(GTFS_FILES.stops, chunks.values())];
    expect(recordsFromChunks.length).toEqual(recordsFromContent.length);
    expect(recordsFromChunks[0]).toEqual(recordsFromContent[0]);
    expect(recordsFromChunks[1]).toEqual(recordsFromContent[1]);
    expect(recordsFromChunks[2]).toEqual(recordsFromContent[2]);
    expect(recordsFromChunks[3]).toEqual(recordsFromContent[3]);
  });

  it('asynchronously reads chunks into records', async() => {
    const recordsFromContent = GTFSFileIO.readContent<GTFSStop>(GTFS_FILES.stops, content);
    const chunksGenerator = async function*() { for (const chunk of chunks) yield chunk; };
    const recordsFromChunks = await GTFSAsyncFileIO.readAll(GTFS_FILES.stops, chunksGenerator());
    expect(recordsFromChunks.length).toEqual(recordsFromContent.length);
    expect(recordsFromChunks[0]).toEqual(recordsFromContent[0]);
    expect(recordsFromChunks[1]).toEqual(recordsFromContent[1]);
    expect(recordsFromChunks[2]).toEqual(recordsFromContent[2]);
    expect(recordsFromChunks[3]).toEqual(recordsFromContent[3]);
  });

  it('handles empty file content', () => {
    const content = 'stop_id,stop_name,stop_code,stop_desc,stop_lat,stop_lon,location_type,parent_station\n';
    const records = GTFSFileIO.readContent<GTFSStop>(GTFS_FILES.stops, content);
    expect(records.length).toEqual(0);

    expect(GTFSFileIO.readContent<GTFSAgency>(GTFS_FILES.agency, '').length).toEqual(0);
  });
});

describe('Test GTFSFileIO writing', () => {
  const records: GTFSTrip[] = [
    { route_id: 'R01', service_id: 'S01', trip_id: 'T01', direction_id: GTFSTripDirection.OneDirection },
    { route_id: 'R01', service_id: 'S02', trip_id: 'T02', trip_headsign: 'HEADSIGN' },
    { route_id: 'R03', service_id: 'S01', trip_id: 'T03', trip_headsign: 'with,comma' },
    { route_id: 'R02', service_id: 'S02', trip_id: 'T04', trip_headsign: 'with\nnewline' }
  ];

  it('writes records into rows', () => {
    const content = GTFSFileIO.writeContent(GTFS_FILES.trips, records, { recordsBufferSize: 2 });
    expect(content).toEqual(
      'route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,block_id,shape_id,wheelchair_accessible,bikes_allowed\n'
      + 'R01,S01,T01,,,0,,,,\n'
      + 'R01,S02,T02,HEADSIGN,,,,,,\n'
      + 'R03,S01,T03,"with,comma",,,,,,\n'
      + 'R02,S02,T04,"with\n'
      + 'newline",,,,,,\n'
    );
  });

  it('asynchronously writes records into rows', async() => {
    const recordsGenerator = async function*() { for (const record of records) yield record; };
    const content = await GTFSAsyncFileIO.writeAll(GTFS_FILES.trips, recordsGenerator(), { recordsBufferSize: 2 });
    expect(content).toEqual(
      'route_id,service_id,trip_id,trip_headsign,trip_short_name,direction_id,block_id,shape_id,wheelchair_accessible,bikes_allowed\n'
      + 'R01,S01,T01,,,0,,,,\n'
      + 'R01,S02,T02,HEADSIGN,,,,,,\n'
      + 'R03,S01,T03,"with,comma",,,,,,\n'
      + 'R02,S02,T04,"with\n'
      + 'newline",,,,,,\n'
    );
  });

  it('handles empty input', () => {
    const records: GTFSRoute[] = [];
    const content = GTFSFileIO.writeContent(GTFS_FILES.routes, records);
    expect(content).toEqual(
      'route_id,agency_id,route_short_name,route_long_name,route_desc,route_type,route_url,route_color,'
      + 'route_text_color,route_sort_order,continuous_pickup,continuous_drop_off,network_id\n'
    );
  });
});
