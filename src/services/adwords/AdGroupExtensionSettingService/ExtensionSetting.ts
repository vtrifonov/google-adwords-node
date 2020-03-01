import { PartialExtensionFeedItem } from './ExtensionFeedItem';
import { ExtensionSetting } from './enum/ExtensionSetting';

export interface IExtensionSetting {
  extensions: PartialExtensionFeedItem[];
  platformRestrictions: ExtensionSetting.Platform;
}
