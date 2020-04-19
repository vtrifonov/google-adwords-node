import { ICampaignExtensionSetting } from './EntityExtensionSetting';
import { BaseExtensionSettingService } from './BaseExtensionSettingService';
import { IOperationServiceOptions } from '../../core';

export class CampaignExtensionSettingService extends BaseExtensionSettingService<
  ICampaignExtensionSetting,
  'CampaignExtensionSettingService'
> {
  constructor(operationServiceOptions: IOperationServiceOptions) {
    super(operationServiceOptions, 'CampaignExtensionSettingOperation', 'CampaignId');
  }
}
