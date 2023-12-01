import { describe, expect, it } from 'vitest';
import { parse } from 'csv/sync';
import { GTFSAgency, GTFSFileIO, GTFSFileInfos, GTFSTripDirection } from '../dist';
import type { GTFSRoute, GTFSStop, GTFSTrip } from '../dist';

describe('Test GTFSFileIO reading', () => {
  it('reads rows into records', () => {
    const input = function*(): IterableIterator<string> {
      yield 'stop_id,stop_name,stop_code,stop_desc,stop_lat,stop_lon,location_type,parent_station';
      yield 'STOP_01,"Test",1001,,50.25,-23.28,1,';
      yield '"STOP_02",Test2,"1002",,50.25,-23.28,"0",STOP_01';
      yield '';
      return;
    };

    let readRecords = [...GTFSFileIO.read<GTFSStop>(GTFSFileInfos.stops, input())];
    expect(readRecords.length).toEqual(2);
    expect(readRecords[0].stop_id).toEqual('STOP_01');
    expect(readRecords[0].stop_code).toBeTypeOf('string');
    expect(readRecords[0].stop_code).toEqual('1001');
    expect(readRecords[0].stop_name).toEqual('Test');
    expect(readRecords[0].location_type).toBeTypeOf('number');
    expect(readRecords[0].location_type).toEqual(1);
    expect(readRecords[0].parent_station).toBeFalsy();
    expect(readRecords[1].stop_id).toBeTruthy();
    expect(readRecords[1].stop_id).toEqual('STOP_02');
    expect(readRecords[1].stop_code).toEqual('1002');
    expect(readRecords[1].stop_name).toEqual('Test2');
    expect(readRecords[1].location_type).toBeTypeOf('number');
    expect(readRecords[1].location_type).toEqual(0);
    expect(readRecords[1].parent_station).toEqual('STOP_01');
  });

  it('handles empty file content', () => {
    const input = function*(): IterableIterator<string> {
      yield 'stop_id,stop_name,stop_code,stop_desc,stop_lat,stop_lon,location_type,parent_station';
      yield '';
      return;
    };
    const records = [...GTFSFileIO.read<GTFSStop>(GTFSFileInfos.stops, input())];
    expect(records.length).toEqual(0);

    const emptyInput = function*(): IterableIterator<string> {
      return;
    }
    expect([...GTFSFileIO.read<GTFSAgency>(GTFSFileInfos.agency, emptyInput())].length).toEqual(0);
  });
});

describe('Test GTFSFileIO writing', () => {
  it('writes records into rows', () => {
    const input = function*(): IterableIterator<GTFSTrip> {
      yield { route_id: 'R01', service_id: 'S01', trip_id: 'T01', direction_id: GTFSTripDirection.OneDirection },
      yield { route_id: 'R01', service_id: 'S02', trip_id: 'T02', trip_headsign: 'HEADSIGN' }
      return;
    };
    const lines = [...GTFSFileIO.write<GTFSTrip>(GTFSFileInfos.trips, input())];
    expect(lines.length).toEqual(3);

    expect(parse(lines[0])).toContainEqual([
      'route_id',
      'service_id',
      'trip_id',
      'trip_headsign',
      'trip_short_name',
      'direction_id',
      'block_id',
      'shape_id',
      'wheelchair_accessible',
      'bikes_allowed'
    ]);

    const records = parse(lines.join('\n'), { columns: true });
    expect(records[0].route_id).toEqual('R01');
    expect(records[0].service_id).toEqual('S01');
    expect(records[0].trip_id).toEqual('T01');
    expect(parseInt(records[0].direction_id)).toEqual(0);
    expect(records[0].trip_headsign).toBeFalsy();
    expect(records[0].shape_id).toBeFalsy();
    expect(records[1].route_id).toEqual('R01');
    expect(records[1].service_id).toEqual('S02');
    expect(records[1].trip_id).toEqual('T02');
    expect(records[1].trip_headsign).toEqual('HEADSIGN');
  });

  it('handles empty input', () => {
    const input = function*(): IterableIterator<GTFSRoute> { return; };
    const output = [...GTFSFileIO.write<GTFSRoute>(GTFSFileInfos.routes, input())];
    expect(output.length).toEqual(1);
    expect(parse(output[0])).toContainEqual([
      'route_id',
      'agency_id',
      'route_short_name',
      'route_long_name',
      'route_desc',
      'route_type',
      'route_url',
      'route_color',
      'route_text_color',
      'route_sort_order',
      'continuous_pickup',
      'continuous_drop_off',
      'network_id'
    ]);
  });
});
