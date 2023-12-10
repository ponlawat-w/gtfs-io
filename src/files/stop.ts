import type { GTFSWheelchairAccessbility } from './common.d.ts';

/** Location Type */
export enum GTFSStopLocationType {
  /** A location where passengers board or disembark from a transit vehicle. */
  Stop = 0,
  /** A physical structure or area that contains one or more platform. */
  Station = 1,
  /** A location where passengers can enter or exit a station from the street. */
  EntranceExit = 2,
  /** A location within a station, not matching any other location_type, that may be used to link together pathways define in pathways.txt. */
  GenericNode = 3,
  /** A specific location on a platform, where passengers can board and/or alight vehicles. */
  BoardingArea = 4
};

type StopBase<T extends GTFSStopLocationType> = {
  /** Identifies a location: stop/platform, station, entrance/exit, generic node or boarding area. */
  stop_id: string,
  /** Short text or a number that identifies the location for riders. */
  stop_code?: string,
  /** Readable version of the stop_name. */
  tts_stop_name?: string,
  /** Description of the location that provides useful, quality information. */
  stop_desc?: string,
  /** Identifies the fare zone for a stop. */
  zone_id?: string,
  /** URL of a web page about the location. */
  stop_url?: string,
  /** Location type. */
  location_type: T,
  /** Timezone of the location. */
  stop_timezone?: string,
  /** Indicates whether wheelchair boardings are possible from the location. */
  wheelchair_boarding?: GTFSWheelchairAccessbility,
  /** Level of the location. */
  level_id?: string,
  /** Platform identifier for a platform stop (a stop belonging to a station). */
  platform_code?: string,
  /** Foreign ID referencing `stops.stop_id` */
  parent_station?: string
};

type StopWithInformation = {
  /** Name of the location. */
  stop_name: string,
  /** Latitude of the location. */
  stop_lat: number,
  /** Longitude of the location. */
  stop_lon: number
};

/** A location where passengers board or disembark from a transit vehicle. */
export type GTFSLocationStop = StopBase<GTFSStopLocationType.Stop> & StopWithInformation;
/** A physical structure or area that contains one or more platform. */
export type GTFSLocationStation = StopBase<GTFSStopLocationType.Station> & StopWithInformation;
/** A location where passengers can enter or exit a station from the street. */
export type GTFSLocationEntranceExit = StopBase<GTFSStopLocationType.EntranceExit> & StopWithInformation;
/** A location within a station, not matching any other location_type, that may be used to link together pathways define in pathways.txt. */
export type GTFSLocationGenericNode = StopBase<GTFSStopLocationType.GenericNode> & Partial<StopWithInformation>;
/** A specific location on a platform, where passengers can board and/or alight vehicles. */
export type GTFSLocationBoardingArea = StopBase<GTFSStopLocationType.BoardingArea> & Partial<StopWithInformation>;

/** Stop where vehicles pick up or drop off riders.
 * Also defines stations and station entrances. */
export type GTFSStop =
  | GTFSLocationStop
  | GTFSLocationStation
  | GTFSLocationEntranceExit
  | GTFSLocationGenericNode
  | GTFSLocationBoardingArea;
