import { GTFSAsyncFileIO, GTFSFileIO } from '../file/main.js';
import { GTFS_FILES } from '../../file-info.js';
import type { GTFSFileInfo } from '../../file-info.d.ts';
import type { GTFSFileRow } from '../../types.d.ts';
import type { GTFSAgency } from '../../files/agency.d.ts';
import type { GTFSStop } from '../../files/stop.d.ts';
import type { GTFSRoute } from '../../files/route.d.ts';
import type { GTFSTrip } from '../../files/trip.d.ts';
import type { GTFSStopTime } from '../../files/stop-time.d.ts';
import type { GTFSCalendar } from '../../files/calendar.d.ts';
import type { GTFSCalendarDate } from '../../files/calendar-date.d.ts';
import type { GTFSFareAttribute } from '../../files/fare-attribute.d.ts';
import type { GTFSFareRule } from '../../files/fare-rule.d.ts';
import type { GTFSTimeframe } from '../../files/timeframe.d.ts';
import type { GTFSFareMedia } from '../../files/fare-media.d.ts';
import type { GTFSFareProduct } from '../../files/fare-product.d.ts';
import type { GTFSFareLegRule } from '../../files/fare-leg-rule.d.ts';
import type { GTFSFareTransferRule } from '../../files/fare-transfer-rule.d.ts';
import type { GTFSArea } from '../../files/area.d.ts';
import type { GTFSStopArea } from '../../files/stop-area.d.ts';
import type { GTFSNetwork } from '../../files/network.d.ts';
import type { GTFSRouteNetwork } from '../../files/route-network.d.ts';
import type { GTFSShape } from '../../files/shape.d.ts';
import type { GTFSFrequency } from '../../files/frequency.d.ts';
import type { GTFSTransfer } from '../../files/transfer.d.ts';
import type { GTFSPathway } from '../../files/pathway.d.ts';
import type { GTFSLevel } from '../../files/level.d.ts';
import type { GTFSTranslation } from '../../files/translation.d.ts';
import type { GTFSFeedInfo } from '../../files/feed-info.d.ts';
import type { GTFSAttribution } from '../../files/attribution.d.ts';
import type { GTFSIOWriteOptions } from '../file/types.d.ts';

/**
 * IO operations of feed file.
 */
abstract class FeedFileIO {
  /** File information */
  protected fileInfo: GTFSFileInfo;

  /**
   * File name including .txt.
   */
  public get fileName(): string {
    return this.fileInfo.fileName;
  }

  /**
   * File columns
   */
  public get columns(): string[] {
    return Object.keys(this.fileInfo.columns);
  }

  /**
   * Constructor
   * @param file File information
   */
  public constructor(file: GTFSFileInfo) {
    this.fileInfo = file;
  }
}

/**
 * Class for IO operations on a GTFS feed file
 */
export class GTFSFeedFileIO<RowType extends GTFSFileRow = GTFSFileRow> extends FeedFileIO {
  /**
   * Read lines into records.
   * @param chunks Iterable file content chunks
   * @returns Iterable records
   */
  public *read(chunks: IterableIterator<string>): IterableIterator<RowType> {
    yield *GTFSFileIO.read(this.fileInfo, chunks);
    return;
  }

  /**
   * Write records into lines.
   * @param records Iterable records
   * @returns Iterable lines
   */
  public *write(records: IterableIterator<RowType>): IterableIterator<string> {
    yield *GTFSFileIO.write(this.fileInfo, records);
    return;
  }

  /**
   * Read file content into records array.
   * @param content File content
   * @returns Records array
   */
  public readContent(content: string): RowType[] {
    return GTFSFileIO.readContent(this.fileInfo, content);
  }

  /**
   * Write records array into file content.
   * @param records Records array
   * @returns File content
   */
  public writeContent(records: RowType[]): string {
    return GTFSFileIO.writeContent(this.fileInfo, records);
  }
};

/**
 * Class for asynchronous IO operations on a GTFS feed file
 */
export class GTFSAsyncFeedFileIO<RowType extends GTFSFileRow = GTFSFileRow> extends FeedFileIO {
  /**
   * Read lines into records.
   * @param chunks Iterable file content chunks
   * @returns Iterable records
   */
  public async *read(chunks: AsyncIterableIterator<string>): AsyncIterableIterator<RowType> {
    yield *GTFSAsyncFileIO.read(this.fileInfo, chunks);
    return;
  }

