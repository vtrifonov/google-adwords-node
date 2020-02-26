import { PolicyTopicEntryType } from './enum/PolicyTopicEntryType';
import { IPolicyTopicEvidence } from './PolicyTopicEvidence';
import { PartialPolicyTopicConstraint } from './PolicyTopicConstraint';

export interface IPolicyTopicEntry {
  policyTopicEntryType: PolicyTopicEntryType;
  policyTopicEvidences: IPolicyTopicEvidence[];
  policyTopicConstraints: PartialPolicyTopicConstraint[];
  readonly policyTopicId?: string;
  readonly policyTopicName?: string;
  readonly policyTopicHelpCenterUrl?: string;
}
