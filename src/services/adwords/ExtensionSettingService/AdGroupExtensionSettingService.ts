import { IAdGroupExtensionSetting } from './EntityExtensionSetting';
import { BaseExtensionSettingService } from './BaseExtensionSettingService';
import { IOperationServiceOptions } from '../../core';

export class AdGroupExtensionSettingService extends BaseExtensionSettingService<
  IAdGroupExtensionSetting,
  'AdGroupExtensionSettingService'
> {
  constructor(options: IOperationServiceOptions) {
    super(options, 'AdGroupExtensionSettingOperation', 'AdGroupId');
  }
}
