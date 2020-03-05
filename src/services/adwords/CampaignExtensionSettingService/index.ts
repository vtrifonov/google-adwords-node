import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector, IPaging } from '../../../types/adwords';
import { Predicate, Feed, Operator } from '../../../types/enum';
import { ICampaignExtensionSettingOperation } from './CampaignExtensionSettingOperation';
import { ICampaignExtensionSetting } from './CampaignExtensionSetting';
import { IPage, IListReturnValue } from '../../../types/abstract';

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

  public async getByExtensionType(feedType: Feed.Type, paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: CampaignExtensionSettingService.selectorFields,
      predicates: [
        {
          field: 'ExtensionType',
          operator: Predicate.Operator.IN,
          values: [feedType],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
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

  protected async get<ServiceSelector = ISelector, Rval = IPage<ICampaignExtensionSetting>>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval) => {
      return rval;
    });
  }

  protected async mutate<
    Operation = ICampaignExtensionSettingOperation,
    Rval = IListReturnValue<ICampaignExtensionSetting>
  >(operaions: Operation[]): Promise<Rval> {
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
  ICampaignExtensionSettingServiceOpts,
  ICampaignExtensionSettingOperation,
};
