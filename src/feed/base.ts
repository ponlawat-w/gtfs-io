import { GTFSTableName, GTFS_FILES } from '../file-info';
import type { GTFSAgency } from '../files/agency';
import type { GTFSArea } from '../files/area';
import type { GTFSAttribution } from '../files/attribution';
import type { GTFSCalendar } from '../files/calendar';
import type { GTFSCalendarDate } from '../files/calendar-date';
import type { GTFSFareAttribute } from '../files/fare-attribute';
import type { GTFSFareLegRule } from '../files/fare-leg-rule';
import type { GTFSFareMedia } from '../files/fare-media';
import type { GTFSFareProduct } from '../files/fare-product';
import type { GTFSFareRule } from '../files/fare-rule';
import type { GTFSFareTransferRule } from '../files/fare-transfer-rule';
import type { GTFSFeedInfo } from '../files/feed-info';
import type { GTFSFrequency } from '../files/frequency';
import type { GTFSLevel } from '../files/level';
import type { GTFSNetwork } from '../files/network';
import type { GTFSPathway } from '../files/pathway';
import type { GTFSRoute } from '../files/route';
import type { GTFSRouteNetwork } from '../files/route-network';
import type { GTFSShape } from '../files/shape';
import type { GTFSStop } from '../files/stop';
import type { GTFSStopArea } from '../files/stop-area';
import type { GTFSStopTime } from '../files/stop-time';
import type { GTFSTimeframe } from '../files/timeframe';
import type { GTFSTransfer } from '../files/transfer';
import type { GTFSTranslation } from '../files/translation';
import type { GTFSTrip } from '../files/trip';
import type { GTFSAsyncFileRecords, GTFSFileRecords, GTFSFileRow, GTFSIterableFeedFiles } from '../types';

type RecordsGenericType<R, T extends GTFSFileRow = GTFSFileRow> =
  R extends GTFSFileRow[] ? T[] :
  R extends GTFSFileRecords ? GTFSFileRecords<T> :
  R extends GTFSAsyncFileRecords ? GTFSAsyncFileRecords<T> : Iterable<T>;

export class GTFSFeedBase<RecordsType> {
  /** Transit agencies with service represented in this dataset. */
  public agency: RecordsGenericType<RecordsType, GTFSAgency>;
  /** Stops where vehicles pick up or drop off riders. */
  public stops: RecordsGenericType<RecordsType, GTFSStop>;
  /** Transit routes. A route is a group of trips that are displayed to riders as a single service. */
  public routes: RecordsGenericType<RecordsType, GTFSRoute>;
  /** Trips for each route. */
  public trips: RecordsGenericType<RecordsType, GTFSTrip>;
  /** Times that a vehicle arrives at and departs from stops for each trip. */
  public stop_times: RecordsGenericType<RecordsType, GTFSStopTime>;
  /** Service dates specified using a weekly schedule with start and end dates. */
  public calendar?: RecordsGenericType<RecordsType, GTFSCalendar>;
  /** Exceptions for the services defined in the `calendar.txt`. */
  public calendar_dates?: RecordsGenericType<RecordsType, GTFSCalendarDate>;
  /** Fare information for a transit agency's routes. */
  public fare_attributes?: RecordsGenericType<RecordsType, GTFSFareAttribute>;
  /** Rules to apply fares for itineraries. */
  public fare_rules?: RecordsGenericType<RecordsType, GTFSFareRule>;
  /** Date and time periods to use in fare rules for fares that depend on date and time factors. */
  public timeframes?: RecordsGenericType<RecordsType, GTFSTimeframe>;
  /** To describe the fare media that can be employed to use fare products. */
  public fare_media?: RecordsGenericType<RecordsType, GTFSFareMedia>;
  /** To describe the different types of tickets or fares that can be purchased by riders. */
  public fare_products?: RecordsGenericType<RecordsType, GTFSFareProduct>;
  /** Fare rules for individual legs of travel. */
  public fare_leg_rules?: RecordsGenericType<RecordsType, GTFSFareLegRule>;
  /** Fare rules for transfers between legs of travel. */
  public fare_transfer_rules?: RecordsGenericType<RecordsType, GTFSFareTransferRule>;
  /** Area grouping of locations. */
  public areas?: RecordsGenericType<RecordsType, GTFSArea>;
  /** Rules to assign stops to areas. */
  public stop_areas?: RecordsGenericType<RecordsType, GTFSStopArea>;
  /** Network grouping of routes. */
  public networks?: RecordsGenericType<RecordsType, GTFSNetwork>;
  /** Rules to assign routes to networks. */
  public route_networks?: RecordsGenericType<RecordsType, GTFSRouteNetwork>;
  /** Rules for mapping vehicle travel paths, sometimes referred to as route alignments. */
  public shapes?: RecordsGenericType<RecordsType, GTFSShape>;
  /** Headway (time between trips) for headway-based service or a compressed representation of fixed-schedule service. */
  public frequencies?: RecordsGenericType<RecordsType, GTFSFrequency>;
  /** Rules for making connections at transfer points between routes. */
  public transfers?: RecordsGenericType<RecordsType, GTFSTransfer>;
  /** Pathways linking together locations within stations. */
  public pathways?: RecordsGenericType<RecordsType, GTFSPathway>;
  /** Levels within stations. */
  public levels?: RecordsGenericType<RecordsType, GTFSLevel>;
  /** Translations of customer-facing dataset values. */
  public translations?: RecordsGenericType<RecordsType, GTFSTranslation>;
  /** Dataset metadata, including publisher, version, and expiration information. */
  public feed_info?: RecordsGenericType<RecordsType, GTFSFeedInfo>;
  /** Dataset attributions. */
  public attributions?: RecordsGenericType<RecordsType, GTFSAttribution>;

