import { IBudget } from './Budget';
import { IApiError } from './ApiError';
import { IListReturnValue } from '../../../types/abstract';

export interface IBudgetReturnValue extends IListReturnValue {
  value: IBudget[];
  partialFailureErrors: IApiError[];
}
