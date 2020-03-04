import { IAttributes } from './Attributes';
import { Operator } from '../enum';

interface IOperation<Type = any> extends IAttributes<Type> {
  operator: Operator;
  'Operation.Type'?: string;
}

export { IOperation };
