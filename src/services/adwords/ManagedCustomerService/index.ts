import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { IManagedCustomer } from './ManagedCustomer';
import { ISelector, IPaging } from '../../../types/adwords';
import { IPage } from '../../../types/abstract';

/**
 * https://developers.google.com/adwords/api/docs/reference/v201809/ManagedCustomerService
 *
 * @author dulin
 * @class ManagedCustomerService
 * @extends {AdwordsOperationService}
 */
class ManagedCustomerService extends BaseService<IManagedCustomer, 'ManagedCustomerService'> {
  public static readonly namespace = 'https://adwords.google.com/api/adwords/mcm';

  constructor(options: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'AdOperation',
      selectorFields: [
        'AccountLabels',
        'CanManageClients',
        'CurrencyCode',
        'CustomerId',
        'DateTimeZone',
        'Name',
        'TestAccount',
      ],
    };
    super(options, serviceInfo);
  }

  public async getAccountHierarchy(): Promise<IPage<IManagedCustomer>> {
    const serviceSelector: ISelector = {
      fields: this.serviceInfo.selectorFields,
    };
    return this.get(serviceSelector);
  }
}

export { ManagedCustomerService };
