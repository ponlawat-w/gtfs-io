/** The file contains information about the dataset itself, rather than the services that the dataset describes. In some cases, the publisher of the dataset is a different entity than any of the agencies. */
export type GTFSFeedInfo = {
  /** Full name of the organization that publishes the dataset. */
  feed_publisher_name: string,
  /** URL of the dataset publishing organization's website. */
  feed_publisher_url: string,
  /** Default language used for the text in this dataset. */
  feed_lang: string,
  /** Defines the language that should be used when the data consumer doesn’t know the language of the rider. */
  default_lang?: string,
  /** The dataset provides complete and reliable schedule information for service in the period from the beginning of the `feed_start_date` day to the end of the `feed_end_date` day. */
  feed_start_date?: string,
  /** The dataset provides complete and reliable schedule information for service in the period from the beginning of the `feed_start_date` day to the end of the `feed_end_date` day. */
  feed_end_date?: string,
  /** String that indicates the current version of their GTFS dataset. */
  feed_version?: string,
  /** Email address for communication regarding the GTFS dataset and data publishing practices. */
  feed_contact_email?: string,
  /** URL for contact information, a web-form, support desk, or other tools for communication regarding the GTFS dataset and data publishing practices. */
  feed_contact_url?: string
};
