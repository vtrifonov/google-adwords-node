import { ICampaignLabel } from './CampaignLabel';
import { IApiError } from './ApiError';
import { IListReturnValue } from '../../../types/abstract';

export interface ICampaignLabelReturnValue extends IListReturnValue {
  value: ICampaignLabel[];
  partialFailureErrors?: IApiError[];
}