  protected constructor(defaultValues: Partial<Record<GTFSTableName, RecordsGenericType<RecordsType>>>, emptyValue: RecordsType) {
    Object.assign(this, defaultValues);
    this.agency = defaultValues.agency as RecordsGenericType<RecordsType, GTFSAgency> ?? emptyValue;
    this.stops = defaultValues.stops as RecordsGenericType<RecordsType, GTFSStop> ?? emptyValue;
    this.routes = defaultValues.routes as RecordsGenericType<RecordsType, GTFSRoute> ?? emptyValue;
    this.trips = defaultValues.trips as RecordsGenericType<RecordsType, GTFSTrip> ?? emptyValue;
    this.stop_times = defaultValues.stop_times as RecordsGenericType<RecordsType, GTFSStopTime> ?? emptyValue;
  }

  public setTable(name: GTFSTableName, value: RecordsGenericType<RecordsType>) {
    Object.assign(this, { [name]: value });
  }

  public getTable(name: GTFSTableName): RecordsGenericType<RecordsType>|undefined {
    return this[name]! as RecordsGenericType<RecordsType>;
  }

  public *getAllTables(): GTFSIterableFeedFiles<RecordsGenericType<RecordsType>> {
    if (this.agency !== undefined) yield { name: 'agency', info: GTFS_FILES.agency, records: this.agency };
    if (this.stops !== undefined) yield { name: 'stops', info: GTFS_FILES.stops, records: this.stops };
    if (this.routes !== undefined) yield { name: 'routes', info: GTFS_FILES.routes, records: this.routes };
    if (this.trips !== undefined) yield { name: 'trips', info: GTFS_FILES.trips, records: this.trips };
    if (this.stop_times !== undefined) yield { name: 'stop_times', info: GTFS_FILES.stop_times, records: this.stop_times };
    if (this.calendar !== undefined) yield { name: 'calendar', info: GTFS_FILES.calendar, records: this.calendar };
    if (this.calendar_dates !== undefined) yield { name: 'calendar_dates', info: GTFS_FILES.calendar_dates, records: this.calendar_dates };
    if (this.fare_attributes !== undefined) yield { name: 'fare_attributes', info: GTFS_FILES.fare_attributes, records: this.fare_attributes };
    if (this.fare_rules !== undefined) yield { name: 'fare_rules', info: GTFS_FILES.fare_rules, records: this.fare_rules };
    if (this.timeframes !== undefined) yield { name: 'timeframes', info: GTFS_FILES.timeframes, records: this.timeframes };
    if (this.fare_media !== undefined) yield { name: 'fare_media', info: GTFS_FILES.fare_media, records: this.fare_media };
    if (this.fare_products !== undefined) yield { name: 'fare_products', info: GTFS_FILES.fare_products, records: this.fare_products };
    if (this.fare_leg_rules !== undefined) yield { name: 'fare_leg_rules', info: GTFS_FILES.fare_leg_rules, records: this.fare_leg_rules };
    if (this.fare_transfer_rules !== undefined) yield { name: 'fare_transfer_rules', info: GTFS_FILES.fare_transfer_rules, records: this.fare_transfer_rules };
    if (this.areas !== undefined) yield { name: 'areas', info: GTFS_FILES.areas, records: this.areas };
    if (this.stop_areas !== undefined) yield { name: 'stop_areas', info: GTFS_FILES.stop_areas, records: this.stop_areas };
    if (this.networks !== undefined) yield { name: 'networks', info: GTFS_FILES.networks, records: this.networks };
    if (this.route_networks !== undefined) yield { name: 'route_networks', info: GTFS_FILES.route_networks, records: this.route_networks };
    if (this.shapes !== undefined) yield { name: 'shapes', info: GTFS_FILES.shapes, records: this.shapes };
    if (this.frequencies !== undefined) yield { name: 'frequencies', info: GTFS_FILES.frequencies, records: this.frequencies };
    if (this.transfers !== undefined) yield { name: 'transfers', info: GTFS_FILES.transfers, records: this.transfers };
    if (this.pathways !== undefined) yield { name: 'pathways', info: GTFS_FILES.pathways, records: this.pathways };
    if (this.levels !== undefined) yield { name: 'levels', info: GTFS_FILES.levels, records: this.levels };
    if (this.translations !== undefined) yield { name: 'translations', info: GTFS_FILES.translations, records: this.translations };
    if (this.feed_info !== undefined) yield { name: 'feed_info', info: GTFS_FILES.feed_info, records: this.feed_info };
    if (this.attributions !== undefined) yield { name: 'attributions', info: GTFS_FILES.attributions, records: this.attributions };
  }
};
