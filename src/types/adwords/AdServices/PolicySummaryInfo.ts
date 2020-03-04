import { IPolicyTopicEntry } from './PolicyTopicEntry';
import { IAttributes } from '../Attributes';
import { PolicySummaryReviewState, PolicySummaryDenormalizedStatus, PolicyApprovalStatus } from '../../enum';

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
