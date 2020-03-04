import { IPolicyTopicEvidence } from './PolicyTopicEvidence';
import { PartialPolicyTopicConstraint } from './PolicyTopicConstraint';
import { PolicyTopicEntryType } from '../../enum';

export interface IPolicyTopicEntry {
  policyTopicEntryType: PolicyTopicEntryType;
  policyTopicEvidences: IPolicyTopicEvidence[];
  policyTopicConstraints: PartialPolicyTopicConstraint[];
  readonly policyTopicId?: string;
  readonly policyTopicName?: string;
  readonly policyTopicHelpCenterUrl?: string;
}
