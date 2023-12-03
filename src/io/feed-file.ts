import GTFSFileIO from './file';
import { GTFS_FILES } from '../file-info';
import type { GTFSFileInfo } from '../file-info';
import type { GTFSFileRow } from '../types';
import type { GTFSAgency } from '../files/agency';
import type { GTFSStop } from '../files/stop';
import type { GTFSRoute } from '../files/route';
import type { GTFSTrip } from '../files/trip';
import type { GTFSStopTime } from '../files/stop-time';
import type { GTFSCalendar } from '../files/calendar';
import type { GTFSCalendarDate } from '../files/calendar-date';
import type { GTFSFareAttribute } from '../files/fare-attribute';
import type { GTFSFareRule } from '../files/fare-rule';
import type { GTFSTimeframe } from '../files/timeframe';
import type { GTFSFareMedia } from '../files/fare-media';
import type { GTFSFareProduct } from '../files/fare-product';
import type { GTFSFareLegRule } from '../files/fare-leg-rule';
import type { GTFSFareTransferRule } from '../files/fare-transfer-rule';
import type { GTFSArea } from '../files/area';
import type { GTFSStopArea } from '../files/stop-area';
import type { GTFSNetwork } from '../files/network';
import type { GTFSRouteNetwork } from '../files/route-network';
import type { GTFSShape } from '../files/shape';
import type { GTFSFrequency } from '../files/frequency';
import type { GTFSTransfer } from '../files/transfer';
import type { GTFSPathway } from '../files/pathway';
import type { GTFSLevel } from '../files/level';
import type { GTFSTranslation } from '../files/translation';
import type { GTFSFeedInfo } from '../files/feed-info';
import type { GTFSAttribution } from '../files/attribution';

/**
 * Class for IO operations on a GTFS feed file
 */
export class GTFSFeedFileIO<RowType extends GTFSFileRow = GTFSFileRow> {
  protected fileInfo: GTFSFileInfo;

