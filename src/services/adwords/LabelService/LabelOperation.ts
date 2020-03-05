import { IOperation, ITextLabel } from '../../../types/adwords';

export interface ILabelOperation extends IOperation {
  operand: ITextLabel;
}
