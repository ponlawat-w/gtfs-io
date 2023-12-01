/** Indicates the type of connection for the specified (`from_stop_id`, `to_stop_id`) pair. */
export enum GTFSTranferType {
  /** Recommended transfer point between routes. */
  Default = '',
  /** Recommended transfer point between routes. */
  Recommended = 0,
  /** Timed transfer point between two routes.
   * The departing vehicle is expected to wait for the arriving one and leave sufficient time for a rider to transfer between routes. */
  Timed = 1,
  /** Transfer requires a minimum amount of time between arrival and departure to ensure a connection.
   * The time required to transfer is specified by `min_transfer_time`. */
  MinTime = 2,
  /** Transfers are not possible between routes at the location. */
  Impossible = 3,
  /** Passengers can transfer from one trip to another by staying onboard the same vehicle (an "in-seat transfer"). */
  InSeat = 4,
  /** In-seat transfers are not allowed between sequential trips. */
  ProhibitedInSeat = 5
};

type Transfer = {
  /** Identifies a stop or station where a connection between routes begins. */
  from_stop_id?: string,
  /** Identifies a stop or station where a connection between routes ends. */
  to_stop_id?: string,
  /** Identifies a route where a connection begins. */
  from_route_id?: string,
  /** Identifies a route where a connection ends. */
  to_route_id?: string,
  /** Amount of time, in seconds, that must be available to permit a transfer between routes at the specified stops. */
  min_transfer_time?: number,
};

type DefaultTripTransfer = {
  /** Identifies a trip where a connection between routes begins. */
  from_trip_id?: string,
  /** Identifies a trip where a connection between routes ends. */
  to_trip_id?: string,
  /** Indicates the type of connection for the specified (`from_stop_id`, `to_stop_id`) pair. */
  transfer_type: GTFSTranferType.Default
    | GTFSTranferType.Recommended
    | GTFSTranferType.Timed
    | GTFSTranferType.MinTime
    | GTFSTranferType.Impossible
};

type SameStationTransfer = {
  /** Identifies a trip where a connection between routes begins. */
  from_trip_id: string,
  /** Identifies a trip where a connection between routes ends. */
  to_trip_id: string,
  /** Indicates the type of connection for the specified (`from_stop_id`, `to_stop_id`) pair. */
  transfer_type: GTFSTranferType.InSeat | GTFSTranferType.ProhibitedInSeat
};

/** When calculating an itinerary, GTFS-consuming applications interpolate transfers based on allowable time and stop proximity. */
export type GTFSTransfer = Transfer & (DefaultTripTransfer | SameStationTransfer);
