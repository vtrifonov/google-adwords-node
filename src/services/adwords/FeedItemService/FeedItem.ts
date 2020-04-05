import { FeedItem } from '../../../types/enum';
import { IFeedItemPolicySummary } from '../../../types/adwords/AdServices/PolicySummary';
import { ICustomParameters } from '../../../types/adwords';
import { IFeedItemGeoRestriction } from '../ExtensionSettingService/FeedItemGeoRestriction';

interface IFeedItem {
  readonly feedId: number;
  feedItemId: number;
  readonly status: FeedItem.Status;
  readonly startTime: string;
  readonly endTime: string;
  attributeValues: any[];
  readonly policySummaries: IFeedItemPolicySummary[];
  geoTargetingRestriction: IFeedItemGeoRestriction;
  urlCustomParameters: ICustomParameters;
}

export { IFeedItem };
