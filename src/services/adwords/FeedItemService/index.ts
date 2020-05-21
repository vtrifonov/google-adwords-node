import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IFeedItem, IFeedItemAttributeValue } from './FeedItem';
import { ISitelinkFeedItem } from '../ExtensionSettingService';
import { Predicate } from '../../../types/enum';
import { IPredicate } from '../../../types/adwords';
import { IFeed } from '../FeedService';

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

  public async getSitelinks(): Promise<ISitelinkFeedItem[]> {
    return this.getSitelinksFromFeedItems();
  }

  public async GetFeedItemsIds(feedIds: string[]): Promise<string[]> {
    const predicates: IPredicate[] = [
      {
        field: 'FeedId',
        operator: Predicate.Operator.IN,
        values: feedIds,
      },
    ];
    return await this.getIds(predicates);
  }

  public async updateSitelinksFeedItems(sitelinks: ISitelinkFeedItem[]): Promise<ISitelinkFeedItem[]> {
    const sitelinkFeeds = await this.operationServiceOptions.adWordsService
      .getService('FeedService', this.operationServiceOptions.options)
      .getSitelinkFeeds();

    const feedItems: IFeedItem[] = [];
    for (const sitelink of sitelinks) {
      const feed = sitelinkFeeds.find((x) => x.id === sitelink.feedId);
      if (feed) {
        feedItems.push(this.getFeedItem(sitelink, feed));
      }
    }

    const updatedItems = await this.update(feedItems);
    return this.getSitelinksFromFeedItems(updatedItems.value);
  }

  public async updateSitelinks(
    sitelinkIds: string[],
    updateAction: (sitelink: ISitelinkFeedItem) => void,
  ): Promise<ISitelinkFeedItem[]> {
    let sitelinks = await this.getSitelinks();
    sitelinks = sitelinks.filter((x) => sitelinkIds.indexOf(x.feedItemId || '') > -1);
    if (!sitelinks || sitelinks.length === 0) {
      return [];
    }

    sitelinks.forEach((sitelink) => {
      updateAction(sitelink);
    });

    return await this.updateSitelinksFeedItems(sitelinks);
  }

  private async getSitelinksFromFeedItems(feedItems?: IFeedItem[]): Promise<ISitelinkFeedItem[]> {
    const sitelinkFeeds = await this.operationServiceOptions.adWordsService
      .getService('FeedService', this.operationServiceOptions.options)
      .getSitelinkFeeds();

    if (!feedItems) {
      const predicates: IPredicate[] = [
        {
          field: 'FeedId',
          operator: Predicate.Operator.IN,
          values: sitelinkFeeds.map((x) => x.id),
        },
      ];
      const resultItems = await this.getByPredicates(predicates);
      feedItems = resultItems.entries;
    }
    if (feedItems.length === 0) {
      return [];
    }

    const result: ISitelinkFeedItem[] = [];
    for (const feedItem of feedItems) {
      const feed = sitelinkFeeds.find((x) => x.id === feedItem.feedId);
      if (!feed) {
        continue;
      }
      const sitelink = feedItem as ISitelinkFeedItem;
      for (const attributeValue of feedItem.attributeValues || []) {
        this.setFieldValue(sitelink, feed, attributeValue);
      }
      result.push(sitelink);
    }
    return result;
  }

  private setFieldValue(sitelink: ISitelinkFeedItem, feed: IFeed, attributeValue: IFeedItemAttributeValue) {
    const attribute = feed.attributes.find((x) => x.id === attributeValue.feedAttributeId);
    if (!attribute) {
      return;
    }
    switch (attribute.name) {
      case 'SitelinkName':
        sitelink.sitelinkText = attributeValue.stringValue || '';
        break;
      case 'SitelinkUrl':
        sitelink.sitelinkUrl =
          attributeValue.stringValue || (attributeValue.stringValues && attributeValue.stringValues.join(',')) || '';
        break;
      case 'SitelinkDescription1':
        sitelink.sitelinkLine2 = attributeValue.stringValue || '';
        break;
      case 'SitelinkDescription2':
        sitelink.sitelinkLine3 = attributeValue.stringValue || '';
        break;
      case 'SitelinkFinalUrls':
        sitelink.sitelinkFinalUrls = { urls: attributeValue.stringValues || [] };
        break;
      case 'SitelinkFinalMobileUrls':
        sitelink.sitelinkFinalMobileUrls = { urls: attributeValue.stringValues || [] };
        break;
      case 'SitelinkTrackingUrl':
        sitelink.sitelinkTrackingUrlTemplate =
          attributeValue.stringValue || (attributeValue.stringValues && attributeValue.stringValues.join(',')) || '';
        break;
      case 'SitelinkFinalUrlSuffix':
        sitelink.sitelinkFinalUrlSuffix = attributeValue.stringValue || '';
        break;
      default:
        break;
    }
  }

  private getFeedItem(sitelink: ISitelinkFeedItem, feed: IFeed): IFeedItem {
    const feedItem = sitelink as IFeedItem;
    if (sitelink.sitelinkText) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkName',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkText),
      );
      delete sitelink.sitelinkText;
    }
    if (sitelink.sitelinkUrl) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkUrl',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkUrl.split(',')),
      );
      delete sitelink.sitelinkUrl;
    }
    if (sitelink.sitelinkLine2) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkDescription1',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkLine2),
      );
      delete sitelink.sitelinkLine2;
    }
    if (sitelink.sitelinkLine3) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkDescription2',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkLine3),
      );
      delete sitelink.sitelinkLine3;
    }
    if (sitelink.sitelinkFinalUrls) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkFinalUrls',
        (attributeValue) => (attributeValue.stringValues = sitelink.sitelinkFinalUrls.urls),
      );
      delete sitelink.sitelinkFinalUrls;
    }
    if (sitelink.sitelinkFinalMobileUrls) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkFinalMobileUrls',
        (attributeValue) => (attributeValue.stringValues = sitelink.sitelinkFinalMobileUrls.urls),
      );
      delete sitelink.sitelinkFinalMobileUrls;
    }
    if (sitelink.sitelinkTrackingUrlTemplate) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkTrackingUrl',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkTrackingUrlTemplate.split(',')),
      );
      delete sitelink.sitelinkTrackingUrlTemplate;
    }
    if (sitelink.sitelinkFinalUrlSuffix) {
      this.setAttributeValue(
        feed,
        feedItem,
        'SitelinkFinalUrlSuffix',
        (attributeValue) => (attributeValue.stringValue = sitelink.sitelinkFinalUrlSuffix),
      );
      delete sitelink.sitelinkFinalUrlSuffix;
    }
    return feedItem;
  }

  private setAttributeValue(feed: IFeed, feedItem: IFeedItem, attributeName: string, setValue: (attributeValue) => {}) {
    const feedAttribute = feed.attributes.find((x) => x.name === attributeName);
    if (feedAttribute) {
      if (!feedItem.attributeValues) {
        feedItem.attributeValues = [];
      }
      let attributeValue = (feedItem.attributeValues || []).find((x) => x.feedAttributeId === feedAttribute.id);
      if (!attributeValue) {
        attributeValue = {
          feedAttributeId: feedAttribute.id,
        };
        feedItem.attributeValues.push(attributeValue);
      }
      setValue(attributeValue);
    }
  }
}

export { FeedItemService };
export * from './FeedItem';
