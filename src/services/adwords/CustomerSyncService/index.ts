import { AdwordsOperationService, IOperationServiceOptions } from '../../core';
import { ISelector, IPaging } from '../../../types/adwords';
import { ICustomerChangeData } from './CustomerChangeData';
import { IDateTimeRange } from './DateTimeRange';
import { ICustomerSyncSelector } from './CustomerSyncSelector';
import moment from 'moment';
import 'moment-timezone';
import { ICheckEntities } from './CheckEntities';

class CustomerSyncService extends AdwordsOperationService {
  public static readonly namespace = 'https://adwords.google.com/api/adwords/ch';
  /**
   * https://developers.google.com/adwords/api/docs/reference/v201809/CustomerSyncService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof CustomerSyncService
   */
  private static readonly selectorFields: string[] = ['dateTimeRange', 'campaignIds', 'feedIds'];
  protected readonly operationServiceOptions: IOperationServiceOptions;
  constructor(operationServiceOptions: IOperationServiceOptions) {
    super();
    this.operationServiceOptions = operationServiceOptions;
  }

  public async getChanges(
    startDate: Date,
    endDate: Date,
    checkEntities: ICheckEntities,
    paging?: IPaging,
  ): Promise<ICustomerChangeData> {
    const dateTimeRange: IDateTimeRange = {
      min: this.getStringDate(startDate),
      max: this.getStringDate(endDate),
    };
    const serviceSelector: ICustomerSyncSelector = {
      dateTimeRange,
      campaignIds: checkEntities.campaignIds || [],
      feedIds: checkEntities.feedIds || [],
      fields: CustomerSyncService.selectorFields,
      paging,
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Rval = ICustomerChangeData>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval> {
    return this.operationServiceOptions.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval) => {
      return rval;
    });
  }

  private getStringDate(date: Date): string {
    return `${moment(date).format('YYYYMMDD HHmmss')} ${moment.tz.guess()}`;
  }
}

export { CustomerSyncService };
