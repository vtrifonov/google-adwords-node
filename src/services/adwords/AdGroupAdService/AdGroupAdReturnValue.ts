import { IAdGroupAd } from './AdGroupAd';
import { IListReturnValue } from '../../../types/abstract';

export interface IAdGroupAdReturnValue extends IListReturnValue {
  value: IAdGroupAd[];
  // TODO
  partialFailureErrors?: any[];
}
