import { IListReturnValue } from './abstract/ListReturnValue';
import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';

export interface IAdGroupExtensionSettingReturnValue extends IListReturnValue {
  value: IAdGroupExtensionSetting[];
  // TODO
  partialFailureErrors?: any[];
}
