import { ICampaignExtensionSetting } from './CampaignExtensionSetting';
import { IPage } from '../../../types/abstract';

export interface ICampaignExtensionSettingPage extends IPage {
  entries: ICampaignExtensionSetting[];
}
