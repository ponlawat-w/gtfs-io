/** Options for GTFSFileIO.write */
export type GTFSIOWriteOptions = {
  /** New line delimiter */
  newline?: string,
  /** Number of records to be collected for each yielded result. */
  recordsBufferSize?: number
};
