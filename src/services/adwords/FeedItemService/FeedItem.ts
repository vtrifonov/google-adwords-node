import { FeedItem } from '../../../types/enum';
import { IFeedItemPolicySummary } from '../../../types/adwords/AdServices/PolicySummary';
import { ICustomParameters } from '../../../types/adwords';
import { IFeedItemGeoRestriction } from '../ExtensionSettingService/FeedItemGeoRestriction';
import { IFeedItemAttributeValue } from './FeedItemAttributeValue';

interface IFeedItem {
  readonly feedId: string;
  feedItemId: string;
  readonly status: FeedItem.Status;
  readonly startTime: string;
  readonly endTime: string;
  attributeValues?: IFeedItemAttributeValue[];
  readonly policySummaries: IFeedItemPolicySummary[];
  geoTargetingRestriction: IFeedItemGeoRestriction;
  urlCustomParameters?: ICustomParameters;
}

export { IFeedItem, IFeedItemAttributeValue, IFeedItemPolicySummary, IFeedItemGeoRestriction };
