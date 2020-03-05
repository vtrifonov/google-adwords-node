import { CampaignCriterion } from './enum/CampaignCriterion';
import { ILocation, IProximity } from '../../../types/adwords';

interface ICampaignCriterionRaw {
  campaignId: string;
  readonly isNegative: boolean;
  // TODO
  criterion: ILocation | IProximity;
  bidModifier: number;
  campaignCriterionStatus: CampaignCriterion.CampaignCriterionStatus;
  readonly baseCampaignId: string;
  // forwardCompatibilityMap: any;
  'CampaignCriterion.Type': string;
}

interface ICampaignCriterion extends Partial<ICampaignCriterionRaw> {}

interface INegativeCampaignCriterion extends ICampaignCriterion {
  attributes: {
    'xsi:type': 'NegativeCampaignCriterion';
  };
}

export { INegativeCampaignCriterion, ICampaignCriterion, ICampaignCriterionRaw };
