/** Rule to apply fares for itineraries. */
export type GTFSFareRule = {
  /** Identifies a fare class. */
  fare_id: string,
  /** Identifies a route associated with the fare class. */
  route_id?: string,
  /** Identifies an origin zone. */
  origin_id?: string,
  /** Identifies a destination zone. */
  destination_id?: string,
  /** Identifies the zones that a rider will enter while using a given fare class. */
  contains_id?: string
};
