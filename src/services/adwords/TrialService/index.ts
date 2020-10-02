import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { ITrial } from './Trial';

class TrialService extends BaseService<ITrial, 'TrialService'> {
  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'TrialServiceOperation',
      selectorFields: [
        'BaseCampaignId',
        'DraftId',
        'EndDate',
        'Id',
        'Name',
        'StartDate',
        'Status',
        'TrafficSplitPercent',
        'TrafficSplitType',
        'TrialCampaignId',
      ],
    };
    super(operationServiceOptions, serviceInfo);
  }
}

export { TrialService };
export * from './Trial';
