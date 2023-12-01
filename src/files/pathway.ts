/** Type of pathway between the specified (`from_stop_id`, `to_stop_id`) pair. */
export enum GTFSPathwayMode {
  /** Walkway. */
  Walkway = 1,
  /** Stairs. */
  Stairs = 2,
  /** Moving sidewalk/travelator.. */
  Travelator = 3,
  /** Escalator. */
  Escalator = 4,
  /** Elevator. */
  Elevator = 5,
  /** Fare gate (or payment gate). */
  FareGate = 6,
  /** Exit gate. */
  ExitGate = 7
};

/** Indicates the direction that the pathway can be taken. */
export enum GTFSPathwayDirection {
  /** Unidirectional pathway that can only be used from `from_stop_id` to `to_stop_id`. */
  Unidirectional = 0,
  /** Bidirectional pathway that can be used in both directions. */
  Bidirectional = 1
};

/** `pathways.txt` and `levels.txt` use a graph representation to describe subway or train stations, with nodes representing locations and edges representing pathways. */
export type GTFSPathway = {
  /** Identifies a pathway. */
  pathway_id: string,
  /** Location at which the pathway begins. */
  from_stop_id: string,
  /** Location at which the pathway ends. */
  to_stop_id: string,
  /** Type of pathway between the specified (`from_stop_id`, `to_stop_id`) pair. */
  pathway_mode: GTFSPathwayMode,
  /** Indicates the direction that the pathway can be taken. */
  is_bidirectional: GTFSPathwayDirection,
  /** Horizontal length in meters of the pathway from the origin location (defined in `from_stop_id`) to the destination location (defined in `to_stop_id`). */
  length?: number,
  /** Average time in seconds needed to walk through the pathway from the origin location (defined in `from_stop_id`) to the destination location (defined in `to_stop_id`). */
  traversal_time?: number,
  /** Number of stairs of the pathway. */
  stair_count?: number,
  /** Maximum slope ratio of the pathway. */
  max_slope?: number,
  /** Minimum width of the pathway in meters. */
  min_width?: number,
  /** Public facing text from physical signage that is visible to riders. */
  signposted_as?: string,
  /** Same as `signposted_as`, but when the pathway is used from the `to_stop_id` to the `from_stop_id`. */
  reversed_signposted_as?: string
};
