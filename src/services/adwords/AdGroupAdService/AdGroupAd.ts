import { AdGroupAd } from '../../../types/enum';
import { IExpandedTextAd, IResponsiveDisplayAd, ITextLabel, ITextAd, IImageAd } from '../../../types/adwords';

interface IAdGroupAd {
  adGroupId: string;
  status?: AdGroupAd.Status;
  // TODO:
  ad: Partial<IExpandedTextAd | IResponsiveDisplayAd | ITextAd | IImageAd>;
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
