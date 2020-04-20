import { ChangeStatus } from './enum/ChangeStatus';

export interface IAdGroupChangeData {
  adGroupId: string;
  adGroupChangeStatus: ChangeStatus;
  changedAds: string[];
  changedCriteria: string[];
  removedCriteria: string[];
  changedFeeds: string[];
  removedFeeds: string[];
  changedAdGroupBidModifierCriteria: string[];
  removedAdGroupBidModifierCriteria: string[];
}
