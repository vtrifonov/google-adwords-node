import { IAdGroup } from './AdGroup';
import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { Ad, Predicate } from '../../../types/enum';
import { IPaging, ISelector } from '../../../types/adwords';
import { IPage } from '../../../types/abstract';
import { ITargetingSetting, IExplorerAutoOptimizerSetting } from './Setting';

class AdGroupService extends BaseService<IAdGroup, 'AdGroupService'> {
  public static isTargetingSetting(
    setting: ITargetingSetting | IExplorerAutoOptimizerSetting,
  ): setting is ITargetingSetting {
    return 'details' in setting;
  }

  public static isExplorerAutoOptimizerSetting(
    setting: ITargetingSetting | IExplorerAutoOptimizerSetting,
  ): setting is IExplorerAutoOptimizerSetting {
    return 'optIn' in setting;
  }

  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'AdGroupOperation',
      selectorFields: [
        'AdGroupType',
        'AdRotationMode',
        'BaseAdGroupId',
        'BaseCampaignId',
        'BiddingStrategyId',
        'BiddingStrategyName',
        'BiddingStrategySource',
        'BiddingStrategyType',
        'CampaignId',
        'CampaignName',
        'ContentBidCriterionTypeGroup',
        'CpcBid',
        'CpmBid',
        'EnhancedCpcEnabled',
        'FinalUrlSuffix',
        'Id',
        'Labels',
        'Name',
        'Settings',
        'Status',
        'TargetCpa',
        'TargetCpaBid',
        'TargetCpaBidSource',
        'TargetRoasOverride',
        'TrackingUrlTemplate',
        'UrlCustomParameters',
      ],
    };
    super(operationServiceOptions, serviceInfo);
  }

  /**
   * get ad groups by campaign ids
   *
   * @author dulin
   * @param {string[]} campaignIds
   * @returns
   * @memberof AdGroupService
   */
  public async getAllByCampaignIds(campaignIds: string[], paging?: IPaging) {
    const predicates = [
      {
        field: 'CampaignId',
        operator: Predicate.Operator.IN,
        values: campaignIds,
      },
    ];
    return this.getByPredicates(predicates);
  }

  public async getNamesByIds(adGroupIds: string[], paging?: IPaging): Promise<IPage<IAdGroup>> {
    const predicates = [
      {
        field: 'Id',
        operator: Predicate.Operator.IN,
        values: adGroupIds,
      },
    ];
    return this.getByPredicates(predicates, paging, ['Id', 'Name']);
  }

  protected needToSetAttribute(operand: IAdGroup) {
    return true;
  }

  protected setType(operand: IAdGroup) {
    if (operand.settings && operand.settings.length) {
      operand.settings.forEach((setting: ITargetingSetting | IExplorerAutoOptimizerSetting) => {
        if (AdGroupService.isTargetingSetting(setting)) {
          setting.attributes = { 'xsi:type': 'TargetingSetting' };
        } else if (AdGroupService.isExplorerAutoOptimizerSetting(setting)) {
          setting.attributes = { 'xsi:type': 'ExplorerAutoOptimizerSetting' };
        }
      });
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

export { AdGroupService };
export * from './AdGroup';
