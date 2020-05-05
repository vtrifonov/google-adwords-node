import { ConversionTracker } from '../../../types/enum/ConversionTracker';
import { DataDrivenModelStatus } from '../../../types/enum/DataDrivenModelStatus';
import { AttributionModelType } from '../../../types/enum/AttributionModelType';
import { IAttributes } from '../../../types/adwords';
import { AdWordsConversionTracker } from '../../../types/enum/AdWordsConversionTracker';
import { AppConversion } from '../../../types/enum/AppConversion';
import { ConversionDeduplicationMode } from '../../../types/enum/ConversionDeduplicationMode';

interface IConversionTracker<Type> extends IAttributes<Type> {
  readonly id: string;
  readonly originalConversionTypeId: string;
  name: string;
  status: ConversionTracker.Status;
  category: ConversionTracker.Category;
  readonly googleEventSnippet: string;
  readonly googleGlobalSiteTag: string;
  readonly dataDrivenModelStatus: DataDrivenModelStatus;
  readonly conversionTypeOwnerCustomerId: string;
  viewthroughLookbackWindow: number;
  ctcLookbackWindow: number;
  countingType: ConversionDeduplicationMode;
  defaultRevenueValue: number;
  defaultRevenueCurrencyCode: string;
  alwaysUseDefaultRevenueValue: boolean;
  excludeFromBidding: boolean;
  attributionModelType: AttributionModelType;
  mostRecentConversionDate: string;
  lastReceivedRequestTime: string;
  'ConversionTracker.Type': ConversionTracker.Type;
}

interface IAdCallMetricsConversionRaw<Type> extends IConversionTracker<Type> {
  phoneCallDuration: number;
}

interface IAdWordsConversionTrackerRaw<Type> extends IConversionTracker<Type> {
  trackingCodeType: AdWordsConversionTracker.TrackingCodeType;
}

interface IAppConversionRaw<Type> extends IConversionTracker<Type> {
  appId: string;
  appPlatform: AppConversion.AppPlatform;
  snippet: string;
  appConversionType: AppConversion.AppConversionType;
  appPostbackUrl: string;
}

interface IUploadCallConversionRaw<Type> extends IConversionTracker<Type> {}

interface IUploadConversionRaw<Type> extends IConversionTracker<Type> {
  isExternallyAttributed: boolean;
}

interface IWebsiteCallMetricsConversionRaw<Type> extends IConversionTracker<Type> {
  phoneCallDuration: number;
}

interface IAdCallMetricsConversion extends Partial<IAdCallMetricsConversionRaw<'AdCallMetricsConversion'>> {}
interface IAdWordsConversionTracker extends Partial<IAdWordsConversionTrackerRaw<'AdWordsConversionTracker'>> {}
interface IAppConversion extends Partial<IAppConversionRaw<'AppConversion'>> {}
interface IUploadCallConversion extends Partial<IUploadCallConversionRaw<'UploadCallConversion'>> {}
interface IUploadConversion extends Partial<IUploadConversionRaw<'UploadConversion'>> {}
interface IWebsiteCallMetricsConversion
  extends Partial<IWebsiteCallMetricsConversionRaw<'WebsiteCallMetricsConversion'>> {}

type PartialConversionTracker = Partial<
  | IAdCallMetricsConversion
  | IAdWordsConversionTracker
  | IAppConversion
  | IUploadCallConversion
  | IUploadConversion
  | IWebsiteCallMetricsConversion
>;

export {
  PartialConversionTracker,
  IAdCallMetricsConversion,
  IAdWordsConversionTracker,
  IAppConversion,
  IUploadCallConversion,
  IUploadConversion,
  IWebsiteCallMetricsConversion,
};
