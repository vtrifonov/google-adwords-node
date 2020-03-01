import { IOperation } from '../../../types/adwords';
import { ICampaignExtensionSetting } from './CampaignExtensionSetting';

export interface ICampaignExtensionSettingOperation extends IOperation<'CampaignExtensionSetting'> {
  operand: ICampaignExtensionSetting;
  // TODO:
  exemptionRequests?: any[];
}
