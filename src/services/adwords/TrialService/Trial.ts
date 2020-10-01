import { CampaignTrialTrafficSplitType } from './enum/CampaignTrialTrafficSplitType';
import { TrialStatus } from './enum/TrialStatus';

interface ITrial {
  id: string;
  baseCampaignId: number;
  draftId: number;
  budgetId: number;
  name: string;
  startDate: string;
  endDate: string;
  trafficSplitPercent: number;
  trafficSplitType: CampaignTrialTrafficSplitType;
  status: TrialStatus;
  trialCampaignId: number;
}

export { ITrial };
