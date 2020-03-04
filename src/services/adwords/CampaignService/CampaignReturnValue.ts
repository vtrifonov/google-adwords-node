import { ICampaign } from './Campaign';
import { IApiError } from './ApiError';
import { IListReturnValue } from '../../../types/abstract';

export interface ICampaignReturnValue extends IListReturnValue {
  value: ICampaign[];
  partialFailureErrors?: IApiError[];
}
