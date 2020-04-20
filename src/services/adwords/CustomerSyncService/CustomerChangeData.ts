import { ICampaignChangeData } from './CampaignChangeData';
import { IFeedChangeData } from './FeedChangeData';

export interface ICustomerChangeData {
  changedCampaigns: ICampaignChangeData[];
  changedFeeds: IFeedChangeData[];
  lastChangeTimestamp: string;
}
