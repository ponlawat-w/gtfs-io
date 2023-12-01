/** Shapes describe the path that a vehicle travels along a route alignment,
 * and are defined in the file shapes.txt. */
export type GTFSShape = {
  /** Identifies a shape. */
  shape_id: string,
  /** Latitude of a shape point. */
  shape_pt_lat: number,
  /** Longitude of a shape point. */
  shape_pt_lon: number,
  /** Sequence in which the shape points connect to form the shape. */
  shape_pt_sequence: number,
  /** Actual distance traveled along the shape from the first shape point to the point specified in this record. */
  shape_dist_traveled?: number
};
