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
export type GTFSFileRecords<RowType extends GTFSFileRow = GTFSFileRow> = IterableIterator<RowType>|RowType[];

/** GTFS Dataset feed */
export type GTFSFeed = {
  /** Transit agencies with service represented in this dataset. */
  agency: GTFSFileRecords<GTFSAgency>,
  /** Stops where vehicles pick up or drop off riders. */
  stops: GTFSFileRecords<GTFSStop>,
  /** Transit routes. A route is a group of trips that are displayed to riders as a single service. */
  routes: GTFSFileRecords<GTFSRoute>,
  /** Trips for each route. */
  trips: GTFSFileRecords<GTFSTrip>,
  /** Times that a vehicle arrives at and departs from stops for each trip. */
  stop_times: GTFSFileRecords<GTFSStopTime>,
  /** Service dates specified using a weekly schedule with start and end dates. */
  calendar?: GTFSFileRecords<GTFSCalendar>,
  /** Exceptions for the services defined in the `calendar.txt`. */
  calendar_dates?: GTFSFileRecords<GTFSCalendarDate>,
  /** Fare information for a transit agency's routes. */
  fare_attributes?: GTFSFileRecords<GTFSFareAttribute>,
  /** Rules to apply fares for itineraries. */
  fare_rules?: GTFSFileRecords<GTFSFareRule>,
  /** Date and time periods to use in fare rules for fares that depend on date and time factors. */
  timeframes?: GTFSFileRecords<GTFSTimeframe>,
  /** To describe the fare media that can be employed to use fare products. */
  fare_media?: GTFSFileRecords<GTFSFareMedia>,
  /** To describe the different types of tickets or fares that can be purchased by riders. */
  fare_products?: GTFSFileRecords<GTFSFareProduct>,
  /** Fare rules for individual legs of travel. */
  fare_leg_rules?: GTFSFileRecords<GTFSFareLegRule>,
  /** Fare rules for transfers between legs of travel. */
  fare_transfer_rules?: GTFSFileRecords<GTFSFareTransferRule>,
  /** Area grouping of locations. */
  areas?: GTFSFileRecords<GTFSArea>,
  /** Rules to assign stops to areas. */
  stop_areas?: GTFSFileRecords<GTFSStopArea>,
  /** Network grouping of routes. */
  networks?: GTFSFileRecords<GTFSNetwork>,
  /** Rules to assign routes to networks. */
  route_networks?: GTFSFileRecords<GTFSRouteNetwork>,
  /** Rules for mapping vehicle travel paths, sometimes referred to as route alignments. */
  shapes?: GTFSFileRecords<GTFSShape>,
  /** Headway (time between trips) for headway-based service or a compressed representation of fixed-schedule service. */
  frequencies?: GTFSFileRecords<GTFSFrequency>,
  /** Rules for making connections at transfer points between routes. */
  transfers?: GTFSFileRecords<GTFSTransfer>,
  /** Pathways linking together locations within stations. */
  pathways?: GTFSFileRecords<GTFSPathway>,
  /** Levels within stations. */
  levels?: GTFSFileRecords<GTFSLevel>,
  /** Translations of customer-facing dataset values. */
  translations?: GTFSFileRecords<GTFSTranslation>,
  /** Dataset metadata, including publisher, version, and expiration information. */
  feed_infos?: GTFSFileRecords<GTFSFeedInfo>,
  /** Dataset attributions. */
  attributions?: GTFSFileRecords<GTFSAttribution>
};
