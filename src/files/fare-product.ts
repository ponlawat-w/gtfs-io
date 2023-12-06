/** To describe the different types of tickets or fares that can be purchased by riders. */
export type GTFSFareProduct = {
  /** Identifies a fare product. */
  fare_product_id: string,
  /** The name of the fare product as displayed to riders. */
  fare_product_name?: string,
  /** Identifies a fare media that can be employed to use the fare product during the trip. */
  fare_media_id?: string,
  /** The cost of the fare product. */
  amount: number,
  /** The currency of the cost of the fare product. */
  currency: string
};
