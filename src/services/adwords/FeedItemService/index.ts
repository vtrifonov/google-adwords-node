import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IFeedItem } from './FeedItem';

class FeedItemService extends BaseService<IFeedItem, 'FeedItemService'> {
  constructor(operationServiceOptions: IOperationServiceOptions) {
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
    super(operationServiceOptions, serviceInfo);
  }
}

export { FeedItemService };
export * from './FeedItem';
