import { IExtensionSetting } from './ExtensionSetting';
import { Feed } from '../../../types/enum';

interface ICampaignExtensionSetting {
  campaignId: number;
  extensionType: Feed.Type;
  extensionSetting: IExtensionSetting;
}

export { ICampaignExtensionSetting };
