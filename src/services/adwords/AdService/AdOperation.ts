import { IOperation, PartialAd } from '../../../types/adwords';
import { IExemptionRequest } from './ExemptionRequest';

export interface IAdOperation extends IOperation<'AdGroupAdOperation'> {
  operand: PartialAd;
  exemptionRequests?: IExemptionRequest[];
  ignorablePolicyTopicIds?: string[];
}
