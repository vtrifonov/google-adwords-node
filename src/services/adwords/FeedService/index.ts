import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IFeed } from './Feed';

class FeedService extends BaseService<IFeed, 'FeedService'> {
  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'FeedOperation',
      selectorFields: ['Attributes', 'FeedStatus', 'Id', 'Name', 'Origin', 'SystemFeedGenerationData'],
    };
    super(operationServiceOptions, serviceInfo);
  }
}

export { FeedService };
export * from './Feed';
