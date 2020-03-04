import { PartialExtensionFeedItem } from './ExtensionFeedItem';
import { ExtensionSetting } from '../../../types/enum/ExtensionSetting';

export interface IExtensionSetting {
  extensions: PartialExtensionFeedItem[];
  platformRestrictions: ExtensionSetting.Platform;
}
