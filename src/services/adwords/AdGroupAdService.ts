import { BaseService, IOperationServiceOptions, IServiceInfo } from '../core';
import {
  IAdGroupAd,
  IPaging,
  IImageAd,
  IOperation,
  IAd,
  PartialAd,
  IUpdateAdsResult,
  IPredicate,
} from '../../types/adwords';
import { Ad, Predicate, Operator } from '../../types/enum';
import { IPage, IListReturnValue } from '../../types/abstract';
import { AdService } from './AdService';

class AdGroupAdService extends BaseService<IAdGroupAd, 'AdGroupAdService'> {
  private readonly adService;

  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'AdGroupAdOperation',
      selectorFields: [
        'AccentColor',
        'AdGroupId',
        'AdStrengthInfo',
        'AdType',
        'AdvertisingId',
        'AllowFlexibleColor',
        'Automated',
        'BaseAdGroupId',
        'BaseCampaignId',
        'BusinessName',
        'CallOnlyAdBusinessName',
        'CallOnlyAdCallTracked',
        'CallOnlyAdConversionTypeId',
        'CallOnlyAdCountryCode',
        'CallOnlyAdDescription1',
        'CallOnlyAdDescription2',
        'CallOnlyAdDisableCallConversion',
        'CallOnlyAdPhoneNumber',
        'CallOnlyAdPhoneNumberVerificationUrl',
        'CallToActionText',
        'CreationTime',
        'CreativeFinalAppUrls',
        'CreativeFinalMobileUrls',
        'CreativeFinalUrlSuffix',
        'CreativeFinalUrls',
        'CreativeTrackingUrlTemplate',
        'CreativeUrlCustomParameters',
        'Description',
        'Description1',
        'Description2',
        'DevicePreference',
        'Dimensions',
        'DisplayUploadAdGmailTeaserBusinessName',
        'DisplayUploadAdGmailTeaserDescription',
        'DisplayUploadAdGmailTeaserHeadline',
        'DisplayUploadAdGmailTeaserLogoImage',
        'DisplayUrl',
        'ExpandedDynamicSearchCreativeDescription2',
        'ExpandedTextAdDescription2',
        'ExpandedTextAdHeadlinePart3',
        'ExpandingDirections',
        'FileSize',
        'FormatSetting',
        'GmailHeaderImage',
        'GmailMarketingImage',
        'GmailTeaserBusinessName',
        'GmailTeaserDescription',
        'GmailTeaserHeadline',
        'GmailTeaserLogoImage',
        'Headline',
        'HeadlinePart1',
        'HeadlinePart2',
        'Height',
        'Id',
        'ImageCreativeName',
        'IndustryStandardCommercialIdentifier',
        'IsCookieTargeted',
        'IsTagged',
        'IsUserInterestTargeted',
        'Labels',
        'LandscapeLogoImage',
        'LogoImage',
        'LongHeadline',
        'MainColor',
        'MarketingImage',
        'MarketingImageCallToActionText',
        'MarketingImageCallToActionTextColor',
        'MarketingImageDescription',
        'MarketingImageHeadline',
        'MediaId',
        'MimeType',
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
        'PolicySummary',
        'PricePrefix',
        'ProductImages',
        'ProductVideoList',
        'PromoText',
        'ReadyToPlayOnTheWeb',
        'ReferenceId',
        'ResponsiveSearchAdDescriptions',
        'ResponsiveSearchAdHeadlines',
        'ResponsiveSearchAdPath1',
        'ResponsiveSearchAdPath2',
        'RichMediaAdCertifiedVendorFormatId',
        'RichMediaAdDuration',
        'RichMediaAdImpressionBeaconUrl',
        'RichMediaAdName',
        'RichMediaAdSnippet',
        'RichMediaAdSourceUrl',
        'RichMediaAdType',
        'ShortHeadline',
        'SourceUrl',
        'SquareMarketingImage',
        'Status',
        'SystemManagedEntitySource',
        'TemplateAdDuration',
        'TemplateAdName',
        'TemplateAdUnionId',
        'TemplateElementFieldName',
        'TemplateElementFieldText',
        'TemplateElementFieldType',
        'TemplateId',
        'TemplateOriginAdId',
        'UniqueName',
        'UniversalAppAdDescriptions',
        'UniversalAppAdHeadlines',
        'UniversalAppAdHtml5MediaBundles',
        'UniversalAppAdImages',
        'UniversalAppAdMandatoryAdText',
        'UniversalAppAdYouTubeVideos',
        'Url',
        'UrlData',
        'Urls',
        'VideoTypes',
        'Width',
        'YouTubeVideoIdString',
      ],
    };
    super(operationServiceOptions, serviceInfo);
    this.adService = this.operationServiceOptions.adWordsService.getService(
      'AdService',
      this.operationServiceOptions.options,
    );
  }

  public async getAllIdsByCampaignIds(campaignIds: string[]): Promise<string[]> {
    const predicates: IPredicate[] = [
      {
        field: 'BaseCampaignId',
        operator: Predicate.Operator.IN,
        values: campaignIds,
      },
    ];
    return await this.getIds(predicates);
  }

  public async getAllByType(adType: Ad.Type, paging?: IPaging): Promise<IPage<IAdGroupAd> | undefined> {
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

  public async getByAdGroupIds(adGroupIds: string[], paging?: IPaging): Promise<IPage<IAdGroupAd> | undefined> {
    return this.getByPredicates(
      [
        {
          field: 'AdGroupId',
          operator: Predicate.Operator.IN,
          values: adGroupIds,
        },
      ],
      paging,
    );
  }

  public async getByFinalUrls(finalUrls: string[], paging?: IPaging): Promise<IPage<IAdGroupAd> | undefined> {
    return this.getByPredicates(
      [
        {
          field: 'CreativeFinalUrls',
          operator: Predicate.Operator.IN,
          values: finalUrls,
        },
      ],
      paging,
    );
  }

  public async updateImageAd(
    imageAdGroupAd: IAdGroupAd,
    updateAction: (imageAd: IImageAd) => void,
  ): Promise<IListReturnValue<IAdGroupAd>> {
    return this.mutate(this.getImageAdUpdateOperations(imageAdGroupAd, updateAction));
  }

  public async updateAds(adGroupAdIds: string[], updateAction: (ad: PartialAd) => void): Promise<IUpdateAdsResult> {
    const adGroupAds = await (await this.getByIds(adGroupAdIds)).entries;
    if (!adGroupAdIds) {
      throw new Error('AdGroups with the given Ids were not found');
    }

    const imageAds = adGroupAds.filter((x) => x.ad.type === Ad.Type.IMAGE_AD);
    const otherAds = adGroupAds.filter((x) => x.ad.type !== Ad.Type.IMAGE_AD);

    const result: IUpdateAdsResult = {};

    if (otherAds && otherAds.length > 0) {
      otherAds.forEach((adGroupAd) => {
        this.removeUnknownValues(adGroupAd.ad);
        updateAction(adGroupAd.ad);
      });
      const otherOperations: Array<IOperation<PartialAd>> = otherAds.map((adGroupAd) => {
        const operation: IOperation<PartialAd> = {
          operator: Operator.SET,
          operand: adGroupAd.ad,
        };
        return operation;
      });
      result.adUpdates = await this.adService.mutate(otherOperations);
    }

    if (imageAds && imageAds.length > 0) {
      const adGroupAdOperations: Array<IOperation<IAdGroupAd>> = [];
      imageAds.forEach((imageAdGroupAd) => {
        const imageAdUpdateOperations = this.getImageAdUpdateOperations(imageAdGroupAd, updateAction);
        adGroupAdOperations.push(...imageAdUpdateOperations);
      });
      result.imageAdUpdates = await this.mutate(adGroupAdOperations);
    }

    return result;
  }

  protected needToSetAttribute(operand: IAdGroupAd) {
    return operand.ad && (!operand.ad.attributes || !operand.ad.attributes['xsi:type']);
  }

  protected setType(operand: IAdGroupAd) {
    if (AdService.isExpandedTextAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'ExpandedTextAd' };
    } else if (AdService.isResponsiveDisplayAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'ResponsiveDisplayAd' };
    } else if (AdService.isResponsiveSearchAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'ResponsiveSearchAd' };
    } else if (AdService.isImageAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'ImageAd' };
    } else if (AdService.isTemplateAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'TemplateAd' };
    } else if (AdService.isMultiAssetResponsiveDisplayAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'MultiAssetResponsiveDisplayAd' };
    } else if (AdService.isUniversalApAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'UniversalApAd' };
    } else if (AdService.isTextAd(operand.ad)) {
      operand.ad.attributes = { 'xsi:type': 'TextAd' };
    } else {
      operand.ad.attributes = { 'xsi:type': 'ProductAd' };
    }
    return operand;
  }

  private isPrimitive(test): boolean {
    return test !== Object(test);
  }

  private removeUnknownValues(operand: any) {
    if (this.isPrimitive(operand)) {
      return true;
    }
    Object.keys(operand).forEach((key) => {
      if (operand[key] && operand[key] === 'UNKNOWN') {
        delete operand[key];
      } else {
        this.removeUnknownValues(operand[key]);
      }
    });
  }

  private getImageAdUpdateOperations(
    imageAdGroupAd: IAdGroupAd,
    updateAction: (imageAd: IImageAd) => void,
  ): Array<IOperation<IAdGroupAd>> {
    // we cannot update an ImageAd, so we need to create a new ImageAd with AdGrouAd and remove the previous Image AdGroupAd
    const imageAd = imageAdGroupAd.ad as IImageAd;
    delete imageAd.image;
    const newImageAd: IImageAd = JSON.parse(JSON.stringify(imageAd));
    newImageAd.adToCopyImageFrom = imageAd.id;
    delete newImageAd.id;

    const newImageAdGroupAd: IAdGroupAd = {
      adGroupId: imageAdGroupAd.adGroupId,
      ad: newImageAd,
      status: imageAdGroupAd.status,
      forwardCompatibilityMap: imageAdGroupAd.forwardCompatibilityMap,
    };

    updateAction(newImageAd);

    const addOperation: IOperation<IAdGroupAd, 'AdGroupAdService'> = {
      operator: Operator.ADD,
      operand: newImageAdGroupAd,
    };

    const deleteOperation: IOperation<IAdGroupAd, 'AdGroupAdService'> = {
      operator: Operator.REMOVE,
      operand: imageAdGroupAd,
    };

    return [addOperation, deleteOperation];
  }
}

export { AdGroupAdService };
