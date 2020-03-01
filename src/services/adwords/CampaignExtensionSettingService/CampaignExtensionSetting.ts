import { Feed } from './enum/Feed';
import { IExtensionSetting } from './ExtensionSetting';

interface ICampaignExtensionSetting {
  campaignId: number;
  extensionType: Feed.Type;
  extensionSetting: IExtensionSetting;
}

export { ICampaignExtensionSetting };
