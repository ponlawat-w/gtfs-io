import type { GTFSContinuousPickupDropOff } from './common.d.ts';

/** Indicates the type of transportation used on a route. */
export enum GTFSRouteType {
  /** Tram, Streetcar, Light rail. Any light rail or street level system within a metropolitan area. */
  LightRail = 0,
  /** Subway, Metro. Any underground rail system within a metropolitan area. */
  Underground = 1,
  /** Rail. Used for intercity or long-distance travel. */
  Rail = 2,
  /** Bus. Used for short- and long-distance bus routes. */
  Bus = 3,
  /** Ferry. Used for short- and long-distance boat service. */
  Ferry = 4,
  /** Cable tram. Used for street-level rail cars where the cable runs beneath the vehicle (e.g., cable car in San Francisco). */
  CableTram = 5,
  /** Aerial lift, suspended cable car (e.g., gondola lift, aerial tramway).
   * Cable transport where cabins, cars, gondolas or open chairs are suspended by means of one or more cables. */
  AerialLift = 6,
  /** Funicular. Any rail system designed for steep inclines. */
  Funicular = 7,
  /** Trolleybus. Electric buses that draw power from overhead wires using poles. */
  Trolleybus = 11,
  /** Monorail. Railway in which the track consists of a single rail or a beam. */
  Monorail = 12
};


/** Transit routes. A route is a group of trips that are displayed to riders as a single service. */
export type GTFSRoute = {
  /** Identifies a route. */
  route_id: string,
  /** Agency for the specified route. */
  agency_id?: string,
  /** Description of a route that provides useful, quality information. */
  route_desc?: string,
  /** Indicates the type of transportation used on a route. */
  route_type: GTFSRouteType,
  /** URL of a web page about the particular route. */
  route_url?: string,
  /** Route color designation that matches public facing material. */
  route_color?: string,
  /** Legible color to use for text drawn against a background of `route_color`. */
  route_text_color?: string,
  /** Orders the routes in a way which is ideal for presentation to customers. */
  route_sort_order?: number,
  /** Indicates that the rider can board the transit vehicle at any point along
   * the vehicle’s travel path as described by `shapes.txt`, on every trip of the route. */
  continuous_pickup?: GTFSContinuousPickupDropOff,
  /** Indicates that the rider can alight from the transit vehicle at any point along
   * the vehicle’s travel path as described by `shapes.txt`, on every trip of the route. */
  continuous_drop_off?: GTFSContinuousPickupDropOff,
  /** Identifies a group of routes. */
  network_id?: string
} & (
  {
    /** Short name of a route. */
    route_short_name?: string,
    /** Full name of a route. */
    route_long_name: string,
  } | {
    /** Short name of a route. */
    route_short_name: string,
    /** Full name of a route. */
    route_long_name?: string,
  }
);
