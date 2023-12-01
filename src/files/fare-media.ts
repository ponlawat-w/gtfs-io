/** The type of fare media. */
export enum GTFSFareMediaType {
  /** None.
   * Used when there is no fare media involved in purchasing or validating a fare product,
   * such as paying cash to a driver or conductor with no physical ticket provided. */
  None = 0,
  /** Physical paper ticket that allows a passenger to take either a certain number of pre-purchased trips
   * or unlimited trips within a fixed period of time. */
  PhysicalPaper = 1,
  /** Physical transit card that has stored tickets, passes or monetary value. */
  PhysicalCard = 2,
  /** cEMV (contactless Europay, Mastercard and Visa) as an open-loop token container for account-based ticketing. */
  cEMV = 3,
  /** Mobile app that have stored virtual transit cards, tickets, passes, or monetary value. */
  MobileApp = 4
};

/** To describe the fare media that can be employed to use fare products. */
export type GTFSFareMedia = {
  /** Identifies a fare media. */
  fare_media_id: string,
  /** Name of the fare media. */
  fare_media_name?: string,
  /** The type of fare media. */
  fare_media_type: string
};
