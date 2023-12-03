/** GTFS file information */
export type GTFSFileInfo = {
  /** File name including .txt */
  name: string,
  /**
   * Columns in file name, key being column name and value being type:
   * string: interpret value as string (using .toString()),
   * int: interpret value as integer (using parseInt()),
   * float: interpret value as float (using parseFloat()),
   * ioe: interpret value as integer or empty string (for enumeration)
   */
  columns: Record<string, 'string'|'int'|'float'|'ioe'>
};

/**
 * GTFS file name
 */
export type GTFSFileName = 'agency'
  | 'stops'
  | 'routes'
  | 'trips'
  | 'stop_times'
  | 'calendar'
  | 'calendar_dates'
  | 'fare_attributes'
  | 'fare_rules'
  | 'timeframes'
  | 'fare_media'
  | 'fare_products'
  | 'fare_leg_rules'
  | 'fare_transfer_rules'
  | 'areas'
  | 'stop_areas'
  | 'networks'
  | 'route_networks'
  | 'shapes'
  | 'frequencies'
  | 'transfers'
  | 'pathways'
  | 'levels'
  | 'translations'
  | 'feed_info'
  | 'attributions';

/**
 * GTFS files information
 */
export const GTFS_FILES: Record<GTFSFileName, GTFSFileInfo> = {
  agency: {
    name: 'agency.txt',
    columns: {
      agency_id: 'string',
      agency_name: 'string',
      agency_url: 'string',
      agency_timezone: 'string',
      agency_lang: 'string',
      agency_phone: 'string',
      agency_fare_url: 'string',
      agency_email: 'string'
    }
  },
  stops: {
    name: 'stops.txt',
    columns: {
      stop_id: 'string',
      stop_code: 'string',
      stop_name: 'string',
      tts_stop_name: 'string',
      stop_desc: 'string',
      stop_lat: 'float',
      stop_lon: 'float',
      zone_id: 'string',
      stop_url: 'string',
      location_type: 'int',
      parent_station: 'string',
      stop_timezone: 'string',
      wheelchair_boarding: 'ioe',
      level_id: 'string',
      platform_code: 'string'
    }
  },
  routes: {
    name: 'routes.txt',
    columns: {
      route_id: 'string',
      agency_id: 'string',
      route_short_name: 'string',
      route_long_name: 'string',
      route_desc: 'string',
      route_type: 'int',
      route_url: 'string',
      route_color: 'string',
      route_text_color: 'string',
      route_sort_order: 'int',
      continuous_pickup: 'ioe',
      continuous_drop_off: 'ioe',
      network_id: 'string'
    }
  },
  trips: {
    name: 'trips.txt',
    columns: {
      route_id: 'string',
      service_id: 'string',
      trip_id: 'string',
      trip_headsign: 'string',
      trip_short_name: 'string',
      direction_id: 'int',
      block_id: 'string',
      shape_id: 'string',
      wheelchair_accessible: 'ioe',
      bikes_allowed: 'ioe'
    }
  },
  stop_times: {
    name: 'stop_times.txt',
    columns: {
      trip_id: 'string',
      arrival_time: 'string',
      departure_time: 'string',
      stop_id: 'string',
      stop_sequence: 'int',
      stop_headsign: 'string',
      pickup_type: 'ioe',
      drop_off_type: 'ioe',
      continuous_pickup: 'ioe',
      continuous_drop_off: 'ioe',
      shape_dist_traveled: 'float',
      timepoint: 'ioe'
    }
  },
  calendar: {
    name: 'calendar.txt',
    columns: {
      service_id: 'string',
      monday: 'int',
      tuesday: 'int',
      wednesday: 'int',
      thursday: 'int',
      friday: 'int',
      saturday: 'int',
      sunday: 'int',
      start_date: 'string',
      end_date: 'string'
    }
  },
  calendar_dates: {
    name: 'calendar_dates.txt',
    columns: {
      service_id: 'string',
      date: 'string',
      exception_type: 'int'
    }
  },
  fare_attributes: {
    name: 'fare_attributes.txt',
    columns: {
      fare_id: 'string',
      price: 'float',
      currency_type: 'string',
      payment_method: 'int',
      transfers: 'ioe',
      agency_id: 'string',
      transfer_duration: 'float'
    }
  },
  fare_rules: {
    name: 'fare_rules.txt',
    columns: {
      fare_id: 'string',
      route_id: 'string',
      origin_id: 'string',
      destination_id: 'string',
      contains_id: 'string'
    }
  },
  timeframes: {
    name: 'timeframes.txt',
    columns: {
      timeframe_group_id: 'string',
      start_time: 'string',
      end_time: 'string',
      service_id: 'string'
    }
  },
  fare_media: {
    name: 'fare_media.txt',
    columns: {
      fare_media_id: 'string',
      fare_media_name: 'string',
      fare_media_type: 'int'
    }
  },
  fare_products: {
    name: 'fare_products.txt',
    columns: {
      fare_product_id: 'string',
      fare_product_name: 'string',
      fare_media_id: 'string',
      amount: 'float',
      currency: 'string'
    }
  },
  fare_leg_rules: {
    name: 'fare_leg_rules.txt',
    columns: {
      leg_group_id: 'string',
      network_id: 'string',
      from_area_id: 'string',
      to_area_id: 'string',
      from_timeframe_group_id: 'string',
      to_timeframe_group_id: 'string',
      fare_product_id: 'string'
    }
  },
  fare_transfer_rules: {
    name: 'fare_transfer_rules.txt',
    columns: {
      from_leg_group_id: 'string',
      to_leg_group_id: 'string',
      transfer_count: 'int',
      duration_limit: 'float',
      duration_limit_type: 'int',
      fare_transfer_type: 'int',
      fare_product_id: 'string'
    }
  },
  areas: {
    name: 'areas.txt',
    columns: {
      area_id: 'string',
      area_name: 'string'
    }
  },
  stop_areas: {
    name: 'stop_areas.txt',
    columns: {
      area_id: 'string',
      stop_id: 'string'
    }
  },
  networks: {
    name: 'networks.txt',
    columns: {
      network_id: 'string',
      network_name: 'string'
    }
  },
  route_networks: {
    name: 'route_networks.txt',
    columns: {
      network_id: 'string',
      route_id: 'string'
    }
  },
  shapes: {
    name: 'shapes.txt',
    columns: {
      shape_id: 'string',
      shape_pt_lat: 'float',
      shape_pt_lon: 'float',
      shape_pt_sequence: 'int',
      shape_dist_traveled: 'float'
    }
  },
  frequencies: {
    name: 'frequencies.txt',
    columns: {
      trip_id: 'string',
      start_time: 'string',
      end_time: 'string',
      headway_secs: 'float',
      exact_times: 'ioe'
    }
  },
  transfers: {
    name: 'transfers.txt',
    columns: {
      from_stop_id: 'string',
      to_stop_id: 'string',
      from_route_id: 'string',
      to_route_id: 'string',
      from_trip_id: 'string',
      to_trip_id: 'string',
      transfer_type: 'ioe',
      min_transfer_time: 'float'
    }
  },
  pathways: {
    name: 'pathways.txt',
    columns: {
      pathway_id: 'string',
      from_stop_id: 'string',
      to_stop_id: 'string',
      pathway_mode: 'int',
      is_bidirectional: 'int',
      length: 'float',
      traversal_time: 'float',
      stair_count: 'float',
      max_slope: 'float',
      min_width: 'float',
      signposted_as: 'string',
      reversed_signposted_as: 'string'
    }
  },
  levels: {
    name: 'levels.txt',
    columns: {
      level_id: 'string',
      level_index: 'float',
      level_name: 'string'
    }
  },
  translations: {
    name: 'translations.txt',
    columns: {
      table_name: 'string',
      field_name: 'string',
      language: 'string',
      translation: 'string',
      record_id: 'string',
      record_sub_id: 'string',
      field_value: 'string'
    }
  },
  feed_info: {
    name: 'feed_info.txt',
    columns: {
      feed_publisher_name: 'string',
      feed_publisher_url: 'string',
      feed_lang: 'string',
      default_lang: 'string',
      feed_start_date: 'string',
      feed_end_date: 'string',
      feed_version: 'string',
      feed_contact_email: 'string',
      feed_contact_url: 'string'
    }
  },
  attributions: {
    name: 'attributions.txt',
    columns: {
      attribution_id: 'string',
      agency_id: 'string',
      route_id: 'string',
      trip_id: 'string',
      organization_name: 'string',
      is_producer: 'int',
      is_operator: 'int',
      is_authority: 'int',
      attribution_url: 'string',
      attribution_email: 'string',
      attribution_phone: 'string',
    }
  }
};

/**
 * Get array of GTFS file infos
 * @returns Array of GTFS file infos
 */
export const getGTFSFileInfos = () => Object.keys(GTFS_FILES).map(name => (GTFS_FILES as any)[name] as GTFSFileInfo);
