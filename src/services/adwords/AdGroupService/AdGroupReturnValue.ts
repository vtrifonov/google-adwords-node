import { IAdGroup } from './AdGroup';
import { IListReturnValue } from '../../../types/abstract';

export interface IAdGroupReturnValue extends IListReturnValue {
  value: IAdGroup[];
  // TODO
  partialFailureErrors?: any[];
}
