import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector, IPaging } from '../../../types/adwords';
import { Ad, Predicate, Feed, Operator } from '../../../types/enum';
import { IAdGroupExtensionSettingOperation } from './AdGroupExtensionSettingOperation';
import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';
import { IPage, IListReturnValue } from '../../../types/abstract';

interface IAdGroupExtensionSettingServiceOpts {
  soapService: SoapService;
}

class AdGroupExtensionSettingService extends AdwordsOperationService {
  private static readonly selectorFields: string[] = [
    'AdGroupId',
    'ExtensionType',
    'Extensions',
    'PlatformRestrictions',
  ];

  private soapService: SoapService;
  constructor(options: IAdGroupExtensionSettingServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getByAdGroupIds(adGroupIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupExtensionSettingService.selectorFields,
      predicates: [
        {
          field: 'AdGroupId',
          operator: Predicate.Operator.IN,
          values: adGroupIds,
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async getAll(paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdGroupExtensionSettingService.selectorFields,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getByExtensionType(feedType: Feed.Type, paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdGroupExtensionSettingService.selectorFields,
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

  /**
   * add ad group extension setting like sitelink. Support partial failure
   * https://developers.google.com/adwords/api/docs/guides/partial-failure
   *
   * @author vtrifonov
   * @param {(Array<IAdGroupExtensionSetting>)} adGroupExtensionSettings
   * @returns
   * @memberof AdGroupExtensionSettingService
   */
  public async add(adGroupExtensionSettings: IAdGroupExtensionSetting[]) {
    const operaions: IAdGroupExtensionSettingOperation[] = adGroupExtensionSettings.map(
      (adGroupExtensionSetting: IAdGroupExtensionSetting) => {
        const adGroupExtensionSettingOperation: IAdGroupExtensionSettingOperation = {
          operator: Operator.ADD,
          operand: adGroupExtensionSetting,
        };
        return adGroupExtensionSettingOperation;
      },
    );
    return this.mutate(operaions);
  }

  protected async get<ServiceSelector = ISelector, Rval = IPage<IAdGroupExtensionSetting>>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval) => {
      return rval;
    });
  }

  protected async mutate<
    Operation = IAdGroupExtensionSettingOperation,
    Rval = IListReturnValue<IAdGroupExtensionSetting>
  >(operaions: Operation[]): Promise<Rval> {
    return this.soapService
      .mutateAsync<Operation, Rval>(operaions, /** operationType = */ 'AdGroupExtensionSettingOperation')
      .then((rval: Rval) => {
        return rval;
      });
  }
}

export {
  AdGroupExtensionSettingService,
  IAdGroupExtensionSetting,
  IAdGroupExtensionSettingServiceOpts,
  IAdGroupExtensionSettingOperation,
};
