import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector, IPaging, IKeyword, IGender, IAgeRange } from '../../../types/adwords';
import { Ad, Predicate, Criterion, CriterionUse, Operator } from '../../../types/enum';
import { IAdGroupCriterionOperation } from './AdGroupCriterionOperation';
import { IBiddableAdGroupCriterion, INegativeAdGroupCriterion } from './AdGroupCriterion';
import { IPage, IListReturnValue } from '../../../types/abstract';

interface IAdGroupCriterionServiceOpts {
  soapService: SoapService;
}

class AdGroupCriterionService extends AdwordsOperationService {
  public static setType(operand: IBiddableAdGroupCriterion | INegativeAdGroupCriterion) {
    if (AdGroupCriterionService.isBiddableAdGroupCriterion(operand)) {
      operand.attributes = { 'xsi:type': 'BiddableAdGroupCriterion' };
    } else if (AdGroupCriterionService.isNegativeAdGroupCriterion(operand)) {
      operand.attributes = { 'xsi:type': 'NegativeAdGroupCriterion' };
    }
    if (operand.criterion) {
      if (AdGroupCriterionService.isKeyword(operand.criterion)) {
        operand.criterion.attributes = { 'xsi:type': 'Keyword' };
      } else if (AdGroupCriterionService.isGender(operand.criterion)) {
        operand.criterion.attributes = { 'xsi:type': 'Gender' };
      } else if (AdGroupCriterionService.isAgeRange(operand.criterion)) {
        operand.criterion.attributes = { 'xsi:type': 'AgeRange' };
      }
    }
    return operand;
  }
  public static isBiddableAdGroupCriterion(
    operand: IBiddableAdGroupCriterion | INegativeAdGroupCriterion,
  ): operand is IBiddableAdGroupCriterion {
    return operand.criterionUse === CriterionUse.BIDDABLE;
  }
  public static isNegativeAdGroupCriterion(operand: IBiddableAdGroupCriterion | INegativeAdGroupCriterion) {
    return operand.criterionUse === CriterionUse.NEGATIVE;
  }
  public static isKeyword(criterion: IKeyword | IGender | IAgeRange): criterion is IKeyword {
    return 'matchType' in criterion;
  }
  public static isGender(criterion: IKeyword | IGender | IAgeRange): criterion is IGender {
    return 'genderType' in criterion;
  }
  public static isAgeRange(criterion: IKeyword | IGender | IAgeRange): criterion is IAgeRange {
    return 'ageRangeType' in criterion;
  }

  private static readonly selectorFields: string[] = [
    'AdGroupId',
    'AgeRangeType',
    'AppId',
    'AppPaymentModelType',
    'ApprovalStatus',
    'BaseAdGroupId',
    'BaseCampaignId',
    'BidModifier',
    'BiddingStrategyId',
    'BiddingStrategyName',
    'BiddingStrategySource',
    'BiddingStrategyType',
    'CaseValue',
    'ChannelId',
    'ChannelName',
    'CpcBid',
    'CpcBidSource',
    'CpmBid',
    'CpmBidSource',
    'CriteriaCoverage',
    'CriteriaSamples',
    'CriteriaType',
    'CriterionUse',
    'CustomAffinityId',
    'CustomIntentId',
    'DisapprovalReasons',
    'DisplayName',
    'EnhancedCpcEnabled',
    'FinalAppUrls',
    'FinalMobileUrls',
    'FinalUrlSuffix',
    'FinalUrls',
    'FirstPageCpc',
    'FirstPositionCpc',
    'GenderType',
    'Id',
    'IncomeRangeType',
    'KeywordMatchType',
    'KeywordText',
    'Labels',
    'MobileAppCategoryId',
    'Parameter',
    'ParentCriterionId',
    'ParentType',
    'PartitionType',
    'Path',
    'PlacementUrl',
    'QualityScore',
    'Status',
    'SystemServingStatus',
    'TopOfPageCpc',
    'TrackingUrlTemplate',
    'UrlCustomParameters',
    'UserInterestId',
    'UserInterestName',
    'UserInterestParentId',
    'UserListEligibleForDisplay',
    'UserListEligibleForSearch',
    'UserListId',
    'UserListMembershipStatus',
    'UserListName',
    'VerticalId',
    'VerticalParentId',
    'VideoId',
    'VideoName',
  ];

  private soapService: SoapService;
  constructor(options: IAdGroupCriterionServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getByAdGroupIds(adGroupIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupCriterionService.selectorFields,
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
      fields: AdGroupCriterionService.selectorFields,
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getAllByType(criterionType: Criterion.Type, paging?: IPaging) {
    const serviceSelector: ISelector = {
      fields: AdGroupCriterionService.selectorFields,
      predicates: [
        {
          field: 'CriteriaType',
          operator: Predicate.Operator.IN,
          values: [criterionType],
        },
      ],
    };
    if (paging) {
      serviceSelector.paging = paging;
    }
    return this.get(serviceSelector);
  }

  public async getKeywordCriterionByAdGroupIds(adGroupIds: string[]) {
    const serviceSelector: ISelector = {
      fields: AdGroupCriterionService.selectorFields,
      predicates: [
        {
          field: 'AdGroupId',
          operator: Predicate.Operator.IN,
          values: adGroupIds,
        },
        {
          field: 'CriteriaType',
          operator: Predicate.Operator.EQUALS,
          values: [Criterion.Type.KEYWORD],
        },
      ],
    };
    return this.get(serviceSelector);
  }

  /**
   * add ad group criterion such as Keyword, Gender. Support partial failure
   * https://developers.google.com/adwords/api/docs/guides/partial-failure
   *
   * @author dulin
   * @param {(Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>)} adGroupCriterions
   * @returns
   * @memberof AdGroupCriterionService
   */
  public async add(adGroupCriterions: Array<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>) {
    const operaions: IAdGroupCriterionOperation[] = adGroupCriterions.map(
      (adGroupCriterion: IBiddableAdGroupCriterion | INegativeAdGroupCriterion) => {
        const adGroupCriterionOperation: IAdGroupCriterionOperation = {
          operator: Operator.ADD,
          operand: AdGroupCriterionService.setType(adGroupCriterion),
        };
        return adGroupCriterionOperation;
      },
    );
    return this.mutate(operaions);
  }

  protected async get<ServiceSelector = ISelector, Rval = IPage<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval) => {
      return rval;
    });
  }

  protected async mutate<
    Operation = IAdGroupCriterionOperation,
    Rval = IListReturnValue<IBiddableAdGroupCriterion | INegativeAdGroupCriterion>
  >(operaions: Operation[]): Promise<Rval> {
    return this.soapService
      .mutateAsync<Operation, Rval>(operaions, /** operationType = */ 'AdGroupCriterionOperation')
      .then((rval: Rval) => {
        return rval;
      });
  }
}

export {
  AdGroupCriterionService,
  IAdGroupCriterionServiceOpts,
  Criterion,
  IAdGroupCriterionOperation,
  IBiddableAdGroupCriterion,
  INegativeAdGroupCriterion,
};
