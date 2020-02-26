import { IAttributes } from './../../../types/adwords/Attributes';
import { IPolicyTopicEntry } from './PolicyTopicEntry';
import { PolicySummaryReviewState } from './enum/PolicySummaryReviewState';
import { PolicySummaryDenormalizedStatus } from './enum/PolicySummaryDenormalizedStatus';
import { PolicyApprovalStatus } from './enum/PolicyApprovalStatus';

interface IPolicySummaryInfoRaw<Type> extends IAttributes<Type> {
  policyTopicEntries: IPolicyTopicEntry[];
  reviewState: PolicySummaryReviewState;
  denormalizedStatus: PolicySummaryDenormalizedStatus;
  combinedApprovalStatus: PolicyApprovalStatus;
  'PolicySummaryInfo.Type': string;
}

interface IPolicySummaryInfo<Type = ''> extends Partial<IPolicySummaryInfoRaw<Type>> {}

interface IAssetPolicySummaryInfo extends Partial<IPolicySummaryInfo<'AssetPolicySummaryInfo'>> {}

type PartialPolicySummaryInfo = Partial<IAssetPolicySummaryInfo | IPolicySummaryInfo>;

export { IPolicySummaryInfo, IPolicySummaryInfoRaw, IAssetPolicySummaryInfo, PartialPolicySummaryInfo };
