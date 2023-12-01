/** Indicates the type of service for a trip. */
export enum GTFSFrequncyExactTimes {
  /** Frequency-based trips. */
  Default = '',
  /** Frequency-based trips. */
  FrequencyBased = 0,
  /** Schedule-based trips with the exact same headway throughout the day. */
  ScheduleBased = 1
};

/** Represents trips that operate on regular headways (time between trips). */
export type GTFSFrequency = {
  /** Identifies a trip to which the specified headway of service applies. */
  trip_id: string,
  /** Time at which the first vehicle departs from the first stop of the trip with the specified headway. */
  start_time: string,
  /** Time at which service changes to a different headway (or ceases) at the first stop in the trip. */
  end_time: string,
  /** Time, in seconds, between departures from the same stop (headway) for the trip, during the time interval specified by `start_time` and `end_time`. */
  headway_secs: number,
  /** Indicates the type of service for a trip. */
  exact_times?: GTFSFrequncyExactTimes
};
