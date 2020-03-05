export interface IPage<T> {
  entries: T[];
  totalNumEntries: number;
  'Page.Type'?: string;
}
