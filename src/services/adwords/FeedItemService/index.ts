import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IFeedItem } from './FeedItem';

class FeedItemService extends BaseService<IFeedItem, 'FeedItemService'> {
  constructor(options: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'FeedItemId',
      operationType: 'FeedItemOperation',
      selectorFields: [
        'AttributeValues',
        'EndTime',
        'FeedId',
        'FeedItemId',
        'GeoTargetingRestriction',
        'PolicySummaries',
        'StartTime',
        'Status',
        'UrlCustomParameters',
      ],
    };
    super(options, serviceInfo);
  }
}

export { FeedItemService };
export * from './FeedItem';
