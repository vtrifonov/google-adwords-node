import { IListReturnValue } from './abstract/ListReturnValue';
import { PartialAd } from './Ad';

export interface IAdReturnValue extends IListReturnValue {
  value: PartialAd[];
  // TODO
  partialFailureErrors?: any[];
}
