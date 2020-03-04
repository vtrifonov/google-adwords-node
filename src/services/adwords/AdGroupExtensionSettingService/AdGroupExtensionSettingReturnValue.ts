import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';
import { IListReturnValue } from '../../../types/abstract';

export interface IAdGroupExtensionSettingReturnValue extends IListReturnValue {
  value: IAdGroupExtensionSetting[];
  // TODO
  partialFailureErrors?: any[];
}
