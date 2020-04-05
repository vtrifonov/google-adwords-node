import { ICampaignExtensionSetting } from './EntityExtensionSetting';
import { BaseExtensionSettingService } from './BaseExtensionSettingService';
import { IOperationServiceOptions } from '../../core';

export class CampaignExtensionSettingService extends BaseExtensionSettingService<
  ICampaignExtensionSetting,
  'CampaignExtensionSettingService'
> {
  constructor(options: IOperationServiceOptions) {
    super(options, 'CampaignExtensionSettingOperation', 'CampaignId');
  }
}
