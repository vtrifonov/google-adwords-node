import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IFeedMapping } from './FeedMapping';

class FeedMappingService extends BaseService<IFeedMapping, 'FeedMappingService'> {
  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'FeedMappingId',
      operationType: 'FeedMappingOperation',
      selectorFields: [
        'AttributeFieldMappings',
        'CriterionType',
        'FeedId',
        'FeedMappingId',
        'PlaceholderType',
        'Status',
      ],
    };
    super(operationServiceOptions, serviceInfo);
  }
}

export { FeedMappingService };
export * from './FeedMapping';
