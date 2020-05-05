import { BaseService, IOperationServiceOptions, IServiceInfo } from '../../core';
import { PartialConversionTracker, IAdWordsConversionTracker, IAppConversion } from './ConversionTracker';
import { KeysEnum } from '../../../types/abstract';
import { ConversionTracker } from '../../../types/enum/ConversionTracker';
import _ from 'lodash';

class ConversionTrackerService extends BaseService<PartialConversionTracker, 'ConversionTrackerService'> {
  public static isAdWordsConversionTracker(operand: PartialConversionTracker): operand is IAdWordsConversionTracker {
    return (
      operand['ConversionTracker.Type'] === ConversionTracker.Type.AdCallMetricsConversion ||
      (!operand['ConversionTracker.Type'] && 'trackingCodeType' in operand)
    );
  }
  public static isAppConversion(operand: PartialConversionTracker): operand is IAppConversion {
    return (
      operand['ConversionTracker.Type'] === ConversionTracker.Type.AppConversion ||
      (!operand['ConversionTracker.Type'] &&
        _.some(['appId', 'appPlatform', 'snippet', 'appConversionType', 'appPostbackUrl'], (prop) => prop in operand))
    );
  }

  private static modifyInputOperand(original: any): any {
    const conversionTrackerKeys: KeysEnum<PartialConversionTracker> = {
      // IConversionTracker
      attributes: false,
      id: true,
      originalConversionTypeId: true,
      name: true,
      status: true,
      category: true,
      googleEventSnippet: true,
      googleGlobalSiteTag: true,
      dataDrivenModelStatus: true,
      conversionTypeOwnerCustomerId: true,
      viewthroughLookbackWindow: true,
      ctcLookbackWindow: true,
      countingType: true,
      defaultRevenueValue: true,
      defaultRevenueCurrencyCode: true,
      alwaysUseDefaultRevenueValue: true,
      excludeFromBidding: true,
      attributionModelType: true,
      mostRecentConversionDate: true,
      lastReceivedRequestTime: true,
      'ConversionTracker.Type': false,
      // IAdCallMetricsConversion && IWebsiteCallMetricsConversion
      phoneCallDuration: true,
      // IAdWordsConversionTracker
      trackingCodeType: true,
      // IAppConversion
      appId: true,
      appPlatform: true,
      snippet: true,
      appConversionType: true,
      appPostbackUrl: true,
      // IUploadConversion
      isExternallyAttributed: true,
    };
    Object.keys(conversionTrackerKeys).forEach((key) => {
      if (!original[key] && conversionTrackerKeys[key]) {
        original[key] = 'any';
      }
    });
    return original;
  }

  constructor(operationServiceOptions: IOperationServiceOptions) {
    const serviceInfo: IServiceInfo = {
      idField: 'Id',
      operationType: 'ConversionTrackerOperation',
      selectorFields: [
        'AlwaysUseDefaultRevenueValue',
        'AppId',
        'AppPlatform',
        'AppPostbackUrl',
        'AttributionModelType',
        'Category',
        'ConversionTypeOwnerCustomerId',
        'CountingType',
        'CtcLookbackWindow',
        'DataDrivenModelStatus',
        'DefaultRevenueCurrencyCode',
        'DefaultRevenueValue',
        'ExcludeFromBidding',
        'GoogleEventSnippet',
        'GoogleGlobalSiteTag',
        'Id',
        'LastReceivedRequestTime',
        'MostRecentConversionDate',
        'Name',
        'OriginalConversionTypeId',
        'PhoneCallDuration',
        'Status',
        'TrackingCodeType',
        'ViewthroughLookbackWindow',
        'WebsitePhoneCallDuration',
      ],
      modifyMutateInputOperand: ConversionTrackerService.modifyInputOperand,
    };
    super(operationServiceOptions, serviceInfo);
  }

  protected setType(operand: PartialConversionTracker) {
    if (operand['ConversionTracker.Type']) {
      operand.attributes = { 'xsi:type': operand['ConversionTracker.Type'] };
    } else if (ConversionTrackerService.isAdWordsConversionTracker(operand)) {
      operand.attributes = { 'xsi:type': ConversionTracker.Type.AdWordsConversionTracker };
    } else if (ConversionTrackerService.isAppConversion(operand)) {
      operand.attributes = { 'xsi:type': ConversionTracker.Type.AppConversion };
    }
    return operand;
  }
}

export { ConversionTrackerService };
export * from './ConversionTracker';
