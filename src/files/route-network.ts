/** Assigns a route from `routes.txt` to a network. */
export type GTFSRouteNetwork = {
  /** Identifies a network to which one or multiple `route_id`s belong. */
  network_id: string,
  /** Identifies a route. */
  route_id: string
};
