import { AdGroupAd } from '../../../types/enum';
import { IExpandedTextAd, IResponsiveDisplayAd, ITextLabel } from '../../../types/adwords';

interface IAdGroupAd {
  adGroupId: string;
  status?: AdGroupAd.Status;
  // TODO:
  ad: Partial<IExpandedTextAd | IResponsiveDisplayAd>;
  // TODO
  readonly policySummary?: any;
  labels?: ITextLabel[];
  readonly baseCampaignId?: string;
  readonly baseAdGroupId?: string;
  // TODO
  // forwardCompatibilityMap: any;
  readonly adStrengthInfo?: any;
}

export { IAdGroupAd };
