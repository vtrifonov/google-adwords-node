import { IListReturnValue } from './abstract/ListReturnValue';
import { ICampaignExtensionSetting } from './CampaignExtensionSetting';

export interface ICampaignExtensionSettingReturnValue extends IListReturnValue {
  value: ICampaignExtensionSetting[];
  // TODO
  partialFailureErrors?: any[];
}
