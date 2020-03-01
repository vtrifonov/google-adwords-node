import { IOperation } from '../../../types/adwords';
import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';

export interface IAdGroupExtensionSettingOperation extends IOperation<'AdGroupExtensionSetting'> {
  operand: IAdGroupExtensionSetting;
  // TODO:
  exemptionRequests?: any[];
}
