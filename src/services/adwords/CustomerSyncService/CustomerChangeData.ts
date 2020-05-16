import { ICampaignChangeData } from './CampaignChangeData';
import { IFeedChangeData } from './FeedChangeData';
import { IDateTimeRange } from './DateTimeRange';

export interface IChangedIds {
  changedAds: string[];
  changedFeedItems: string[];
  changedCriterias: string[];
}

export interface ICustomerChangeData {
  dateTimeRange: IDateTimeRange;
  changedCampaigns: ICampaignChangeData[];
  changedFeeds: IFeedChangeData[];
  lastChangeTimestamp?: string;
  changedIds: IChangedIds;
}
