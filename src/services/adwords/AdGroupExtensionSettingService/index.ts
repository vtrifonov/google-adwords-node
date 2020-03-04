import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector, Predicate, Operator, IPaging } from '../../../types/adwords';
import { IAdGroupExtensionSettingPage } from './AdGroupExtensionSettingPage';
import { IAdGroupExtensionSettingOperation } from './AdGroupExtensionSettingOperation';
import { IAdGroupExtensionSettingReturnValue } from './AdGroupExtensionSettingReturnValue';
import { IAdGroupExtensionSetting } from './AdGroupExtensionSetting';
import { Feed } from './enum/Feed';

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

  protected async get<ServiceSelector = ISelector, Rval = IAdGroupExtensionSettingPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      return rval;
    });
  }

  protected async mutate<Operation = IAdGroupExtensionSettingOperation, Rval = IAdGroupExtensionSettingReturnValue>(
    operaions: Operation[],
  ): Promise<Rval | undefined> {
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
  IAdGroupExtensionSettingPage,
  IAdGroupExtensionSettingServiceOpts,
  IAdGroupExtensionSettingOperation,
  IAdGroupExtensionSettingReturnValue,
};
