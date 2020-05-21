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

  public async getSitelinkFeeds(): Promise<IFeed[]> {
    const feeds = await this.getAll();
    if (!feeds || !feeds.entries || feeds.entries.length === 0) {
      return [];
    }
    return feeds.entries.filter((x) => x.attributes.find((attr) => attr.name.indexOf('Sitelink') === 0));
  }
}

export { FeedService };
export * from './Feed';
