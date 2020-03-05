import { IPage } from './../../../types/abstract';
import {
  IAd,
  IExpandedTextAd,
  IImageAd,
  IProductAd,
  IResponsiveDisplayAd,
  IResponsiveSearchAd,
  PartialAd,
  ITemplateAd,
  IMultiAssetResponsiveDisplayAd,
  IUniversalApAd,
  IPaging,
} from '../../../types/adwords';
import { BaseService, IServiceInfo } from '../../core';
import { IOperationServiceOptions } from '../../core';
import _ from 'lodash';
import { Ad, Predicate } from '../../../types/enum';

class AdService extends BaseService<PartialAd, 'AdService'> {
  // TODO: better type guard
  public static isExpandedTextAd(ad: PartialAd): ad is IExpandedTextAd {
    return _.every(['headlinePart1', 'description'], (prop) => prop in ad);
  }
  public static isResponsiveDisplayAd(ad: PartialAd): ad is IResponsiveDisplayAd {
    return _.every(['dynamicDisplayAdSettings', 'shortHeadline'], (prop) => prop in ad);
  }
  public static isResponsiveSearchAd(ad: PartialAd): ad is IResponsiveSearchAd {
    return _.every(['headlines', 'descriptions'], (prop) => prop in ad);
  }
  public static isImageAd(ad: PartialAd): ad is IImageAd {
    return _.some(['image', 'adToCopyImageFrom'], (prop) => prop in ad);
  }
  public static isTemplateAd(ad: PartialAd): ad is ITemplateAd {
    return _.some(['templateId'], (prop) => prop in ad);
  }
  public static isMultiAssetResponsiveDisplayAd(ad: PartialAd): ad is IMultiAssetResponsiveDisplayAd {
    return _.some(['marketingImages'], (prop) => prop in ad);
  }
  public static isUniversalApAd(ad: PartialAd): ad is IUniversalApAd {
    return _.some(['headlines', 'descriptions'], (prop) => prop in ad);
  }

  constructor(options: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'AdOperation',
      selectorFields: [
        'AccentColor',
        'AdType',
        'AllowFlexibleColor',
        'BusinessName',
        'CallToActionText',
        'CreativeFinalAppUrls',
        'CreativeFinalMobileUrls',
        'CreativeFinalUrlSuffix',
        'CreativeFinalUrls',
        'CreativeTrackingUrlTemplate',
        'CreativeUrlCustomParameters',
        'Description',
        'DisplayUrl',
        'ExpandedDynamicSearchCreativeDescription2',
        'ExpandedTextAdDescription2',
        'ExpandedTextAdHeadlinePart3',
        'FormatSetting',
        'HeadlinePart1',
        'HeadlinePart2',
        'Id',
        'LongHeadline',
        'MainColor',
        'MultiAssetResponsiveDisplayAdAccentColor',
        'MultiAssetResponsiveDisplayAdAllowFlexibleColor',
        'MultiAssetResponsiveDisplayAdBusinessName',
        'MultiAssetResponsiveDisplayAdCallToActionText',
        'MultiAssetResponsiveDisplayAdDescriptions',
        'MultiAssetResponsiveDisplayAdDynamicSettingsPricePrefix',
        'MultiAssetResponsiveDisplayAdDynamicSettingsPromoText',
        'MultiAssetResponsiveDisplayAdFormatSetting',
        'MultiAssetResponsiveDisplayAdHeadlines',
        'MultiAssetResponsiveDisplayAdLandscapeLogoImages',
        'MultiAssetResponsiveDisplayAdLogoImages',
        'MultiAssetResponsiveDisplayAdLongHeadline',
        'MultiAssetResponsiveDisplayAdMainColor',
        'MultiAssetResponsiveDisplayAdMarketingImages',
        'MultiAssetResponsiveDisplayAdSquareMarketingImages',
        'MultiAssetResponsiveDisplayAdYouTubeVideos',
        'Path1',
        'Path2',
        'ResponsiveSearchAdDescriptions',
        'ResponsiveSearchAdHeadlines',
        'ResponsiveSearchAdPath1',
        'ResponsiveSearchAdPath2',
        'ShortHeadline',
        'UniversalAppAdDescriptions',
        'UniversalAppAdHeadlines',
        'UniversalAppAdHtml5MediaBundles',
        'UniversalAppAdImages',
        'UniversalAppAdMandatoryAdText',
        'UniversalAppAdYouTubeVideos',
        'Url',
      ],
    };
    super(options, serviceInfo);
  }

  public async getAllByType(adType: Ad.Type, paging?: IPaging): Promise<IPage<PartialAd> | undefined> {
    return this.getByPredicates(
      [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [adType],
        },
      ],
      paging,
    );
  }

  protected setType(operand: PartialAd) {
    if (AdService.isExpandedTextAd(operand)) {
      operand.attributes = { 'xsi:type': 'ExpandedTextAd' };
    } else if (AdService.isResponsiveDisplayAd(operand)) {
      operand.attributes = { 'xsi:type': 'ResponsiveDisplayAd' };
    } else if (AdService.isResponsiveSearchAd(operand)) {
      operand.attributes = { 'xsi:type': 'ResponsiveSearchAd' };
    } else if (AdService.isImageAd(operand)) {
      operand.attributes = { 'xsi:type': 'ImageAd' };
    } else if (AdService.isTemplateAd(operand)) {
      operand.attributes = { 'xsi:type': 'TemplateAd' };
    } else if (AdService.isMultiAssetResponsiveDisplayAd(operand)) {
      operand.attributes = { 'xsi:type': 'MultiAssetResponsiveDisplayAd' };
    } else if (AdService.isUniversalApAd(operand)) {
      operand.attributes = { 'xsi:type': 'UniversalApAd' };
    } else {
      operand.attributes = { 'xsi:type': 'ProductAd' };
    }
    return operand;
  }
}

export { AdService };
