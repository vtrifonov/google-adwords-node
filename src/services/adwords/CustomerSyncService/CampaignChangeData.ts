import { ChangeStatus } from './enum/ChangeStatus';
import { IAdGroupChangeData } from './AdGroupChangeData';

export interface ICampaignChangeData {
  campaignId: number;
  campaignChangeStatus: ChangeStatus;
  changedAdGroups: IAdGroupChangeData[];
  addedCampaignCriteria: string[];
  removedCampaignCriteria: string[];
  changedFeeds: string[];
  removedFeeds: string[];
}
