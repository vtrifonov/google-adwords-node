import { INegativeCampaignCriterion } from './CampaignCriterion';
import { IPage } from '../../../types/abstract';

export interface ICampaignCriterionPage extends IPage {
  entries: INegativeCampaignCriterion[];
  attibutes: {
    'xsi:type': 'CampaignCriterionPage';
  };
}
