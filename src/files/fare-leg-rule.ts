/** Fare rule for individual legs of travel. */
export type GTFSFareLegRule = {
  /** Identifies a group of entries in `fare_leg_rules.txt` */
  leg_group_id?: string,
  /** Identifies a route network that applies for the fare leg rule. */
  network_id?: string,
  /** Identifies a departure area. */
  from_area_id?: string,
  /** Identifies an arrival area. */
  to_area_id?: string,
  /** Defines the timeframe for the fare validation event at the start of the fare leg. */
  from_timeframe_group_id?: string,
  /** Defines the timeframe for the fare validation event at the end of the fare leg. */
  to_timeframe_group_id?: string,
  /** The fare product required to travel the leg. */
  fare_product_id: string
};
