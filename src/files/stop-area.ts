/** Assigns a stop from `stops.txt` to an area. */
export type GTFSStopArea = {
  /** Identifies an area to which one or multiple `stop_id`s belong. */
  area_id: string,
  /** Identifies a stop. */
  stop_id: string
};
