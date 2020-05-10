import { IAdGroupChangeData } from './AdGroupChangeData';
import { ChangeStatus } from '../../../types/enum';

export interface ICampaignChangeData {
  campaignId: number;
  campaignChangeStatus: ChangeStatus;
  changedAdGroups: IAdGroupChangeData[];
  addedCampaignCriteria: string[];
  changedCampaignCriteria: string[];
  removedCampaignCriteria: string[];
  changedFeeds: string[];
  removedFeeds: string[];
}
