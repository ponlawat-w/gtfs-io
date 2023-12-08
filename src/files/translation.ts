import { GTFSTableName } from '../file-info';

type TranslationByRecordID = {
  /** Defines the record that corresponds to the field to be translated. */
  record_id: string,
  /** Helps the record that contains the field to be translated when the table doesn’t have a unique ID. */
  record_sub_id: string|number,
  /** Instead of defining which record should be translated by using `record_id` and `record_sub_id`, this field can be used to define the value which should be translated. */
  field_value?: undefined|''
};

type TranslationByFieldValue = {
  /** Defines the record that corresponds to the field to be translated. */
  record_id?: undefined|'',
  /** Helps the record that contains the field to be translated when the table doesn’t have a unique ID. */
  record_sub_id?: undefined|'',
  /** Instead of defining which record should be translated by using `record_id` and `record_sub_id`, this field can be used to define the value which should be translated. */
  field_value?: string
};

type TranslationOfFeedInfo = {
  /** Defines the table that contains the field to be translated. */
  table_name: 'feed_info',
  /** Defines the record that corresponds to the field to be translated. */
  record_id?: undefined,
  /** Helps the record that contains the field to be translated when the table doesn’t have a unique ID. */
  record_sub_id?: undefined,
  /** Instead of defining which record should be translated by using `record_id` and `record_sub_id`, this field can be used to define the value which should be translated. */
  field_value?: undefined
};

/** In regions that have multiple official languages, transit agencies/operators typically have language-specific names and web pages. In order to best serve riders in those regions, it is useful for the dataset to include these language-dependent values. */
export type GTFSTranslation = {
  /** Defines the table that contains the field to be translated. */
  table_name: GTFSTableName,
  /** Name of the field to be translated. */
  field_name: string,
  /** Language of translation. */
  language: string,
  /** Translated value. */
  translation: string
} & (TranslationByRecordID | TranslationByFieldValue | TranslationOfFeedInfo);