  /**
   * Write records into lines.
   * @param records Iterable records
   * @returns Iterable lines
   */
  public async *write(records: AsyncIterableIterator<RowType>): AsyncIterableIterator<string> {
    yield *GTFSAsyncFileIO.write(this.fileInfo, records);
    return;
  }

  /**
   * Await for all chunks and return all the records.
   * @param chunks Chunks generator
   * @returns Promise of all records
   */
  public async readAll(chunks: AsyncIterableIterator<string>): Promise<RowType[]> {
    return GTFSAsyncFileIO.readAll(this.fileInfo, chunks);
  }

  /**
   * Read file content and return all the records.
   * @param content File content
   * @returns Promise of all records
   */
  public async readAllContent(content: string): Promise<RowType[]> {
    return GTFSAsyncFileIO.readAllContent(this.fileInfo, content);
  }

  /**
   * Await for all records and return file content.
   * @param records Records generator
   * @param options Write options
   * @returns Promise of file content
   */
  public async writeAll(records: AsyncIterableIterator<RowType>, options?: GTFSIOWriteOptions): Promise<string> {
    return GTFSAsyncFileIO.writeAll(this.fileInfo, records, options);
  }

  /**
   * Write file content from given records.
   * @param records Records array
   * @param options Write options
   * @returns Promise of all records
   */
  public async writeAllRecords(records: RowType[], options?: GTFSIOWriteOptions): Promise<string> {
    return GTFSAsyncFileIO.writeAllRecords(this.fileInfo, records, options);
  }
}

/** IO Operations for agency.txt file */
export class GTFSAgencyIO extends GTFSFeedFileIO<GTFSAgency> { public constructor() { super(GTFS_FILES.agency); } }
/** Async IO Operations for agency.txt file */
export class GTFSAsyncAgencyIO extends GTFSAsyncFeedFileIO<GTFSAgency> { public constructor() { super(GTFS_FILES.agency); } }

/** IO Operations for stops.txt file */
export class GTFSStopIO extends GTFSFeedFileIO<GTFSStop> { public constructor() { super(GTFS_FILES.stops); } }
/** Async IO Operations for stops.txt file */
export class GTFSAsyncStopIO extends GTFSAsyncFeedFileIO<GTFSStop> { public constructor() { super(GTFS_FILES.stops); } }

/** IO Operations for routes.txt file */
export class GTFSRouteIO extends GTFSFeedFileIO<GTFSRoute> { public constructor() { super(GTFS_FILES.routes); } }
/** Async IO Operations for routes.txt file */
export class GTFSAsyncRouteIO extends GTFSAsyncFeedFileIO<GTFSRoute> { public constructor() { super(GTFS_FILES.routes); } }

/** IO Operations for trips.txt file */
export class GTFSTripIO extends GTFSFeedFileIO<GTFSTrip> { public constructor() { super(GTFS_FILES.trips); } }
/** Async IO Operations for trips.txt file */
export class GTFSAsyncTripIO extends GTFSAsyncFeedFileIO<GTFSTrip> { public constructor() { super(GTFS_FILES.trips); } }

/** IO Operations for stop_times.txt file */
export class GTFSStopTimeIO extends GTFSFeedFileIO<GTFSStopTime> { public constructor() { super(GTFS_FILES.stop_times); } }
/** Async IO Operations for stop_times.txt file */
export class GTFSAsyncStopTimeIO extends GTFSAsyncFeedFileIO<GTFSStopTime> { public constructor() { super(GTFS_FILES.stop_times); } }

/** IO Operations for calendar.txt file */
export class GTFSCalendarIO extends GTFSFeedFileIO<GTFSCalendar> { public constructor() { super(GTFS_FILES.calendar); } }
/** Async IO Operations for calendar.txt file */
export class GTFSAsyncCalendarIO extends GTFSAsyncFeedFileIO<GTFSCalendar> { public constructor() { super(GTFS_FILES.calendar); } }

