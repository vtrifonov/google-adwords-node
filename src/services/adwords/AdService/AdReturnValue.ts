import { IListReturnValue } from '../../../types/abstract';
import { PartialAd } from '../../../types/adwords';

export interface IAdReturnValue extends IListReturnValue {
  value: PartialAd[];
  // TODO
  partialFailureErrors?: any[];
}
