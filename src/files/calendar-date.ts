/** Indicates whether service is available on the date specified in the date field. */
export enum GTFSCalendarDateException {
  /** Service has been added for the specified date. */
  Added = 1,
  /** Service has been removed for the specified date. */
  Removed = 2
};

/** Exception for the services defined in the [calendar.txt](#calendartxt). */
export type GTFSCalendarDate = {
  /** Identifies a set of dates when a service exception occurs for one or more routes. */
  service_id: string,
  /** Date when service exception occurs. */
  date: string,
  /** Indicates whether service is available on the date specified in the date field. */
  exception_type: GTFSCalendarDateException,
};
