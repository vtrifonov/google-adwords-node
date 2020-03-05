import { pd } from 'pretty-data';

import { AdwordsOperationService, SoapService } from '../../core';
import { ISelector } from '../../../types/adwords';
import { IPage } from '../../../types/abstract';
import { IBatchJob } from './BatchJob';

class BatchJobService extends AdwordsOperationService {
  /**
   * https://developers.google.com/adwords/api/docs/appendix/selectorfields#v201809-BatchJobService
   *
   * @private
   * @static
   * @type {string[]}
   * @memberof BatchJobService
   */
  private static readonly selectFields: string[] = ['DownloadUrl', 'Id', 'ProcessingErrors', 'ProgressStats', 'Status'];

  private soapService: SoapService;
  constructor(options: { soapService: SoapService }) {
    super();
    this.soapService = options.soapService;
  }

  public async getAll() {
    const serviceSelector: ISelector = {
      fields: BatchJobService.selectFields,
    };
    return this.get(serviceSelector);
  }

  protected async get<ServiceSelector = ISelector, Rval = IPage<IBatchJob>>(
    serviceSelector: ServiceSelector,
  ): Promise<Rval> {
    return this.soapService.get<ServiceSelector, Rval>(serviceSelector).then((rval) => {
      return rval;
    });
  }
}

export { BatchJobService };