/** IO Operations for calendar_dates.txt file */
export class GTFSCalendarDateIO extends GTFSFeedFileIO<GTFSCalendarDate> { public constructor() { super(GTFS_FILES.calendar_dates); } }
/** Async IO Operations for calendar_dates.txt file */
export class GTFSAsyncCalendarDateIO extends GTFSAsyncFeedFileIO<GTFSCalendarDate> { public constructor() { super(GTFS_FILES.calendar_dates); } }

/** IO Operations for fare_attributes.txt file */
export class GTFSFareAttributeIO extends GTFSFeedFileIO<GTFSFareAttribute> { public constructor() { super(GTFS_FILES.fare_attributes); } }
/** Async IO Operations for fare_attributes.txt file */
export class GTFSAsyncFareAttributeIO extends GTFSAsyncFeedFileIO<GTFSFareAttribute> { public constructor() { super(GTFS_FILES.fare_attributes); } }

/** IO Operations for fare_rules.txt file */
export class GTFSFareRuleIO extends GTFSFeedFileIO<GTFSFareRule> { public constructor() { super(GTFS_FILES.fare_rules); } }
/** Async IO Operations for fare_rules.txt file */
export class GTFSAsyncFareRuleIO extends GTFSAsyncFeedFileIO<GTFSFareRule> { public constructor() { super(GTFS_FILES.fare_rules); } }

/** IO Operations for timeframes.txt file */
export class GTFSTimeframeIO extends GTFSFeedFileIO<GTFSTimeframe> { public constructor() { super(GTFS_FILES.timeframes); } }
/** Async IO Operations for timeframes.txt file */
export class GTFSAsyncTimeframeIO extends GTFSAsyncFeedFileIO<GTFSTimeframe> { public constructor() { super(GTFS_FILES.timeframes); } }

/** IO Operations for fare_media.txt file */
export class GTFSFareMediaIO extends GTFSFeedFileIO<GTFSFareMedia> { public constructor() { super(GTFS_FILES.fare_media); } }
/** Async IO Operations for fare_media.txt file */
export class GTFSAsyncFareMediaIO extends GTFSAsyncFeedFileIO<GTFSFareMedia> { public constructor() { super(GTFS_FILES.fare_media); } }

/** IO Operations for fare_products.txt file */
export class GTFSFareProductIO extends GTFSFeedFileIO<GTFSFareProduct> { public constructor() { super(GTFS_FILES.fare_products); } }
/** Async IO Operations for fare_products.txt file */
export class GTFSAsyncFareProductIO extends GTFSAsyncFeedFileIO<GTFSFareProduct> { public constructor() { super(GTFS_FILES.fare_products); } }

/** IO Operations for fare_leg_rules.txt file */
export class GTFSFareLegRuleIO extends GTFSFeedFileIO<GTFSFareLegRule> { public constructor() { super(GTFS_FILES.fare_leg_rules); } }
/** Async IO Operations for fare_leg_rules.txt file */
export class GTFSAsyncFareLegRuleIO extends GTFSAsyncFeedFileIO<GTFSFareLegRule> { public constructor() { super(GTFS_FILES.fare_leg_rules); } }

/** IO Operations for fare_transfer_rules.txt file */
export class GTFSFareTransferRuleIO extends GTFSFeedFileIO<GTFSFareTransferRule> { public constructor() { super(GTFS_FILES.fare_transfer_rules); } }
/** Async IO Operations for fare_transfer_rules.txt file */
export class GTFSAsyncFareTransferRuleIO extends GTFSAsyncFeedFileIO<GTFSFareTransferRule> { public constructor() { super(GTFS_FILES.fare_transfer_rules); } }

/** IO Operations for areas.txt file */
export class GTFSAreaIO extends GTFSFeedFileIO<GTFSArea> { public constructor() { super(GTFS_FILES.areas); } }
/** Async IO Operations for areas.txt file */
export class GTFSAsyncAreaIO extends GTFSAsyncFeedFileIO<GTFSArea> { public constructor() { super(GTFS_FILES.areas); } }

/** IO Operations for stop_areas.txt file */
export class GTFSStopAreaIO extends GTFSFeedFileIO<GTFSStopArea> { public constructor() { super(GTFS_FILES.stop_areas); } }
/** Async IO Operations for stop_areas.txt file */
export class GTFSAsyncStopAreaIO extends GTFSAsyncFeedFileIO<GTFSStopArea> { public constructor() { super(GTFS_FILES.stop_areas); } }

