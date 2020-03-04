import { IPriceTableRow } from './PriceTableRow';
import { ICustomParameters } from './CustomParameters';
import { IFeedItemPolicySummary } from './FeedItemPolicySummary';
import { IAttributes } from '../../../types/adwords';
import { IFeedItemDevicePreference } from './FeedItemDevicePreference';
import { IFeedItemScheduling } from './FeedItemScheduling';
import { IFeedItemCampaignTargeting } from './FeedItemCampaignTargeting';
import { IFeedItemAdGroupTargeting } from './FeedItemAdGroupTargeting';
import { IKeyword, ILocation } from './Criterion';
import { IFeedItemGeoRestriction } from './FeedItemGeoRestriction';
import { IUrlList } from '../AdGroupAdService';
import { ICallConversionType } from './CallConversionType';
import { IMoneyWithCurrency } from './Money';
import _ from 'lodash';
import {
  FeedItem,
  Feed,
  AppFeedItem,
  PriceExtensionType,
  PriceExtensionPriceQualifier,
  PromotionExtensionDiscountModifier,
  PromotionExtensionOccasion,
} from '../../../types/enum';

interface IExtensionFeedItemRaw<Type> extends IAttributes<Type> {
  readonly feedId: number;
  feedItemId: number;
  readonly status: FeedItem.Status;
  readonly feedType: Feed.Type;
  readonly startTime: string;
  readonly endTime: string;
  devicePreference: IFeedItemDevicePreference;
  scheduling: IFeedItemScheduling;
  campaignTargeting: IFeedItemCampaignTargeting;
  adGroupTargeting: IFeedItemAdGroupTargeting;
  keywordTargeting: IKeyword;
  geoTargeting: ILocation;
  geoTargetingRestriction: IFeedItemGeoRestriction;
  readonly policySummaries: IFeedItemPolicySummary[];
  'ExtensionFeedItem.Type': string;
}

interface IExtensionFeedItem<Type = ''> extends Partial<IExtensionFeedItemRaw<Type>> {}

class ExtensionFeedItemHelper {
  public static isAppFeedItem(item: PartialExtensionFeedItem): item is IAppFeedItem {
    return _.every(['appStore', 'appStore'], (prop) => prop in item);
  }
  public static isCallFeedItem(item: PartialExtensionFeedItem): item is ICallFeedItem {
    return _.some(['callPhoneNumber', 'callCountryCode'], (prop) => prop in item);
  }
  public static isCalloutFeedItem(item: PartialExtensionFeedItem): item is ICalloutFeedItem {
    return _.every(['calloutText'], (prop) => prop in item);
  }
  public static isMessageFeedItem(item: PartialExtensionFeedItem): item is IMessageFeedItem {
    return _.every(['messageBusinessName', 'messageCountryCode', 'messageText'], (prop) => prop in item);
  }
  public static isPriceFeedItem(item: PartialExtensionFeedItem): item is IPriceFeedItem {
    return _.every(['priceExtensionType', 'priceQualifier'], (prop) => prop in item);
  }
  public static isPromotionFeedItem(item: PartialExtensionFeedItem): item is IPromotionFeedItem {
    return _.every(['promotionTarget', 'discountModifier'], (prop) => prop in item);
  }
  public static isReviewFeedItem(item: PartialExtensionFeedItem): item is IReviewFeedItem {
    return _.every(['reviewText', 'string'], (prop) => prop in item);
  }
  public static isSitelinkFeedItem(item: PartialExtensionFeedItem): item is ISitelinkFeedItem {
    return _.every(['sitelinkText', 'sitelinkUrl'], (prop) => prop in item);
  }
  public static isStructuredSnippetFeedItem(item: PartialExtensionFeedItem): item is IStructuredSnippetFeedItem {
    return _.every(['header', 'values'], (prop) => prop in item);
  }

