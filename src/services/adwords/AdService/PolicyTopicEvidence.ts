import { PolicyTopicEvidenceType } from './enum/PolicyTopicEvidenceType';
import { PolicyTopicEvidenceDestinationMismatchUrlType } from './enum/PolicyTopicEvidenceDestinationMismatchUrlType';

export interface IPolicyTopicEvidence {
  policyTopicEvidenceType: PolicyTopicEvidenceType;
  evidenceTextList?: string[];
  policyTopicEvidenceDestinationMismatchUrlTypes?: PolicyTopicEvidenceDestinationMismatchUrlType[];
}
