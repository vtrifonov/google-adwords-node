import { IDateTimeRange } from './DateTimeRange';
import { ISelector } from '../../../types/adwords';

export interface ICustomerSyncSelector extends ISelector {
  dateTimeRange: IDateTimeRange;
  campaignIds?: string[];
  feedIds?: string[];
}
