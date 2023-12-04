import { stringify } from 'csv/sync';
import type { GTFSIOWriteOptions } from './types';
import type { GTFSFileInfo } from '../file-info';
import type { GTFSFileRow } from '../types';

/**
 * Parameter for writeRecords()
 */
export type WriteParam<RowType extends GTFSFileRow = GTFSFileRow> = {
  /** GTFS file information, to be defined once. */
  file: GTFSFileInfo,
  /** Columns (table header), to be internally altered by writeRecords(). */
  columns: string[]|undefined,
  /** Records to be written. */
  records: RowType[],
  /** Output string */
  output: string
};

/**
 * Get the initial state of write records parameters.
 * @param file File information
 * @returns Object of writeRecords parameters in the initial state
 */
export function getInitialWriteChunkParams<RowType extends GTFSFileRow = GTFSFileRow>(file: GTFSFileInfo): WriteParam<RowType> {
  return {
    file,
    columns: undefined,
    records: [],
    output: ''    
  };
};

export function getRecordsHeader(params: WriteParam, options: GTFSIOWriteOptions): string {
  params.columns = Object.keys(params.file.columns);
  return stringify([params.columns], { record_delimiter: options.newline });
}

/**
 * Write records into contetn string.
 * @param params WriteParam
 */
export function writeRecords<RowType extends GTFSFileRow = GTFSFileRow>(params: WriteParam<RowType>, options: GTFSIOWriteOptions) {
  const rows: (string|number|undefined)[][] = params.records.map(
    record => params.columns!.map(column => (record as Record<string, string|number|undefined>)[column] ?? undefined)
  );
  params.output = stringify(rows, { record_delimiter: options.newline });
}
