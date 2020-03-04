import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';
import { IPage } from '../../../types/abstract';

export interface IAdGroupExtensionSettingPage extends IPage {
  entries: IAdGroupExtensionSetting[];
}
