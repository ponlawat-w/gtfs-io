/** Defines the relative start and end of `fare_transfer_rules.duration_limit`. */
export enum GTFSFareTransferRuleDurationLimit {
  /** Between the departure fare validation of the current leg and the arrival fare validation of the next leg. */
  CurrentLegDepartureToNextLegArrival = 0,
  /** Between the departure fare validation of the current leg and the departure fare validation of the next leg. */
  CurrentLegDepartureToNextLegDeparture = 1,
  /** Between the arrival fare validation of the current leg and the departure fare validation of the next leg. */
  CurrentLegArrivalToNextLegDeparture = 2,
  /** Between the arrival fare validation of the current leg and the arrival fare validation of the next leg. */
  CurrentLegArrivalToNextLegArrival = 3
};

/** Indicates the cost processing method of transferring between legs in a journey. */
export enum GTFSFareTransferRuleType {
  /** From-leg `fare_leg_rules.fare_product_id` plus `fare_transfer_rules.fare_product_id`; A + AB. */
  A_AB = 0,
  /** From-leg `fare_leg_rules.fare_product_id` plus `fare_transfer_rules.fare_product_id` plus to-leg `fare_leg_rules.fare_product_id`; A + AB + B. */
  A_AB_B = 1,
  /** `fare_transfer_rules.fare_product_id`; AB. */
  AB = 2
};

type FareTransferRule = {
  /** Identifies a group of pre-transfer fare leg rules. */
  from_leg_group_id?: string,
  /** Identifies a group of post-transfer fare leg rules. */
  to_leg_group_id?: string,
  /** Defines how many consecutive transfers the transfer rule may be applied to. */
  transfer_count?: number,
  /** Indicates the cost processing method of transferring between legs in a journey. */
  fare_transfer_type: GTFSFareTransferRuleType,
  /** The fare product required to transfer between two fare legs. */
  fare_product_id?: string
};

type NoDurationLimit = {
  /** Defines the duration limit of the transfer. */
  duration_limit?: undefined|''
};

type DurationLimit = {
  /** Defines the duration limit of the transfer. */
  duration_limit: number,
  /** Defines the relative start and end of `fare_transfer_rules.duration_limit`. */
  duration_limit_type: GTFSFareTransferRuleDurationLimit,
};

/** Fare rule for transfers between legs of travel defined in `fare_leg_rules.txt` */
export type GTFSFareTransferRule = FareTransferRule & (NoDurationLimit | DurationLimit);