/** IO Operations for networks.txt file */
export class GTFSNetworkIO extends GTFSFeedFileIO<GTFSNetwork> { public constructor() { super(GTFS_FILES.networks); } }
/** Async IO Operations for networks.txt file */
export class GTFSAsyncNetworkIO extends GTFSAsyncFeedFileIO<GTFSNetwork> { public constructor() { super(GTFS_FILES.networks); } }

/** IO Operations for route_networks.txt file */
export class GTFSRouteNetworkIO extends GTFSFeedFileIO<GTFSRouteNetwork> { public constructor() { super(GTFS_FILES.route_networks); } }
/** Async IO Operations for route_networks.txt file */
export class GTFSAsyncRouteNetworkIO extends GTFSAsyncFeedFileIO<GTFSRouteNetwork> { public constructor() { super(GTFS_FILES.route_networks); } }

/** IO Operations for shapes.txt file */
export class GTFSShapeIO extends GTFSFeedFileIO<GTFSShape> { public constructor() { super(GTFS_FILES.shapes); } }
/** Async IO Operations for shapes.txt file */
export class GTFSAsyncShapeIO extends GTFSAsyncFeedFileIO<GTFSShape> { public constructor() { super(GTFS_FILES.shapes); } }

/** IO Operations for frequencies.txt file */
export class GTFSFrequencyIO extends GTFSFeedFileIO<GTFSFrequency> { public constructor() { super(GTFS_FILES.frequencies); } }
/** Async IO Operations for frequencies.txt file */
export class GTFSAsyncFrequencyIO extends GTFSAsyncFeedFileIO<GTFSFrequency> { public constructor() { super(GTFS_FILES.frequencies); } }

/** IO Operations for transfers.txt file */
export class GTFSTransferIO extends GTFSFeedFileIO<GTFSTransfer> { public constructor() { super(GTFS_FILES.transfers); } }
/** Async IO Operations for transfers.txt file */
export class GTFSAsyncTransferIO extends GTFSAsyncFeedFileIO<GTFSTransfer> { public constructor() { super(GTFS_FILES.transfers); } }

/** IO Operations for pathways.txt file */
export class GTFSPathwayIO extends GTFSFeedFileIO<GTFSPathway> { public constructor() { super(GTFS_FILES.pathways); } }
/** Async IO Operations for pathways.txt file */
export class GTFSAsyncPathwayIO extends GTFSAsyncFeedFileIO<GTFSPathway> { public constructor() { super(GTFS_FILES.pathways); } }

/** IO Operations for levels.txt file */
export class GTFSLevelIO extends GTFSFeedFileIO<GTFSLevel> { public constructor() { super(GTFS_FILES.levels); } }
/** Async IO Operations for levels.txt file */
export class GTFSAsyncLevelIO extends GTFSAsyncFeedFileIO<GTFSLevel> { public constructor() { super(GTFS_FILES.levels); } }

/** IO Operations for translations.txt file */
export class GTFSTranslationIO extends GTFSFeedFileIO<GTFSTranslation> { public constructor() { super(GTFS_FILES.translations); } }
/** Async IO Operations for translations.txt file */
export class GTFSAsyncTranslationIO extends GTFSAsyncFeedFileIO<GTFSTranslation> { public constructor() { super(GTFS_FILES.translations); } }

/** IO Operations for feed_info.txt file */
export class GTFSFeedInfoIO extends GTFSFeedFileIO<GTFSFeedInfo> { public constructor() { super(GTFS_FILES.feed_info); } }
/** Async IO Operations for feed_info.txt file */
export class GTFSAsyncFeedInfoIO extends GTFSAsyncFeedFileIO<GTFSFeedInfo> { public constructor() { super(GTFS_FILES.feed_info); } }

/** IO Operations for attributions.txt file */
export class GTFSAttributionIO extends GTFSFeedFileIO<GTFSAttribution> { public constructor() { super(GTFS_FILES.attributions); } }
/** Async IO Operations for attributions.txt file */
export class GTFSAsyncAttributionIO extends GTFSAsyncFeedFileIO<GTFSAttribution> { public constructor() { super(GTFS_FILES.attributions); } }

