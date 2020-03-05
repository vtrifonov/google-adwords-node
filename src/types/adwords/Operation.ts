import { IAttributes } from './Attributes';
import { Operator } from '../enum';
import { IExemptionRequest } from './ExemptionRequest';

export interface IOperation<T, Type = any> extends IAttributes<Type> {
  operand: T;
  operator: Operator;
  exemptionRequests?: IExemptionRequest[];
  ignorablePolicyTopicIds?: string[];
  'Operation.Type'?: string;
}
