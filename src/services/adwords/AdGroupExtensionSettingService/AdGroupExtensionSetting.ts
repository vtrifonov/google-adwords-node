import { IExtensionSetting } from './ExtensionSetting';
import { Feed } from '../../../types/enum';

interface IAdGroupExtensionSetting {
  adGroupId: number;
  extensionType: Feed.Type;
  extensionSetting: IExtensionSetting;
}

export { IAdGroupExtensionSetting };
