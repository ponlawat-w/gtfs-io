/** Describes levels in a station. */
export type GTFSLevel = {
  /** Identifies a level in a station. */
  level_id: string,
  /** Numeric index of the level that indicates its relative position. */
  level_index: number,
  /** Name of the level as seen by the rider inside the building or station. */
  level_name?: string
};
