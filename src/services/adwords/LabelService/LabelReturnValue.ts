import { IListReturnValue } from '../../../types/abstract';
import { ITextLabel } from '../../../types/adwords';

export interface ILabelReturnValue extends IListReturnValue {
  value: ITextLabel[];
}
