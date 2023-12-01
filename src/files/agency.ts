/** Transit agency with service represented in this dataset. */
export type GTFSAgency = {
  /** Identifies a transit brand which is often synonymous with a transit agency. */
  agency_id: string,
  /** Full name of the transit agency. */
  agency_name?: string,
  /** URL of the transit agency. */
  agency_url: string,
  /** Timezone where the transit agency is located. */
  agency_timezone: string,
  /** Primary language used by this transit agency. */
  agency_lang?: string,
  /** A voice telephone number for the specified agency. */
  agency_phone?: string,
  /** URL of a web page that allows a rider to purchase tickets or other fare instruments for that agency online. */
  agency_fare_url?: string,
  /** Email address actively monitored by the agency’s customer service department. */
  agency_email?: string
};
