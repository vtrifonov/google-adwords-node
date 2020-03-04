import { ICampaignExtensionSetting } from './CampaignExtensionSetting';
import { IListReturnValue } from '../../../types/abstract';

export interface ICampaignExtensionSettingReturnValue extends IListReturnValue {
  value: ICampaignExtensionSetting[];
  // TODO
  partialFailureErrors?: any[];
}