/**
 * Get feed file IO instance from file name.
 * @param fileName File name with .txt
 * @param async True for async IO class instance
 * @returns GTFSFeedFileIO
 */
const fileNameToIO = (fileName: string, async: boolean): GTFSFeedFileIO|GTFSAsyncFileIO => {
  switch(fileName) {
    case 'agency.txt': return async ? new GTFSAsyncAgencyIO() : new GTFSAgencyIO();
    case 'stops.txt': return async ? new GTFSAsyncStopIO() : new GTFSStopIO();
    case 'routes.txt': return async ? new GTFSAsyncRouteIO() : new GTFSRouteIO();
    case 'trips.txt': return async ? new GTFSAsyncTripIO() : new GTFSTripIO();
    case 'stop_times.txt': return async ? new GTFSAsyncStopTimeIO() : new GTFSStopTimeIO();
    case 'calendar.txt': return async ? new GTFSAsyncCalendarIO() : new GTFSCalendarIO();
    case 'calendar_dates.txt': return async ? new GTFSAsyncCalendarDateIO() : new GTFSCalendarDateIO();
    case 'fare_attributes.txt': return async ? new GTFSAsyncFareAttributeIO() : new GTFSFareAttributeIO();
    case 'fare_rules.txt': return async ? new GTFSAsyncFareRuleIO() : new GTFSFareRuleIO();
    case 'timeframes.txt': return async ? new GTFSAsyncTimeframeIO() : new GTFSTimeframeIO();
    case 'fare_media.txt': return async ? new GTFSAsyncFareMediaIO() : new GTFSFareMediaIO();
    case 'fare_products.txt': return async ? new GTFSAsyncFareProductIO() : new GTFSFareProductIO();
    case 'fare_leg_rules.txt': return async ? new GTFSAsyncFareLegRuleIO() : new GTFSFareLegRuleIO();
    case 'fare_transfer_rules.txt': return async ? new GTFSAsyncFareTransferRuleIO() : new GTFSFareTransferRuleIO();
    case 'areas.txt': return async ? new GTFSAsyncAreaIO() : new GTFSAreaIO();
    case 'stop_areas.txt': return async ? new GTFSAsyncStopAreaIO() : new GTFSStopAreaIO();
    case 'networks.txt': return async ? new GTFSAsyncNetworkIO() : new GTFSNetworkIO();
    case 'route_networks.txt': return async ? new GTFSAsyncRouteNetworkIO() : new GTFSRouteNetworkIO();
    case 'shapes.txt': return async ? new GTFSAsyncShapeIO() : new GTFSShapeIO();
    case 'frequencies.txt': return async ? new GTFSAsyncFrequencyIO() : new GTFSFrequencyIO();
    case 'transfers.txt': return async ? new GTFSAsyncTransferIO() : new GTFSTransferIO();
    case 'pathways.txt': return async ? new GTFSAsyncPathwayIO() : new GTFSPathwayIO();
    case 'levels.txt': return async ? new GTFSAsyncLevelIO() : new GTFSLevelIO();
    case 'translations.txt': return async ? new GTFSAsyncTranslationIO() : new GTFSTranslationIO();
    case 'feed_info.txt': return async ? new GTFSAsyncFeedInfoIO() : new GTFSFeedInfoIO();
    case 'attributions.txt': return async ? new GTFSAsyncAttributionIO() : new GTFSAttributionIO();
  }
  throw new Error(`Unknown file name ${fileName}`);
};

/**
 * Get feed file IO instance from file name.
 * @param fileName File name with .txt
 * @returns GTFSFeedFileIO
 */
export const getIOFromFileName = (fileName: string): GTFSFeedFileIO => fileNameToIO(fileName, false) as GTFSFeedFileIO;

/**
 * Get feed file async IO instance from file name.
 * @param fileName File name with .txt
 * @returns GTFSAsyncFeedFileIO
 */
export const getAsyncIOFromFileName = (fileName: string): GTFSAsyncFeedFileIO => fileNameToIO(fileName, true) as GTFSAsyncFeedFileIO;
