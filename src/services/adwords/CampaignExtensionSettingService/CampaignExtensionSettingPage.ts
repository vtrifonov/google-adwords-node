import { IPage } from './abstract/Page';
import { ICampaignExtensionSetting } from './CampaignExtensionSetting';

export interface ICampaignExtensionSettingPage extends IPage {
  entries: ICampaignExtensionSetting[];
}
