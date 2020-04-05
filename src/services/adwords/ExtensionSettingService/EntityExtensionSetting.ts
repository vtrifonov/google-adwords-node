import { IExtensionSetting } from './ExtensionSetting';
import { Feed } from '../../../types/enum';

interface IEntityExtensionSetting {
  extensionType: Feed.Type;
  extensionSetting: IExtensionSetting;
}

interface IAdGroupExtensionSetting extends IEntityExtensionSetting {
  adGroupId: number;
}

interface ICampaignExtensionSetting extends IEntityExtensionSetting {
  campaignId: number;
}

interface ICustomerExtensionSetting extends IEntityExtensionSetting {}

export { IAdGroupExtensionSetting, ICampaignExtensionSetting, ICustomerExtensionSetting, IEntityExtensionSetting };
