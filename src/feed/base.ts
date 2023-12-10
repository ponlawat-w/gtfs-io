import { GTFS_FILES } from '../file-info.js';
import type { GTFSTableName } from '../file-info.d.ts';
import type { GTFSAgency } from '../files/agency.d.ts';
import type { GTFSArea } from '../files/area.d.ts';
import type { GTFSAttribution } from '../files/attribution.d.ts';
import type { GTFSCalendar } from '../files/calendar.d.ts';
import type { GTFSCalendarDate } from '../files/calendar-date.d.ts';
import type { GTFSFareAttribute } from '../files/fare-attribute.d.ts';
import type { GTFSFareLegRule } from '../files/fare-leg-rule.d.ts';
import type { GTFSFareMedia } from '../files/fare-media.d.ts';
import type { GTFSFareProduct } from '../files/fare-product.d.ts';
import type { GTFSFareRule } from '../files/fare-rule.d.ts';
import type { GTFSFareTransferRule } from '../files/fare-transfer-rule.d.ts';
import type { GTFSFeedInfo } from '../files/feed-info.d.ts';
import type { GTFSFrequency } from '../files/frequency.d.ts';
import type { GTFSLevel } from '../files/level.d.ts';
import type { GTFSNetwork } from '../files/network.d.ts';
import type { GTFSPathway } from '../files/pathway.d.ts';
import type { GTFSRoute } from '../files/route.d.ts';
import type { GTFSRouteNetwork } from '../files/route-network.d.ts';
import type { GTFSShape } from '../files/shape.d.ts';
import type { GTFSStop } from '../files/stop.d.ts';
import type { GTFSStopArea } from '../files/stop-area.d.ts';
import type { GTFSStopTime } from '../files/stop-time.d.ts';
import type { GTFSTimeframe } from '../files/timeframe.d.ts';
import type { GTFSTransfer } from '../files/transfer.d.ts';
import type { GTFSTranslation } from '../files/translation.d.ts';
import type { GTFSTrip } from '../files/trip.d.ts';
import type { GTFSAsyncFileRecords, GTFSFileRecords, GTFSFileRow, GTFSIterableFeedFiles } from '../types.d.ts';

/** Records Generic Type: R to be collection type, and T to be row type */
type RT<R, T extends GTFSFileRow = GTFSFileRow> =
  R extends GTFSFileRow[] ? T[] :
  R extends GTFSFileRecords ? GTFSFileRecords<T> :
  R extends GTFSAsyncFileRecords ? GTFSAsyncFileRecords<T> : Iterable<T>;

/**
 * Base Feed class
 */
export abstract class GTFSFeedBase<RecordsType> {
  /** Transit agencies with service represented in this dataset. */
  public agency: RT<RecordsType, GTFSAgency>;
  /** Stops where vehicles pick up or drop off riders. */
  public stops: RT<RecordsType, GTFSStop>;
  /** Transit routes. A route is a group of trips that are displayed to riders as a single service. */
  public routes: RT<RecordsType, GTFSRoute>;
  /** Trips for each route. */
  public trips: RT<RecordsType, GTFSTrip>;
  /** Times that a vehicle arrives at and departs from stops for each trip. */
  public stop_times: RT<RecordsType, GTFSStopTime>;
  /** Service dates specified using a weekly schedule with start and end dates. */
  public calendar?: RT<RecordsType, GTFSCalendar>;
  /** Exceptions for the services defined in the `calendar.txt`. */
  public calendar_dates?: RT<RecordsType, GTFSCalendarDate>;
  /** Fare information for a transit agency's routes. */
  public fare_attributes?: RT<RecordsType, GTFSFareAttribute>;
  /** Rules to apply fares for itineraries. */
  public fare_rules?: RT<RecordsType, GTFSFareRule>;
  /** Date and time periods to use in fare rules for fares that depend on date and time factors. */
  public timeframes?: RT<RecordsType, GTFSTimeframe>;
  /** To describe the fare media that can be employed to use fare products. */
  public fare_media?: RT<RecordsType, GTFSFareMedia>;
  /** To describe the different types of tickets or fares that can be purchased by riders. */
  public fare_products?: RT<RecordsType, GTFSFareProduct>;
  /** Fare rules for individual legs of travel. */
  public fare_leg_rules?: RT<RecordsType, GTFSFareLegRule>;
  /** Fare rules for transfers between legs of travel. */
  public fare_transfer_rules?: RT<RecordsType, GTFSFareTransferRule>;
  /** Area grouping of locations. */
  public areas?: RT<RecordsType, GTFSArea>;
  /** Rules to assign stops to areas. */
  public stop_areas?: RT<RecordsType, GTFSStopArea>;
  /** Network grouping of routes. */
  public networks?: RT<RecordsType, GTFSNetwork>;
  /** Rules to assign routes to networks. */
  public route_networks?: RT<RecordsType, GTFSRouteNetwork>;
  /** Rules for mapping vehicle travel paths, sometimes referred to as route alignments. */
  public shapes?: RT<RecordsType, GTFSShape>;
  /** Headway (time between trips) for headway-based service or a compressed representation of fixed-schedule service. */
  public frequencies?: RT<RecordsType, GTFSFrequency>;
  /** Rules for making connections at transfer points between routes. */
  public transfers?: RT<RecordsType, GTFSTransfer>;
  /** Pathways linking together locations within stations. */
  public pathways?: RT<RecordsType, GTFSPathway>;
  /** Levels within stations. */
  public levels?: RT<RecordsType, GTFSLevel>;
  /** Translations of customer-facing dataset values. */
  public translations?: RT<RecordsType, GTFSTranslation>;
  /** Dataset metadata, including publisher, version, and expiration information. */
  public feed_info?: RT<RecordsType, GTFSFeedInfo>;
  /** Dataset attributions. */
  public attributions?: RT<RecordsType, GTFSAttribution>;

  /**
   * Constructor
   * @param initialValues Initial values
   * @param emptyValue Default empty values of RecordsType for required table but not defined in initialValues
   */
  protected constructor(initialValues: Partial<Record<GTFSTableName, RT<RecordsType>>>, emptyValue: () => RecordsType) {
    Object.assign(this, initialValues);
    this.agency = initialValues.agency as RT<RecordsType, GTFSAgency> ?? emptyValue;
    this.stops = initialValues.stops as RT<RecordsType, GTFSStop> ?? emptyValue;
    this.routes = initialValues.routes as RT<RecordsType, GTFSRoute> ?? emptyValue;
    this.trips = initialValues.trips as RT<RecordsType, GTFSTrip> ?? emptyValue;
    this.stop_times = initialValues.stop_times as RT<RecordsType, GTFSStopTime> ?? emptyValue;
  }

  /**
   * Set table records.
   * @param name Table name
   * @param records Value
   */
  public setTable(name: GTFSTableName, records: RT<RecordsType>) {
    Object.assign(this, { [name]: records });
  }

  /**
   * Get table records.
   * @param name Table name
   * @returns RecordsType
   */
  public getTable(name: GTFSTableName): RecordsType|undefined {
    return this[name]! as RecordsType;
  }

  /**
   * Get iterator for all existing tables.
   */
  public *getAllTables(): GTFSIterableFeedFiles<RT<RecordsType>> {
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
