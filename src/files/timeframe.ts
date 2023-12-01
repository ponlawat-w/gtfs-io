type Period = {
  /** Defines the beginning of a timeframe. The interval includes the start time. */
  start_time: string,
  /** Defines the end of a timeframe. The interval does not include the end time. */
  end_time: string
};

type NeverPeriod = {
  /** Defines the beginning of a timeframe. The interval includes the start time. */
  start_time?: undefined|'',
  /** Defines the end of a timeframe. The interval does not include the end time. */
  end_time?: undefined|''
};

type Timeframe = {
  /** Identifies a timeframe or set of timeframes. */
  timeframe_group_id: string,
  /** Identifies a set of dates that a timeframe is in effect. */
  service_id: string,
};

/** Date and time period to use in fare rules for fares that depend on date and time factors. */
export type GTFSTimeframe = Timeframe & (Period | NeverPeriod);
