import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { Predicate, Feed } from '../../../types/enum';
import { IPaging } from '../../../types/adwords';
import { KeysEnum } from '../../../types/abstract';
import { IEntityExtensionSetting } from './EntityExtensionSetting';
import { PartialExtensionFeedItem } from './ExtensionFeedItem';

abstract class BaseExtensionSettingService<T extends IEntityExtensionSetting, TName> extends BaseService<T, TName> {
  private static modifyInputOperand(original: any): any {
    const extensionNode = original.extensionSetting['extensions[]'];
    // TODO
    const siteLinkKeys: KeysEnum<PartialExtensionFeedItem> = {
      // IExtensionFeedItem
      attributes: false,
      feedId: true,
      feedItemId: true,
      status: true,
      feedType: true,
      startTime: true,
      endTime: true,
      devicePreference: true,
      scheduling: true,
      campaignTargeting: true,
      adGroupTargeting: true,
      keywordTargeting: true,
      geoTargeting: true,
      geoTargetingRestriction: true,
      policySummaries: true,
      'ExtensionFeedItem.Type': false,
      // IAppFeedItem
      appStore: true,
      appId: true,
      appLinkText: true,
      appUrl: true,
      appFinalUrls: true,
      appFinalMobileUrls: true,
      appTrackingUrlTemplate: true,
      appFinalUrlSuffix: true,
      appUrlCustomParameters: true,
      // ICallFeedItem
      callPhoneNumber: true,
      callCountryCode: true,
      callTracking: true,
      callConversionType: true,
      disableCallConversionTracking: true,
      // ICalloutFeedItem
      calloutText: true,
      // IMessageFeedItem
      messageBusinessName: true,
      messageCountryCode: true,
      messagePhoneNumber: true,
      messageExtensionText: true,
      messageText: true,
      // IPriceFeedItem
      priceExtensionType: true,
      priceQualifier: true,
      trackingUrlTemplate: true,
      finalUrlSuffix: true,
      language: true,
      tableRows: true,
      // IPromotionFeedItem
      promotionTarget: true,
      discountModifier: true,
      percentOff: true,
      moneyAmountOff: true,
      promotionCode: true,
      ordersOverAmount: true,
      promotionStart: true,
      promotionEnd: true,
      occasion: true,
      finalUrls: true,
      finalMobileUrls: true,
      // trackingUrlTemplate: true,
      // finalUrlSuffix: true,
      promotionUrlCustomParameters: true,
      // language: true,
      // IReviewFeedItem
      reviewText: true,
      reviewSourceName: true,
      reviewSourceUrl: true,
      reviewTextExactlyQuoted: true,
      // ISitelinkFeedItem
      sitelinkText: true,
      sitelinkUrl: true,
      sitelinkLine2: true,
      sitelinkLine3: true,
      sitelinkFinalUrls: true,
      sitelinkFinalMobileUrls: true,
      sitelinkTrackingUrlTemplate: true,
      sitelinkFinalUrlSuffix: true,
      sitelinkUrlCustomParameters: true,
      // IStructuredSnippetFeedItem
      header: true,
      values: true,
    };
    Object.keys(siteLinkKeys).forEach((key) => {
      if (!extensionNode[key] && siteLinkKeys[key]) {
        extensionNode[key] = 'any';
      }
    });
    return original;
  }

  protected readonly entityIdFieldName?: string;

  constructor(operationServiceOptions: IOperationServiceOptions, operationType: string, entityIdFieldName?: string) {
    const serviceInfo: IServiceInfo = {
      operationType,
      selectorFields: (entityIdFieldName ? [entityIdFieldName] : []).concat([
        'ExtensionType',
        'Extensions',
        'PlatformRestrictions',
      ]),
      modifyMutateInputOperand: BaseExtensionSettingService.modifyInputOperand,
    };
    super(operationServiceOptions, serviceInfo);
    this.entityIdFieldName = entityIdFieldName;
  }

  public async getByEntityIds(campaignIds: string[], paging?: IPaging) {
    if (!this.entityIdFieldName) {
      return null;
    }
    const predicates = [
      {
        field: this.entityIdFieldName,
        operator: Predicate.Operator.IN,
        values: campaignIds,
      },
    ];

    return this.getByPredicates(predicates, paging);
  }

  public async getAllByType(feedType: Feed.Type, paging?: IPaging) {
    const predicates = [
      {
        field: 'ExtensionType',
        operator: Predicate.Operator.IN,
        values: [feedType],
      },
    ];

    return this.getByPredicates(predicates, paging);
  }
}

export { BaseExtensionSettingService };
export * from './EntityExtensionSetting';
