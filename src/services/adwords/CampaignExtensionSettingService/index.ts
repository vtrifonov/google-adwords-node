import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector, Predicate, Operator, IPaging } from '../../../types/adwords';
import { ICampaignExtensionSettingPage } from './CampaignExtensionSettingPage';
import { ICampaignExtensionSettingOperation } from './CampaignExtensionSettingOperation';
import { ICampaignExtensionSettingReturnValue } from './CampaignExtensionSettingReturnValue';
import { ICampaignExtensionSetting } from './CampaignExtensionSetting';

interface ICampaignExtensionSettingServiceOpts {
  soapService: SoapService;
}

class CampaignExtensionSettingService extends AdwordsOperationService {
  private static readonly selectorFields: string[] = [
    'CampaignId',
    'ExtensionType',
    'Extensions',
    'PlatformRestrictions',
  ];

  private soapService: SoapService;
  constructor(options: ICampaignExtensionSettingServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getByCampaignIds(campaignIds: string[]) {
    const serviceSelector: ISelector = {
      fields: CampaignExtensionSettingService.selectorFields,
      predicates: [
        {
          field: 'CampaignId',
          operator: Predicate.Operator.IN,
          values: campaignIds,
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async getAll(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: CampaignExtensionSettingService.selectorFields,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  /**
   * add ad group extension setting like sitelink. Support partial failure
   * https://developers.google.com/adwords/api/docs/guides/partial-failure
   *
   * @author vtrifonov
   * @param {(Array<ICampaignExtensionSetting>)} campaignExtensionSettings
   * @returns
   * @memberof CampaignExtensionSettingService
   */
  public async add(campaignExtensionSettings: ICampaignExtensionSetting[]) {
    const operaions: ICampaignExtensionSettingOperation[] = campaignExtensionSettings.map(
      (campaignExtensionSetting: ICampaignExtensionSetting) => {
        const campaignExtensionSettingOperation: ICampaignExtensionSettingOperation = {
          operator: Operator.ADD,
          operand: campaignExtensionSetting,
        };
        return campaignExtensionSettingOperation;
      },
    );
    return this.mutate(operaions);
  }

  protected async get<ServiceSelector = ISelector, Rval = ICampaignExtensionSettingPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      return rval;
    });
  }

  protected async mutate<Operation = ICampaignExtensionSettingOperation, Rval = ICampaignExtensionSettingReturnValue>(
    operaions: Operation[],
  ): Promise<Rval | undefined> {
    return this.soapService
      .mutateAsync<Operation, Rval>(operaions, /** operationType = */ 'CampaignExtensionSettingOperation')
      .then((rval: Rval) => {
        return rval;
      });
  }
}

export {
  CampaignExtensionSettingService,
  ICampaignExtensionSetting,
  ICampaignExtensionSettingPage,
  ICampaignExtensionSettingServiceOpts,
  ICampaignExtensionSettingOperation,
  ICampaignExtensionSettingReturnValue,
};