  /**
   * File name including .txt.
   */
  public get fileName(): string {
    return this.fileInfo.name;
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

  /**
   * Read lines into records.
   * @param lines Iterable lines
   * @returns Iterable records
   */
  public *read(lines: IterableIterator<string>): IterableIterator<RowType> {
    yield *GTFSFileIO.read(this.fileInfo, lines);
    return;
  }

  /**
   * Read line strings array into records array.
   * @param lines Lines array
   * @returns Records array
   */
  public readLines(lines: string[]): RowType[] {
    return GTFSFileIO.readLines(this.fileInfo, lines);
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
   * Write records into lines.
   * @param records Iterable records
   * @returns Iterable lines
   */
  public *write(records: IterableIterator<RowType>): IterableIterator<string> {
    yield *GTFSFileIO.write(this.fileInfo, records);
    return;
  }

  /**
   * Write records array into line strings array.
   * @param records Records array
   * @returns Lines array
   */
  public writeLines(records: RowType[]): string[] {
    return GTFSFileIO.writeLines(this.fileInfo, records);
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

/** IO Operations for agency.txt file */
export class GTFSAgencyIO extends GTFSFeedFileIO<GTFSAgency> { public constructor() { super(GTFS_FILES.agency); } }

/** IO Operations for stops.txt file */
export class GTFSStopIO extends GTFSFeedFileIO<GTFSStop> { public constructor() { super(GTFS_FILES.stops); } }

/** IO Operations for routes.txt file */
export class GTFSRouteIO extends GTFSFeedFileIO<GTFSRoute> { public constructor() { super(GTFS_FILES.routes); } }

/** IO Operations for trips.txt file */
export class GTFSTripIO extends GTFSFeedFileIO<GTFSTrip> { public constructor() { super(GTFS_FILES.trips); } }

/** IO Operations for stop_times.txt file */
export class GTFSStopTimeIO extends GTFSFeedFileIO<GTFSStopTime> { public constructor() { super(GTFS_FILES.stop_times); } }

/** IO Operations for calendar.txt file */
export class GTFSCalendarIO extends GTFSFeedFileIO<GTFSCalendar> { public constructor() { super(GTFS_FILES.calendar); } }

/** IO Operations for calendar_dates.txt file */
export class GTFSCalendarDateIO extends GTFSFeedFileIO<GTFSCalendarDate> { public constructor() { super(GTFS_FILES.calendar_dates); } }

/** IO Operations for fare_attributes.txt file */
export class GTFSFareAttributeIO extends GTFSFeedFileIO<GTFSFareAttribute> { public constructor() { super(GTFS_FILES.fare_attributes); } }

/** IO Operations for fare_rules.txt file */
export class GTFSFareRuleIO extends GTFSFeedFileIO<GTFSFareRule> { public constructor() { super(GTFS_FILES.fare_rules); } }

/** IO Operations for timeframes.txt file */
export class GTFSTimeframeIO extends GTFSFeedFileIO<GTFSTimeframe> { public constructor() { super(GTFS_FILES.timeframes); } }

/** IO Operations for fare_media.txt file */
export class GTFSFareMediaIO extends GTFSFeedFileIO<GTFSFareMedia> { public constructor() { super(GTFS_FILES.fare_media); } }

/** IO Operations for fare_products.txt file */
export class GTFSFareProductIO extends GTFSFeedFileIO<GTFSFareProduct> { public constructor() { super(GTFS_FILES.fare_products); } }

/** IO Operations for fare_leg_rules.txt file */
export class GTFSFareLegRuleIO extends GTFSFeedFileIO<GTFSFareLegRule> { public constructor() { super(GTFS_FILES.fare_leg_rules); } }

/** IO Operations for fare_transfer_rules.txt file */
export class GTFSFareTransferRuleIO extends GTFSFeedFileIO<GTFSFareTransferRule> { public constructor() { super(GTFS_FILES.fare_transfer_rules); } }

/** IO Operations for areas.txt file */
export class GTFSAreaIO extends GTFSFeedFileIO<GTFSArea> { public constructor() { super(GTFS_FILES.areas); } }

/** IO Operations for stop_areas.txt file */
export class GTFSStopAreaIO extends GTFSFeedFileIO<GTFSStopArea> { public constructor() { super(GTFS_FILES.stop_areas); } }

/** IO Operations for networks.txt file */
export class GTFSNetworkIO extends GTFSFeedFileIO<GTFSNetwork> { public constructor() { super(GTFS_FILES.networks); } }

/** IO Operations for route_networks.txt file */
export class GTFSRouteNetworkIO extends GTFSFeedFileIO<GTFSRouteNetwork> { public constructor() { super(GTFS_FILES.route_networks); } }

/** IO Operations for shapes.txt file */
export class GTFSShapeIO extends GTFSFeedFileIO<GTFSShape> { public constructor() { super(GTFS_FILES.shapes); } }

/** IO Operations for frequencies.txt file */
export class GTFSFrequencyIO extends GTFSFeedFileIO<GTFSFrequency> { public constructor() { super(GTFS_FILES.frequencies); } }

/** IO Operations for transfers.txt file */
export class GTFSTransferIO extends GTFSFeedFileIO<GTFSTransfer> { public constructor() { super(GTFS_FILES.transfers); } }

/** IO Operations for pathways.txt file */
export class GTFSPathwayIO extends GTFSFeedFileIO<GTFSPathway> { public constructor() { super(GTFS_FILES.pathways); } }

/** IO Operations for levels.txt file */
export class GTFSLevelIO extends GTFSFeedFileIO<GTFSLevel> { public constructor() { super(GTFS_FILES.levels); } }

/** IO Operations for translations.txt file */
export class GTFSTranslationIO extends GTFSFeedFileIO<GTFSTranslation> { public constructor() { super(GTFS_FILES.translations); } }

/** IO Operations for feed_info.txt file */
export class GTFSFeedInfoIO extends GTFSFeedFileIO<GTFSFeedInfo> { public constructor() { super(GTFS_FILES.feed_info); } }

/** IO Operations for attributions.txt file */
export class GTFSAttributionIO extends GTFSFeedFileIO<GTFSAttribution> { public constructor() { super(GTFS_FILES.attributions); } }

/**
 * Get feed file IO instance from file name.
 * @param fileName File name with .txt
 * @returns GTFSFeedFileIO
 */
export const getIOFromFileName = (fileName: string): GTFSFeedFileIO => {
  switch(fileName) {
    case 'agency.txt': return new GTFSAgencyIO();
    case 'stops.txt': return new GTFSStopIO();
    case 'routes.txt': return new GTFSRouteIO();
    case 'trips.txt': return new GTFSTripIO();
    case 'stop_times.txt': return new GTFSStopTimeIO();
    case 'calendar.txt': return new GTFSCalendarIO();
    case 'calendar_dates.txt': return new GTFSCalendarDateIO();
    case 'fare_attributes.txt': return new GTFSFareAttributeIO();
    case 'fare_rules.txt': return new GTFSFareRuleIO();
    case 'timeframes.txt': return new GTFSTimeframeIO();
    case 'fare_media.txt': return new GTFSFareMediaIO();
    case 'fare_products.txt': return new GTFSFareProductIO();
    case 'fare_leg_rules.txt': return new GTFSFareLegRuleIO();
    case 'fare_transfer_rules.txt': return new GTFSFareTransferRuleIO();
    case 'areas.txt': return new GTFSAreaIO();
    case 'stop_areas.txt': return new GTFSStopAreaIO();
    case 'networks.txt': return new GTFSNetworkIO();
    case 'route_networks.txt': return new GTFSRouteNetworkIO();
    case 'shapes.txt': return new GTFSShapeIO();
    case 'frequencies.txt': return new GTFSFrequencyIO();
    case 'transfers.txt': return new GTFSTransferIO();
    case 'pathways.txt': return new GTFSPathwayIO();
    case 'levels.txt': return new GTFSLevelIO();
    case 'translations.txt': return new GTFSTranslationIO();
    case 'feed_info.txt': return new GTFSFeedInfoIO();
    case 'attributions.txt': return new GTFSAttributionIO();
  }
  throw new Error(`Unknown file name ${fileName}`);
}
