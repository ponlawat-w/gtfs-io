/** Defines the attributions applied to the dataset. */
export type GTFSAttribution = {
  /** Identifies an attribution for the dataset or a subset of it. */
  attribution_id?: string,
  /** Agency to which the attribution applies. */
  agency_id?: string,
  /** Route to which the attribution applies. */
  route_id?: string,
  /** Trip to which the attribution applies. */
  trip_id?: string,
  /** Name of the organization that the dataset is attributed to. */
  organization_name: string,
  /** The role of the organization is producer. */
  is_producer?: 0|1,
  /** The role of the organization is operator. */
  is_operator?: 0|1,
  /** The role of the organization is authority. */
  is_authority?: 0|1,
  /** URL of the organization. */
  attribution_url?: string,
  /** Email of the organization. */
  attribution_email?: string,
  /** Phone number of the organization. */
  attribution_phone?: string
};
