import { IAttributes } from './Attributes';
import { Operator } from '../enum';

interface IOperation<Type = any> extends IAttributes<Type> {
  operator: Operator;
  'Operation.Type'?: string;
}

interface IBaseOperation<T, Type = any> extends IOperation<Type> {
  operand: T;
}

export { IOperation, IBaseOperation };
