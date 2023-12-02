/** GTFS file information */
export type GTFSFileInfo = {
  /** File name including .txt */
  name: string,
  /** Columns in file name, key being column name and value being type */
  columns: Record<string, 'string'|'number'>
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
      stop_lat: 'number',
      stop_lon: 'number',
      zone_id: 'string',
      stop_url: 'string',
      location_type: 'number',
      parent_station: 'string',
      stop_timezone: 'string',
      wheelchair_boarding: 'string',
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
      route_type: 'number',
      route_url: 'string',
      route_color: 'string',
      route_text_color: 'string',
      route_sort_order: 'number',
      continuous_pickup: 'number',
      continuous_drop_off: 'number',
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
      direction_id: 'number',
      block_id: 'string',
      shape_id: 'string',
      wheelchair_accessible: 'number',
      bikes_allowed: 'number'
    }
  },
  stop_times: {
    name: 'stop_times.txt',
    columns: {
      trip_id: 'string',
      arrival_time: 'string',
      departure_time: 'string',
      stop_id: 'string',
      stop_sequence: 'number',
      stop_headsign: 'string',
      pickup_type: 'number',
      drop_off_type: 'number',
      continuous_pickup: 'number',
      continuous_drop_off: 'number',
      shape_dist_traveled: 'number',
      timepoint: 'number'
    }
  },
  calendar: {
    name: 'calendar.txt',
    columns: {
      service_id: 'string',
      monday: 'number',
      tuesday: 'number',
      wednesday: 'number',
      thursday: 'number',
      friday: 'number',
      saturday: 'number',
      sunday: 'number',
      start_date: 'string',
      end_date: 'string'
    }
  },
  calendar_dates: {
    name: 'calendar_dates.txt',
    columns: {
      service_id: 'string',
      date: 'string',
      exception_type: 'number'
    }
  },
  fare_attributes: {
    name: 'fare_attributes.txt',
    columns: {
      fare_id: 'string',
      price: 'number',
      currency_type: 'string',
      payment_method: 'number',
      transfers: 'number',
      agency_id: 'string',
      transfer_duration: 'number'
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
      fare_media_type: 'number'
    }
  },
  fare_products: {
    name: 'fare_products.txt',
    columns: {
      fare_product_id: 'string',
      fare_product_name: 'string',
      fare_media_id: 'string',
      amount: 'number',
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
      transfer_count: 'number',
      duration_limit: 'number',
      duration_limit_type: 'number',
      fare_transfer_type: 'number',
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
      shape_pt_lat: 'number',
      shape_pt_lon: 'number',
      shape_pt_sequence: 'number',
      shape_dist_traveled: 'number'
    }
  },
  frequencies: {
    name: 'frequencies.txt',
    columns: {
      trip_id: 'string',
      start_time: 'string',
      end_time: 'string',
      headway_secs: 'number',
      exact_times: 'number'
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
      transfer_type: 'number',
      min_transfer_time: 'number'
    }
  },
  pathways: {
    name: 'pathways.txt',
    columns: {
      pathway_id: 'string',
      from_stop_id: 'string',
      to_stop_id: 'string',
      pathway_mode: 'number',
      is_bidirectional: 'number',
      length: 'number',
      traversal_time: 'number',
      stair_count: 'number',
      max_slope: 'number',
      min_width: 'number',
      signposted_as: 'string',
      reversed_signposted_as: 'string'
    }
  },
  levels: {
    name: 'levels.txt',
    columns: {
      level_id: 'string',
      level_index: 'number',
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
      is_producer: 'number',
      is_operator: 'number',
      is_authority: 'number',
      attribution_url: 'string',
      attribution_email: 'string',
      attribution_phone: 'string',
    }
  }
};
