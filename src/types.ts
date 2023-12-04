import type { GTFSAgency } from './files/agency';
import type { GTFSArea } from './files/area';
import type { GTFSAttribution } from './files/attribution';
import type { GTFSCalendar } from './files/calendar';
import type { GTFSCalendarDate } from './files/calendar-date';
import type { GTFSFareAttribute } from './files/fare-attribute';
import type { GTFSFareLegRule } from './files/fare-leg-rule';
import type { GTFSFareMedia } from './files/fare-media';
import type { GTFSFareProduct } from './files/fare-product';
import type { GTFSFareRule } from './files/fare-rule';
import type { GTFSFareTransferRule } from './files/fare-transfer-rule';
import type { GTFSFeedInfo } from './files/feed-info';
import type { GTFSFrequency } from './files/frequency';
import type { GTFSLevel } from './files/level';
import type { GTFSNetwork } from './files/network';
import type { GTFSPathway } from './files/pathway';
import type { GTFSRoute } from './files/route';
import type { GTFSRouteNetwork } from './files/route-network';
import type { GTFSShape } from './files/shape';
import type { GTFSStop } from './files/stop';
import type { GTFSStopArea } from './files/stop-area';
import type { GTFSStopTime } from './files/stop-time';
import type { GTFSTimeframe } from './files/timeframe';
import type { GTFSTransfer } from './files/transfer';
import type { GTFSTranslation } from './files/translation';
import type { GTFSTrip } from './files/trip';
import type { GTFSFileInfo, GTFSTableName } from './file-info';

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
