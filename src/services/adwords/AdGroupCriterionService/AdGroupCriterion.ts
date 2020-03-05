import { IBid } from './Bid';
import { IQualityInfo } from './QualityInfo';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { IUrlList } from './UrlList';
import { IAttributes, ICustomParameters, ITextLabel, IKeyword, IGender, IAgeRange } from '../../../types/adwords';
import { CriterionUse, SystemServingStatus, ApprovalStatus, UserStatus } from '../../../types/enum';

interface IAdGroupCriterion<Type> extends IAttributes<Type> {
  adGroupId: string;
  readonly criterionUse: CriterionUse;
  // TODO
  criterion: IKeyword | IGender | IAgeRange;
  labels: ITextLabel[];

  // forwardCompatibilityMap: any;
  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  'AdGroupCriterion.Type': string;
}

interface IBiddableAdGroupCriterionRaw<Type> extends IAdGroupCriterion<Type> {
  readonly systemServingStatus: SystemServingStatus;
  readonly approvalStatus: ApprovalStatus;
  readonly disapprovalReasons: string[];
  readonly firstPageCpc: IBid;
  readonly topOfPageCpc: IBid;
  readonly firstPositionCpc: IBid;
  readonly qualityInfo: IQualityInfo;
  userStatus: UserStatus;
  biddingStrategyConfiguration: IBiddingStrategyConfiguration;
  bidModifier: number;
  finalUrls: IUrlList[];
  finalMobileUrls: IUrlList[];
  finalAppUrls: IUrlList[];
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
}

interface IBiddableAdGroupCriterion extends Partial<IBiddableAdGroupCriterionRaw<'BiddableAdGroupCriterion'>> {}
interface INegativeAdGroupCriterionRaw<Type> extends IAdGroupCriterion<Type> {}
interface INegativeAdGroupCriterion extends Partial<INegativeAdGroupCriterionRaw<'NegativeAdGroupCriterion'>> {}

export {
  IAdGroupCriterion,
  IBiddableAdGroupCriterion,
  IBiddableAdGroupCriterionRaw,
  INegativeAdGroupCriterion,
  INegativeAdGroupCriterionRaw,
};
