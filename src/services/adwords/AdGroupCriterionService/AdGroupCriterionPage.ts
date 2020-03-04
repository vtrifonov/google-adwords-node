import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';
import { IPage } from '../../../types/abstract';

export interface IAdGroupCriterionPage extends IPage {
  entries: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>;
}
