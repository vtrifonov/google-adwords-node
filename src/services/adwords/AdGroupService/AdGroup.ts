import { ITargetingSetting, IExplorerAutoOptimizerSetting } from './Setting';
import { IAdGroupAdRotationMode } from './AdGroupAdRotationMode';
import { IBiddingStrategyConfiguration } from './BiddingStrategyConfiguration';
import { AdGroupStatus, CriterionTypeGroup, AdGroupType } from '../../../types/enum';
import { ICustomParameters, ITextLabel } from '../../../types/adwords';

interface IAdGroupRaw {
  id: string;
  campaignId: string;
  readonly campaignName: string;
  name: string;
  status: AdGroupStatus;
  settings: Array<ITargetingSetting | IExplorerAutoOptimizerSetting>;
  labels: ITextLabel[];
  /**
   * Note: Starting with v201705, bidding strategies can only be set on campaigns.
   * In earlier versions, bidding strategies can be set on campaigns, ad groups and ad group criteria.
   *
   * @type {IBiddingStrategyConfiguration}
   * @memberof IAdGroupRaw
   */
  biddingStrategyConfiguration: IBiddingStrategyConfiguration;
  contentBidCriterionTypeGroup: CriterionTypeGroup;
  readonly baseCampaignId: string;
  readonly baseAdGroupId: string;
  trackingUrlTemplate: string;
  finalUrlSuffix: string;
  urlCustomParameters: ICustomParameters;
  adGroupType: AdGroupType;
  adGroupAdRotationMode: IAdGroupAdRotationMode;
  // TODO
  // forwardCompatibilityMap
}

interface IAdGroup extends Partial<IAdGroupRaw> {}

export { IAdGroup, IAdGroupRaw };
