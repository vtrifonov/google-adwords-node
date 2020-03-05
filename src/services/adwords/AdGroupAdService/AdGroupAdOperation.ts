import { IOperation, IExemptionRequest } from '../../../types/adwords';
import { IAdGroupAd } from './AdGroupAd';

export interface IAdGroupAdOperation extends IOperation<'AdGroupAdOperation'> {
  operand: IAdGroupAd;
  exemptionRequests?: IExemptionRequest[];
  ignorablePolicyTopicIds?: string[];
}
