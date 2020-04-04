import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { PartialAdGroupCriterion, IBiddableAdGroupCriterion } from './AdGroupCriterion';
import { CriterionUse, Predicate, Criterion } from '../../../types/enum';
import { IKeyword, PartialCriterion, IGender, IAgeRange, IPaging } from '../../../types/adwords';

class AdGroupCriterionService extends BaseService<PartialAdGroupCriterion, 'AdGroupCriterionService'> {
  public static isBiddableAdGroupCriterion(operand: PartialAdGroupCriterion): operand is IBiddableAdGroupCriterion {
    return operand.criterionUse === CriterionUse.BIDDABLE;
  }

  public static isNegativeAdGroupCriterion(operand: PartialAdGroupCriterion) {
    return operand.criterionUse === CriterionUse.NEGATIVE;
  }
  public static isKeyword(criterion: PartialCriterion): criterion is IKeyword {
    return 'matchType' in criterion;
  }
  public static isGender(criterion: PartialCriterion): criterion is IGender {
    return 'genderType' in criterion;
  }
  public static isAgeRange(criterion: PartialCriterion): criterion is IAgeRange {
    return 'ageRangeType' in criterion;
  }

  constructor(options: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'AdGroupCriterionOperation',
      selectorFields: [
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
      ],
    };
    super(options, serviceInfo);
  }

  public async getByAdGroupIds(adGroupIds: string[], paging?: IPaging) {
    const predicates = [
      {
        field: 'AdGroupId',
        operator: Predicate.Operator.IN,
        values: adGroupIds,
      },
    ];
    return this.getByPredicates(predicates, paging);
  }

  public async getAllByType(criterionType: Criterion.Type, paging?: IPaging) {
    const predicates = [
      {
        field: 'CriteriaType',
        operator: Predicate.Operator.IN,
        values: [criterionType],
      },
    ];
    return this.getByPredicates(predicates, paging);
  }

  public async getKeywordCriterionByAdGroupIds(adGroupIds: string[], paging?: IPaging) {
    const predicates = [
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
    ];
    return this.getByPredicates(predicates, paging);
  }
}

export { AdGroupCriterionService };
export * from './AdGroupCriterion';
