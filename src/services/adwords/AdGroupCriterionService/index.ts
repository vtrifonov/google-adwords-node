import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { PartialAdGroupCriterion, IBiddableAdGroupCriterion } from './AdGroupCriterion';
import { CriterionUse, Predicate, Criterion, Operator } from '../../../types/enum';
import { IKeyword, PartialCriterion, IGender, IAgeRange, IPaging, IOperation } from '../../../types/adwords';
import { IListReturnValue, KeysEnum } from '../../..';

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

  private static modifyInputOperand(original: any): any {
    const adGroupCriterionKeys: KeysEnum<PartialAdGroupCriterion> = {
      // IAdGroupCriterion
      attributes: false,
      adGroupId: true,
      criterionUse: true,
      criterion: true,
      labels: true,
      forwardCompatibilityMap: true,
      baseCampaignId: true,
      baseAdGroupId: true,
      'AdGroupCriterion.Type': false,
      // IBiddableAdGroupCriterion
      userStatus: true,
      systemServingStatus: true,
      approvalStatus: true,
      disapprovalReasons: true,
      firstPageCpc: true,
      topOfPageCpc: true,
      firstPositionCpc: true,
      qualityInfo: true,
      biddingStrategyConfiguration: true,
      bidModifier: true,
      finalUrls: true,
      finalMobileUrls: true,
      finalAppUrls: true,
      trackingUrlTemplate: true,
      finalUrlSuffix: true,
      urlCustomParameters: true,
    };
    Object.keys(adGroupCriterionKeys).forEach((key) => {
      if (!original[key] && adGroupCriterionKeys[key]) {
        original[key] = 'any';
      }
    });
    return original;
  }

  constructor(operationServiceOptions: IOperationServiceOptions) {
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
      modifyMutateInputOperand: AdGroupCriterionService.modifyInputOperand,
    };
    super(operationServiceOptions, serviceInfo);
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

  public async updateKeywords(
    adGroupCriterionIds: string[],
    updateAction: (keywordCriterion: IBiddableAdGroupCriterion) => void,
  ): Promise<IListReturnValue<PartialAdGroupCriterion>> {
    const adGroupCriterions = await (await this.getByIds(adGroupCriterionIds)).entries;
    if (!adGroupCriterions) {
      throw new Error('AdGroupCriterions with the given Ids were not found');
    }

    const keywordCriterions = adGroupCriterions.filter(
      (x) => x.criterionUse === CriterionUse.BIDDABLE && x.criterion && x.criterion.type === Criterion.Type.KEYWORD,
    );

    if (!keywordCriterions || keywordCriterions.length === 0) {
      return Promise.resolve({
        value: [],
        partialFailureErrors: [new Error('No Keywords in the list')],
      });
    }

    keywordCriterions.forEach((adGroupCriterion) => {
      const keywordCriterion = adGroupCriterion as IBiddableAdGroupCriterion;
      delete keywordCriterion.biddingStrategyConfiguration;
      updateAction(keywordCriterion);
    });

    const operations = keywordCriterions.map((operand) => {
      const updateOperation: IOperation<PartialAdGroupCriterion, 'AdGroupCriterionService'> = {
        operator: Operator.ADD,
        operand,
      };
      return updateOperation;
    });

    return await this.mutate(operations);
  }
}

export { AdGroupCriterionService };
export * from './AdGroupCriterion';
