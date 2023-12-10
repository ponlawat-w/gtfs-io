import type { GTFSWheelchairAccessbility } from './common.d.ts';

/** Indicates the direction of travel for a trip. */
export enum GTFSTripDirection {
  /** Travel in one direction (e.g. outbound travel). */
  OneDirection = 0,
  /** Travel in the opposite direction (e.g. inbound travel). */
  OppositeDirection = 1
};

/** Indicates whether bikes are allowed. */
export enum GTFSTripBikesAllowed {
  /** No bike information for the trip. */
  Empty = '',
  /** No bike information for the trip. */
  NoInformation = 0,
  /** Vehicle being used on this particular trip can accommodate at least one bicycle. */
  Allowed = 1,
  /** No bicycles are allowed on this trip. */
  NotAllowed = 2
};

/** Trip for each route. */
export type GTFSTrip = {
  /** Identifies a route. */
  route_id: string,
  /** Identifies a set of dates when service is available for one or more routes. */
  service_id: string,
  /** Identifies a trip. */
  trip_id: string,
  /** Text that appears on signage identifying the trip's destination to riders. */
  trip_headsign?: string,
  /** Public facing text used to identify the trip to riders, for instance, to identify train numbers for commuter rail trips. */
  trip_short_name?: string,
  /** Indicates the direction of travel for a trip. */
  direction_id?: GTFSTripDirection,
  /** Identifies the block to which the trip belongs. */
  block_id?: string,
  /** Identifies a geospatial shape describing the vehicle travel path for a trip. */
  shape_id?: string,
  /** Indicates wheelchair accessibility. */
  wheelchair_accessible?: GTFSWheelchairAccessbility,
  /** Indicates whether bikes are allowed. */
  bikes_allowed?: GTFSTripBikesAllowed,
};
