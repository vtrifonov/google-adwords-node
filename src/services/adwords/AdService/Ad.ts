import { ICustomParameters } from './CustomParameters';
import { IUrlData } from './UrlData';
import { Ad } from './enum/Ad';
import { SystemManagedEntitySource } from './enum/SystemManagedEntitySource';
import { Omit } from '../../../types/core';
import { IAttributes } from '../../../types/adwords/Attributes';
import { IImage } from './Media';
import { IDynamicSettings } from './DynamicSettings';
import { DisplayAdFormatSetting } from './enum/DisplayAdFormatSetting';

interface IAdRaw<Type> extends IAttributes<Type> {
  id: string;
  url: string;
  displayUrl: string;
  finalUrls: string[];
  finalMobileUrls: string[];
  finalAppUrls: string[];
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
  urlData: IUrlData;
  automated: boolean;
  type: Ad.Type;
  devicePreference: string;
  readonly systemManagedEntitySource: SystemManagedEntitySource;
  'Ad.Type': string;
}

interface IAd<Type = ''> extends Partial<IAdRaw<Type>> {}

/**
 * Caution: Expanded text ads do not use url, displayUrl, finalAppUrls, or devicePreference;
 * setting these fields on an expanded text ad will cause an error.
 *
 * @author dulin
 * @interface IExpandedTextAd
 * @extends {(Partial<Omit<IAd, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>>)}
 */
interface IExpandedTextAd
  extends Partial<Omit<IAdRaw<'ExpandedTextAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  headlinePart1: string;
  headlinePart2: string;
  headlinePart3?: string;
  description: string;
  description2?: string;
  path1?: string;
  path2?: string;
}

interface IResponsiveDisplayAd
  extends Partial<Omit<IAdRaw<'ResponsiveDisplayAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  marketingImage: Partial<IImage>;
  logoImage: IImage;
  squareMarketingImage: IImage;
  shortHeadline: string;
  longHeadline: string;
  description: string;
  businessName: string;
  mainColor: string;
  accentColor: string;
  allowFlexibleColor: string;
  callToActionText: string;
  dynamicDisplayAdSettings: IDynamicSettings;
  formatSetting: DisplayAdFormatSetting;
}

interface IResponsiveSearchAd
  extends Partial<Omit<IAdRaw<'ResponsiveSearchAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  headlines: any;
  descriptions: any;
  path1: string;
  path2: string;
}

interface IImageAd extends Partial<IAdRaw<'ImageAd'>> {
  image?: IImage;
  name: string;
  adToCopyImageFrom?: string;
}

interface IProductAd extends Partial<Omit<IAdRaw<'ProductAd'>, 'url' | 'finalUrl' | 'displayUrl' | 'finalAppUrls'>> {}

interface ITemplateAd extends Partial<IAdRaw<'TemplateAd'>> {
  templateId: number;
  adUnionId: any;
  templateElements: any[];
  adAsImage: IImage;
  dimensions: any;
  name: string;
  duration: number;
  originAdId: number;
}

interface IMultiAssetResponsiveDisplayAd
  extends Partial<
    Omit<IAdRaw<'MultiAssetResponsiveDisplayAd'>, 'url' | 'displayUrl' | 'finalAppUrls' | 'devicePreference'>
  > {
  marketingImages: any[];
  squareMarketingImages: any[];
  logoImages?: any[];
  landscapeLogoImages?: any[];
  headlines: any[];
  longHeadline: any;
  descriptions: any[];
  youTubeVideos?: any[];
  businessName: string;
  mainColor?: string;
  accentColor?: string;
  allowFlexibleColor?: boolean;
  callToActionText?: string;
  dynamicSettingsPricePrefix?: string;
  dynamicSettingsPromoText?: string;
  formatSetting?: DisplayAdFormatSetting;
}

interface IUniversalApAd
  extends Partial<Omit<IAdRaw<'UniversalApAd'>, 'displayUrl' | 'finalAppUrls' | 'devicePreference'>> {
  headlines: any[];
  descriptions: any[];
  mandatoryAdText: any;
  images?: any[];
  videos?: any[];
  html5MediaBundles?: any;
}

type PartialAd = Partial<
  | IExpandedTextAd
  | IImageAd
  | IMultiAssetResponsiveDisplayAd
  | IProductAd
  | IResponsiveDisplayAd
  | IResponsiveSearchAd
  | ITemplateAd
  | IUniversalApAd
>;

export {
  IAd,
  IAdRaw,
  IExpandedTextAd,
  IImageAd,
  IMultiAssetResponsiveDisplayAd,
  IProductAd,
  IResponsiveDisplayAd,
  IResponsiveSearchAd,
  ITemplateAd,
  IUniversalApAd,
  PartialAd,
};
