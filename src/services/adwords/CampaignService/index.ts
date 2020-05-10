import _ from 'lodash';

import { SoapService, BaseService, IServiceInfo, IOperationServiceOptions } from '../../core';
import { ISelector, IPaging, IOperation } from '../../../types/adwords';
import { Predicate, Operator } from '../../../types/enum';
import { AdwordsOperationService } from '../../core/AdwordsOperationService';
import { ICampaign } from './Campaign';
import { CampaignStatus } from './enum/CampaignStatus';
import { ServingStatus } from './enum/ServingStatus';
import { ICampaignLabel } from './CampaignLabel';
import { IListReturnValue, IPage } from '../../../types/abstract';

interface ICampaignServiceOpts {
  soapService: SoapService;
}

class CampaignService extends BaseService<ICampaign, 'CampaignService'> {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-CampaignService
   *
   * @private
   * @static
   * @memberof CampaignService
   */
  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'CampaignOperation',
      selectorFields: [
        'AdServingOptimizationStatus',
        'AdvertisingChannelSubType',
        'AdvertisingChannelType',
        'Amount',
        'AppId',
        'AppVendor',
        'BaseCampaignId',
        'BiddingStrategyGoalType',
        'BiddingStrategyId',
        'BiddingStrategyName',
        'BiddingStrategyType',
        'BudgetId',
        'BudgetName',
        'BudgetReferenceCount',
        'BudgetStatus',
        'CampaignGroupId',
        'CampaignTrialType',
        'DeliveryMethod',
        'Eligible',
        'EndDate',
        'EnhancedCpcEnabled',
        'FinalUrlSuffix',
        'FrequencyCapMaxImpressions',
        'Id',
        'IsBudgetExplicitlyShared',
        'Labels',
        'Level',
        'MaximizeConversionValueTargetRoas',
        'Name',
        'RejectionReasons',
        'SelectiveOptimization',
        'ServingStatus',
        'Settings',
        'StartDate',
        'Status',
        'TargetContentNetwork',
        'TargetCpa',
        'TargetCpaMaxCpcBidCeiling',
        'TargetCpaMaxCpcBidFloor',
        'TargetGoogleSearch',
        'TargetPartnerSearchNetwork',
        'TargetRoas',
        'TargetRoasBidCeiling',
        'TargetRoasBidFloor',
        'TargetSearchNetwork',
        'TargetSpendBidCeiling',
        'TargetSpendSpendTarget',
        'TimeUnit',
        'TrackingUrlTemplate',
        'UrlCustomParameters',
        'VanityPharmaDisplayUrlMode',
        'VanityPharmaText',
        'ViewableCpmEnabled',
      ],
    };
    super(operationServiceOptions, serviceInfo);
  }

  /**
   * get all enabled campaigns
   *
   * @author dulin
   * @returns
   * @memberof CampaignService
   */
  public async getAllEnabled() {
    const serviceSelector: ISelector = {
      fields: ['Id', 'BudgetId', 'Name'],
      predicates: [
        {
          field: 'ServingStatus',
          operator: Predicate.Operator.IN,
          values: [ServingStatus.SERVING],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  /**
   * get all campaigns but removed
   *
   * @author dulin
   * @returns
   * @memberof CampaignService
   */
  public async getAllButRemoved() {
    const serviceSelector: ISelector = {
      fields: ['Id', 'BudgetId', 'Name'],
      predicates: [
        {
          field: 'Status',
          operator: Predicate.Operator.NOT_IN,
          values: [CampaignStatus.REMOVED],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  public async addLabel(campaignLabel: ICampaignLabel) {
    // TODO: validate campaignLabel
    const operations: Array<IOperation<ICampaignLabel, 'CampaignLabelOperation'>> = [
      {
        operator: Operator.ADD,
        operand: campaignLabel,
      },
    ];
    return this.mutateLabelAsync(operations);
  }

  protected async mutateLabelAsync<
    Operation = IOperation<ICampaignLabel, 'CampaignLabelOperation'>,
    Rval = IListReturnValue<ICampaignLabel>
  >(operations: Operation[]) {
    return this.operationServiceOptions.soapService
      .mutateLabelAsync<Operation, Rval>(operations, 'CampaignLabelOperation')
      .then((rval: Rval) => {
        return rval;
      });
  }

  protected setType(operand: ICampaign) {
    if (operand.settings) {
      operand.settings.attributes = {
        'xsi:type': 'GeoTargetTypeSetting',
      };
    }
    if (
      operand.biddingStrategyConfiguration &&
      operand.biddingStrategyConfiguration.bids &&
      operand.biddingStrategyConfiguration.bids.length
    ) {
      let { bids } = operand.biddingStrategyConfiguration;
      bids = bids.map((bid: any) => {
        bid.attributes = {
          'xsi:type': bid['Bids.Type'],
        };
        delete bid['Bids.Type'];
        return bid;
      });
      operand.biddingStrategyConfiguration.bids = bids;
    }
    return operand;
  }
}

export { CampaignService, ICampaignServiceOpts };
export * from './Budget';
export * from './Campaign';
export * from './enum/CampaignStatus';
export * from './enum/AdvertisingChannelType';
export * from './enum/ServingStatus';
