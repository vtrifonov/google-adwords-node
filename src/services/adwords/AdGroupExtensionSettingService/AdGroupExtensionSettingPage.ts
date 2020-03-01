import { IPage } from './abstract/Page';
import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';

export interface IAdGroupExtensionSettingPage extends IPage {
  entries: IAdGroupExtensionSetting[];
}
