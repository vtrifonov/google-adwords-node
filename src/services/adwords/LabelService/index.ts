import { pd } from 'pretty-data';
import _ from 'lodash';

import { AdwordsOperationService } from '../../core/AdwordsOperationService';
import { SoapService } from '../../core';
import { ILabelPage } from './LabelPage';
import { ILabelOperation } from './LabelOperation';
import { ILabelReturnValue } from './LabelReturnValue';
import { ISelector, ITextLabel } from '../../../types/adwords';
import { Operator, Label } from '../../../types/enum';

interface ILabelServiceOpts {
  soapService: SoapService;
}

/**
 * https://support.google.com/google-ads/answer/2475865?hl=zh-Hans
 * https://support.google.com/google-ads/answer/7486653
 *
 * @author dulin
 * @class LabelService
 * @extends {AdwordsOperationService}
 */
class LabelService extends AdwordsOperationService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-LabelService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof LabelService
   */
  private static readonly selectorFields: string[] = ['LabelAttribute', 'LabelId', 'LabelName', 'LabelStatus'];

  private soapService: SoapService;
  constructor(options: ILabelServiceOpts) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: LabelService.selectorFields,
    };
    return this.get(serviceSelector);
  }

  public async add(label: ITextLabel) {
    // TODO: validate label
    const defaultLabel: ITextLabel = {
      attributes: {
        'xsi:type': Label.Type.TextLabel,
      },
    };
    const operaitons: ILabelOperation[] = [
      {
        operator: Operator.ADD,
        operand: _.defaultsDeep(label, defaultLabel),
      },
    ];
    return this.mutate(operaitons);
  }

  protected async get<ServiceSelector = ISelector, Rval = ILabelPage>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval | undefined> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval: Rval | undefined) => {
      return rval;
    });
  }

  protected async mutate<Operation = ILabelOperation, Rval = ILabelReturnValue>(
    operaitons: Operation[],
  ): Promise<Rval | undefined> {
    return this.soapService.mutateAsync<Operation, Rval>(operaitons).then((rval: Rval | undefined) => {
      return rval;
    });
  }
}

export { LabelService, ILabelServiceOpts };
