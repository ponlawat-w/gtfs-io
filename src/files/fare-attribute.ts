/** Indicates when the fare must be paid. */
export enum GTFSFareAttributePaymentMethod {
  /** Fare is paid on board. */
  OnBoard = 0,
  /** Fare must be paid before boarding. */
  BeforeBoarding = 1
};

/** Indicates the number of transfers permitted on this fare */
export enum GTFSFareAttributeTransfer {
  /** No transfers permitted on this fare. */
  NoTranfers = 0,
  /** Riders may transfer once. */
  Once = 1,
  /** Riders may transfer twice. */
  Twice = 2,
  /** Unlimited transfers are permitted. */
  Unlimited = ''
};

/** Fare information for a transit agency's routes. */
export type GTFSFareAttribute = {
  /** Identifies a fare class. */
  fare_id: string,
  /** Fare price, in the unit specified by `currency_type`. */
  price: number,
  /** Currency used to pay the fare. */
  currency_type: string,
  /** Indicates when the fare must be paid. */
  payment_method: GTFSFareAttributePaymentMethod,
  /** Indicates the number of transfers permitted on this fare */
  transfers: GTFSFareAttributeTransfer,
  /** Identifies the relevant agency for a fare. */
  agency_id?: string,
  /** Length of time in seconds before a transfer expires. */
  transfer_duration?: number
};
