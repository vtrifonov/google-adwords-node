import { ICustomerExtensionSetting } from './EntityExtensionSetting';
import { BaseExtensionSettingService } from './BaseExtensionSettingService';
import { IOperationServiceOptions } from '../../core';

export class CustomerExtensionSettingService extends BaseExtensionSettingService<
  ICustomerExtensionSetting,
  'CustomerExtensionSettingService'
> {
  constructor(options: IOperationServiceOptions) {
    super(options, 'CampaignExtensionSettingOperation');
  }
}
