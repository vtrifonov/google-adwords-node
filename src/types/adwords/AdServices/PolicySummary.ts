import { IPolicyTopicEntry } from './PolicyTopicEntry';
import { PolicySummaryReviewState, PolicySummaryDenormalizedStatus, PolicyApprovalStatus } from '../../enum';

interface IPolicySummary {
  policyTopicEntries: IPolicyTopicEntry[];
  reviewState: PolicySummaryReviewState;
  denormalizedStatus: PolicySummaryDenormalizedStatus;
  combinedApprovalStatus: PolicyApprovalStatus;
}

interface IAdGroupAdPolicySummary extends IPolicySummary {}

interface IFeedItemPolicySummary extends IPolicySummary {}

export { IPolicySummary, IAdGroupAdPolicySummary, IFeedItemPolicySummary };
