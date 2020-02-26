import { pd } from 'pretty-data';

import { SoapService, AdwordsOperationService } from '../../core';
import { ISelector, Predicate, IPaging, Operator } from '../../../types/adwords';
import * as Ad from '../../../types/adwords/Ad';
import { IAdReturnValue } from './AdReturnValue';
import { IAdOperation } from './AdOperation';
import { IAdPage } from './AdPage';
import _ from 'lodash';
import { IAd, IExpandedTextAd, IImageAd, IResponsiveDisplayAd, IResponsiveSearchAd, PartialAd } from './Ad';

interface IAdServiceOpts {
  soapService: SoapService;
}

class AdService extends AdwordsOperationService {
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

  public static setType(operand: PartialAd) {
    if (AdService.isExpandedTextAd(operand)) {
      operand.attributes = { 'xsi:type': 'ExpandedTextAd' };
    } else if (AdService.isResponsiveDisplayAd(operand)) {
      operand.attributes = { 'xsi:type': 'ResponsiveDisplayAd' };
    } else if (AdService.isResponsiveSearchAd(operand)) {
      operand.attributes = { 'xsi:type': 'ResponsiveSearchAd' };
    } else if (AdService.isImageAd(operand)) {
      operand.attributes = { 'xsi:type': 'ImageAd' };
    }
    return operand;
  }
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-AdService
   *
   * @private
   * @static
   * @memberof AdService
   */
  private static readonly selectorFields = [
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
  ];

  private soapService: SoapService;
  constructor(options: IAdServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
    };
    return this.get(serviceSelector);
  }

  public async getAllMultiAssetResponsiveDisplayAd(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [Ad.Type.MULTI_ASSET_RESPONSIVE_DISPLAY_AD],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllResponsiveDisplayAd(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [Ad.Type.RESPONSIVE_DISPLAY_AD],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllResponsiveSearchAd(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [Ad.Type.RESPONSIVE_SEARCH_AD],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllExpandedTextAd(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [Ad.Type.EXPANDED_TEXT_AD],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllImageAd(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [Ad.Type.IMAGE_AD],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllByType(adType: Ad.Type, paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'AdType',
          operator: Predicate.Operator.IN,
          values: [adType],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getByAdIds(adIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdService.selectorFields,
      predicates: [
        {
          field: 'Id',
          operator: Predicate.Operator.IN,
          values: adIds,
        },
      ],
    };
    return this.get(serviceSelector);
  }

  /**
   * add ad group ad.
   *
   * 当调用 mutate() 时，最好每个请求发送多个操作；避免发送多个请求，而每个请求仅包含一个操作。每个请求发送多个操作可减少到服务器的往返次数，并提高应用性能。
   *
   * @author vtrifonov
   * @param {PartialAd[]} ads
   * @returns
   * @memberof AdService
   */
  public add(ads: PartialAd[]) {
    const operations: IAdOperation[] = ads.map((ad: PartialAd) => {
      const operation: IAdOperation = {
        operator: Operator.ADD,
        operand: AdService.setType(ad),
      };
      return operation;
    });
    return this.mutate(operations);
  }

  public update(ads: PartialAd[]) {
    const operations: IAdOperation[] = ads.map((ad: PartialAd) => {
      const operation: IAdOperation = {
        operator: Operator.SET,
        operand: ad,
      };
      return operation;
    });
    return this.mutate(operations);
  }

  protected async get<ServiceSelector = ISelector, Rval = IAdPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      return rval;
    });
  }

  protected async mutate<Operation = IAdOperation, Rval = IAdReturnValue>(
    operations: Operation[],
  ): Promise<Rval | undefined> {
    return this.soapService
      .mutateAsync<Operation, Rval>(operations, /** operationType = */ 'AdOperation')
      .then((rval) => {
        return rval;
      });
  }
}

export { AdService, IAdServiceOpts };
export * from './Ad';
export * from './CustomParameter';
export * from './CustomParameters';
export * from './Dimensions';
export * from './DynamicSettings';
export * from './Media';
export * from './Media_Size_DimensionsMapEntry';
export * from './Media_Size_StringMapEntry';
export * from './UrlData';
export * from './UrlList';
export * from './enum/Ad';
export * from './enum/DisplayAdFormatSetting';
export * from './enum/Media';
export * from './enum/SystemManagedEntitySource';
