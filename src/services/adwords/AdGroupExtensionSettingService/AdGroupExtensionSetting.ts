import { Feed } from './enum/Feed';
import { IExtensionSetting } from './ExtensionSetting';

interface IAdGroupExtensionSetting {
  adGroupId: number;
  extensionType: Feed.Type;
  extensionSetting: IExtensionSetting;
}

export { IAdGroupExtensionSetting };