  public static setType(item: PartialExtensionFeedItem) {
    if (ExtensionFeedItemHelper.isAppFeedItem(item)) {
      item.attributes = { 'xsi:type': 'AppFeedItem' };
    } else if (ExtensionFeedItemHelper.isCallFeedItem(item)) {
      item.attributes = { 'xsi:type': 'CallFeedItem' };
    } else if (ExtensionFeedItemHelper.isCalloutFeedItem(item)) {
      item.attributes = { 'xsi:type': 'CalloutFeedItem' };
    } else if (ExtensionFeedItemHelper.isMessageFeedItem(item)) {
      item.attributes = { 'xsi:type': 'MessageFeedItem' };
    } else if (ExtensionFeedItemHelper.isPriceFeedItem(item)) {
      item.attributes = { 'xsi:type': 'PriceFeedItem' };
    } else if (ExtensionFeedItemHelper.isPromotionFeedItem(item)) {
      item.attributes = { 'xsi:type': 'PromotionFeedItem' };
    } else if (ExtensionFeedItemHelper.isReviewFeedItem(item)) {
      item.attributes = { 'xsi:type': 'ReviewFeedItem' };
    } else if (ExtensionFeedItemHelper.isSitelinkFeedItem(item)) {
      item.attributes = { 'xsi:type': 'SitelinkFeedItem' };
    } else if (ExtensionFeedItemHelper.isStructuredSnippetFeedItem(item)) {
      item.attributes = { 'xsi:type': 'StructuredSnippetFeedItem' };
    }
    return item;
  }
}

interface IAppFeedItem extends IExtensionFeedItem<'AppFeedItem'> {
  appStore: AppFeedItem.AppStore;
  appId: string;
  appLinkText: string;
  appUrl: string;
  appFinalUrls: IUrlList;
  appFinalMobileUrls: IUrlList;
  appTrackingUrlTemplate: string;
  appFinalUrlSuffix: string;
  appUrlCustomParameters: ICustomParameters;
}

interface ICallFeedItem extends IExtensionFeedItem<'CallFeedItem'> {
  callPhoneNumber: string;
  callCountryCode: string;
  callTracking: boolean;
  callConversionType: ICallConversionType;
  disableCallConversionTracking: boolean;
}

interface ICalloutFeedItem extends IExtensionFeedItem<'CalloutFeedItem'> {
  calloutText: string;
}

interface IMessageFeedItem extends IExtensionFeedItem<'MessageFeedItem'> {
  messageBusinessName: string;
  messageCountryCode: string;
  messagePhoneNumber: string;
  messageExtensionText: string;
  messageText: string;
}

interface IPriceFeedItem extends IExtensionFeedItem<'PriceFeedItem'> {
  priceExtensionType: PriceExtensionType;
  priceQualifier: PriceExtensionPriceQualifier;
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  language: string;
  tableRows: IPriceTableRow[];
}

interface IPromotionFeedItem extends IExtensionFeedItem<'PromotionFeedItem'> {
  promotionTarget: string;
  discountModifier: PromotionExtensionDiscountModifier;
  percentOff: number;
  moneyAmountOff: IMoneyWithCurrency;
  promotionCode: string;
  ordersOverAmount: IMoneyWithCurrency;
  promotionStart: string;
  promotionEnd: string;
  occasion: PromotionExtensionOccasion;
  finalUrls: IUrlList;
  finalMobileUrls: IUrlList;
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  promotionUrlCustomParameters: ICustomParameters;
  language: string;
}

interface IReviewFeedItem extends IExtensionFeedItem<'ReviewFeedItem'> {
  reviewText: string;
  reviewSourceName: string;
  reviewSourceUrl: string;
  reviewTextExactlyQuoted: boolean;
}

interface ISitelinkFeedItem extends IExtensionFeedItem<'SitelinkFeedItem'> {
  sitelinkText: string;
  sitelinkUrl: string;
  sitelinkLine2: string;
  sitelinkLine3: string;
  sitelinkFinalUrls: IUrlList;
  sitelinkFinalMobileUrls: IUrlList;
  sitelinkTrackingUrlTemplate: string;
  sitelinkFinalUrlSuffix: string;
  sitelinkUrlCustomParameters: ICustomParameters;
}

interface IStructuredSnippetFeedItem extends IExtensionFeedItem<'StructuredSnippetFeedItem'> {
  header: string;
  values: string[];
}

type PartialExtensionFeedItem = Partial<
  | IExtensionFeedItem
  | IAppFeedItem
  | ICallFeedItem
  | ICalloutFeedItem
  | IMessageFeedItem
  | IPriceFeedItem
  | IPromotionFeedItem
  | IReviewFeedItem
  | ISitelinkFeedItem
  | IStructuredSnippetFeedItem
>;

export {
  ExtensionFeedItemHelper,
  IExtensionFeedItemRaw,
  IExtensionFeedItem,
  IAppFeedItem,
  ICallFeedItem,
  ICalloutFeedItem,
  IMessageFeedItem,
  IPriceFeedItem,
  IPromotionFeedItem,
  IReviewFeedItem,
  ISitelinkFeedItem,
  IStructuredSnippetFeedItem,
  PartialExtensionFeedItem,
};
