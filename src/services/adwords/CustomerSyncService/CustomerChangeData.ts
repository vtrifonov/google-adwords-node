import { ICampaignChangeData } from './CampaignChangeData';
import { IFeedChangeData } from './FeedChangeData';

export interface IChangedIds {
  changedAds: string[];
  changedFeedItems: string[];
  changedCriterias: string[];
}

export interface ICustomerChangeData {
  changedCampaigns: ICampaignChangeData[];
  changedFeeds: IFeedChangeData[];
  lastChangeTimestamp: string;
  changedIds: IChangedIds;
}
