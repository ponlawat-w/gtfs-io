import { GTFSContinuousPickupDropOff } from './common';

/** Indicates pickup / drop off method. */
export enum GTFSStopTimePickupDropOff {
  /** Regularly scheduled pickup / drop off */
  Default = '',
  /** Regularly scheduled pickup / drop off */
  Scheduled = 0,
  /** No pickup / drop off available */
  NotAvailable = 1,
  /** Must phone agency to arrange pickup / drop off */
  Phone = 2,
  /** Must coordinate with driver to arrange pickup / drop off */
  Driver = 3
};

/** Indicates if arrival and departure times for a stop are strictly adhered to by the vehicle or if they are instead approximate and/or interpolated times. */
export enum GTFSStopTimeTimepoint {
  /** Times are considered exact. */
  Default = '',
  /** Times are considered approximate. */
  Approximate = 0,
  /** Times are considered exact. */
  Exact = 1
};

/** Time that a vehicle arrives at and departs from stops for each trip. */
export type GTFSStopTime = {
  /** Identifies a trip. */
  trip_id: string,
  /** Arrival time at the stop (defined by `stop_times.stop_id`) for a specific trip (defined by `stop_times.trip_id`) in the time zone specified by `agency.agency_timezone`, not `stops.stop_timezone`. */
  arrival_time: string,
  /** Departure time from the stop (defined by `stop_times.stop_id`) for a specific trip (defined by `stop_times.trip_id`) in the time zone specified by `agency.agency_timezone`, not `stops.stop_timezone`. */
  departure_time: string,
  /** Identifies the serviced stop. */
  stop_id: string,
  /** Order of stops for a particular trip. */
  stop_sequence: number,
  /** Text that appears on signage identifying the trip's destination to riders. */
  stop_headsign?: string,
  /** Indicates pickup method. */
  pickup_type?: GTFSStopTimePickupDropOff,
  /** Indicates drop off method. */
  drop_off_type?: GTFSStopTimePickupDropOff,
  /** Indicates that the rider can board the transit vehicle at any point along the vehicle’s travel path as described by `shapes.txt`, from this `stop_time` to the next `stop_time` in the trip’s `stop_sequence`. */
  continuous_pickup?: GTFSContinuousPickupDropOff,
  /** Indicates that the rider can alight from the transit vehicle at any point along the vehicle’s travel path as described by `shapes.txt`, from this `stop_time` to the next `stop_time` in the trip’s `stop_sequence`. */
  continuous_drop_off?: GTFSContinuousPickupDropOff,
  /** Actual distance traveled along the associated shape, from the first stop to the stop specified in this record. */
  shape_dist_traveled?: number,
  /** Indicates if arrival and departure times for a stop are strictly adhered to by the vehicle or if they are instead approximate and/or interpolated times. */
  timepoint?: GTFSStopTimeTimepoint
};
