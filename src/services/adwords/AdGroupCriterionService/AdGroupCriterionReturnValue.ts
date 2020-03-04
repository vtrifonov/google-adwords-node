import { INegativeAdGroupCriterion, IBiddableAdGroupCriterion } from './AdGroupCriterion';
import { IListReturnValue } from '../../../types/abstract';

export interface IAdGroupCriterionReturnValue extends IListReturnValue {
  value: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>;
  // TODO
  partialFailureErrors?: any[];
}
