/** Indicates whether the service operates on every day of the week in the date range specified by the start_date and end_date fields. */
export enum GTFSCalendarAvailability {
  /** Service is available for every day of the week in the date range. */
  Available = 1,
  /** Service is not available for every day of the week in the date range. */
  Unavailable = 0
};

/** Service date specified using a weekly schedule with start and end dates. */
export type GTFSCalendar = {
  /** Identifies a set of dates when service is available for one or more routes. */
  service_id: string,
  /** Indicates whether the service operates on all Mondays in the date range specified by the start_date and end_date fields. */
  monday: 1|0,
  /** Indicates whether the service operates on all Tuesdays in the date range specified by the start_date and end_date fields. */
  tuesday: 1|0,
  /** Indicates whether the service operates on all Wednesdays in the date range specified by the start_date and end_date fields. */
  wednesday: 1|0,
  /** Indicates whether the service operates on all Thursdays in the date range specified by the start_date and end_date fields. */
  thursday: 1|0,
  /** Indicates whether the service operates on all Fridays in the date range specified by the start_date and end_date fields. */
  friday: 1|0,
  /** Indicates whether the service operates on all Saturdays in the date range specified by the start_date and end_date fields. */
  saturday: 1|0,
  /** Indicates whether the service operates on all Sundays in the date range specified by the start_date and end_date fields. */
  sunday: 1|0,
  /** Start service day for the service interval. */
  start_date: string,
  /** End service day for the service interval. This service day is included in the interval. */
  end_date: string
};
