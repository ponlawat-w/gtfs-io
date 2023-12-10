import type { GTFSAgency } from './files/agency.d.ts';
import type { GTFSArea } from './files/area.d.ts';
import type { GTFSAttribution } from './files/attribution.d.ts';
import type { GTFSCalendar } from './files/calendar.d.ts';
import type { GTFSCalendarDate } from './files/calendar-date.d.ts';
import type { GTFSFareAttribute } from './files/fare-attribute.d.ts';
import type { GTFSFareLegRule } from './files/fare-leg-rule.d.ts';
import type { GTFSFareMedia } from './files/fare-media.d.ts';
import type { GTFSFareProduct } from './files/fare-product.d.ts';
import type { GTFSFareRule } from './files/fare-rule.d.ts';
import type { GTFSFareTransferRule } from './files/fare-transfer-rule.d.ts';
import type { GTFSFeedInfo } from './files/feed-info.d.ts';
import type { GTFSFrequency } from './files/frequency.d.ts';
import type { GTFSLevel } from './files/level.d.ts';
import type { GTFSNetwork } from './files/network.d.ts';
import type { GTFSPathway } from './files/pathway.d.ts';
import type { GTFSRoute } from './files/route.d.ts';
import type { GTFSRouteNetwork } from './files/route-network.d.ts';
import type { GTFSShape } from './files/shape.d.ts';
import type { GTFSStop } from './files/stop.d.ts';
import type { GTFSStopArea } from './files/stop-area.d.ts';
import type { GTFSStopTime } from './files/stop-time.d.ts';
import type { GTFSTimeframe } from './files/timeframe.d.ts';
import type { GTFSTransfer } from './files/transfer.d.ts';
import type { GTFSTranslation } from './files/translation.d.ts';
import type { GTFSTrip } from './files/trip.d.ts';
import type { GTFSFileInfo, GTFSTableName } from './file-info.d.ts';

/** A row record in a GTFS file */
export type GTFSFileRow = GTFSAgency
  | GTFSStop
  | GTFSRoute
  | GTFSTrip
  | GTFSStopTime
  | GTFSCalendar
  | GTFSCalendarDate
  | GTFSFareAttribute
  | GTFSFareRule
  | GTFSTimeframe
  | GTFSFareMedia
  | GTFSFareProduct
  | GTFSFareLegRule
  | GTFSFareTransferRule
  | GTFSArea
  | GTFSStopArea
  | GTFSNetwork
  | GTFSRouteNetwork
  | GTFSShape
  | GTFSFrequency
  | GTFSTransfer
  | GTFSPathway
  | GTFSLevel
  | GTFSTranslation
  | GTFSFeedInfo
  | GTFSAttribution;

/** GTFS file records */
export type GTFSFileRecords<RowType extends GTFSFileRow = GTFSFileRow> = IterableIterator<RowType>;

/** GTFS async file records or loaded array */
export type GTFSAsyncFileRecords<RowType extends GTFSFileRow = GTFSFileRow> = AsyncIterableIterator<RowType>;

/** GTFS iterable for an individual file */
export type GTFSIterableFeedFile<RecordsType> = {
  /** File name without .txt */
  name: GTFSTableName,
  /** File information */
  info: GTFSFileInfo,
  /** Records */
  records: RecordsType
};

/** GTFS Iterable feed files */
export type GTFSIterableFeedFiles<RecordsType> = IterableIterator<GTFSIterableFeedFile<RecordsType>>;

/** GTFS feed file content */
export type GTFSFileContent = {
  /** File name with .txt */
  name: string,
  /** File content */
  content: string|Buffer
};
