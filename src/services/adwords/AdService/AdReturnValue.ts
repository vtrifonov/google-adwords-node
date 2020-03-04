import { PartialAd } from './Ad';
import { IListReturnValue } from '../../../types/abstract';

export interface IAdReturnValue extends IListReturnValue {
  value: PartialAd[];
  // TODO
  partialFailureErrors?: any[];
}
