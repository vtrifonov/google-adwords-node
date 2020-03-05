import { IOperation, PartialAd, IExemptionRequest } from '../../../types/adwords';

export interface IAdOperation extends IOperation<'AdGroupAdOperation'> {
  operand: PartialAd;
  exemptionRequests?: IExemptionRequest[];
  ignorablePolicyTopicIds?: string[];
}
