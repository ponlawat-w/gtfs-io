/** Indicates that the rider can board/alight the transit vehicle at any point along
 * the vehicle’s travel path, on every trip of the route. */
export enum GTFSContinuousPickupDropOff {
  /** No continuous stopping pickup / drop off. */
  Default = '',
  /** Continuous stopping pickup / drop off. */
  Continuous = 0,
  /** No continuous stopping pickup / drop off. */
  NoContinuous = 1,
  /** Must phone agency to arrange continuous stopping pickup / drop off. */
  Phone = 2,
  /** Must coordinate with driver to arrange continuous stopping pickup / drop off. */
  Driver = 3
};

/** Indicates wheelchair accessibility. */
export enum GTFSWheelchairAccessbility {
  /** No accessibility information. */
  Default = '',
  /** No accessibility information. */
  NoInformation = 0,
  /** Accessible. */
  Accessible = 1,
  /** No accessible. */
  Inaccessible = 2
};
