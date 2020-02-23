import { IOperation } from '../../../types/adwords';
import { PartialAd } from './Ad';
import { IExemptionRequest } from './ExemptionRequest';

export interface IAdOperation extends IOperation<'AdGroupAdOperation'> {
  operand: PartialAd;
  exemptionRequests?: IExemptionRequest[];
  ignorablePolicyTopicIds?: string[];
}
