import { AdGroupAd } from '../../enum';
import { PartialAd } from './Ad';
import { IAdGroupAdPolicySummary } from './PolicySummary';
import { ITextLabel } from '../Label';
import { IString_StringMapEntry } from '../String_StringMapEntry';

interface IAdGroupAd {
  adGroupId: string;
  status?: AdGroupAd.Status;
  ad: PartialAd;
  readonly policySummary?: IAdGroupAdPolicySummary;
  labels?: ITextLabel[];
  readonly baseCampaignId?: string;
  readonly baseAdGroupId?: string;
  forwardCompatibilityMap?: IString_StringMapEntry[];
  readonly adStrengthInfo?: any;
}

export { IAdGroupAd };
