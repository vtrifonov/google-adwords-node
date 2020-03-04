import { PolicyTopicEvidenceType, PolicyTopicEvidenceDestinationMismatchUrlType } from '../../enum';

export interface IPolicyTopicEvidence {
  policyTopicEvidenceType: PolicyTopicEvidenceType;
  evidenceTextList?: string[];
  policyTopicEvidenceDestinationMismatchUrlTypes?: PolicyTopicEvidenceDestinationMismatchUrlType[];
}
