import { INegativeCampaignCriterion } from './CampaignCriterion';
import { IListReturnValue } from '../../../types/abstract';

export interface ICampaignCriterionReturnValue extends IListReturnValue {
  value: INegativeCampaignCriterion[];
  partialFailureErrors?: any[];
  attibutes: {
    'xsi:type': 'CampaignCriterionReturnValue';
  };
}
