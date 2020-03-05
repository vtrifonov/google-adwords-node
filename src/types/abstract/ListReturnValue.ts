export interface IListReturnValue<T> {
  value: T[];
  partialFailureErrors?: any[];
  'ListReturnValue.Type'?: string;
}
