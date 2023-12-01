/** Defines network identifier that applies for fare leg rules. */
export type GTFSNetwork = {
  /** Identifies a network. */
  network_id: string,
  /** The name of the network that apply for fare leg rules, as used by the local agency and its riders. */
  network_name?: string
};
