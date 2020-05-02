import xml2js from 'xml2js';
import _ from 'lodash';
import { pd } from 'pretty-data';

import { OptionsWithUri, XMLService, IHttpService } from '../core';
import { ReportDefinition } from './ReportDefinitionService/enum/ReportDefinition';
import { IReportDefinition } from './ReportDefinitionService/ReportDefinition';

interface IReportServiceOpts {
  httpService: IHttpService;
}

interface IReportDownloadOptions {
  json: boolean;
  skipReportHeader: boolean;
  skipColumnHeader: boolean;
  skipReportSummary: boolean;
  useRawEnumValues: boolean;
  includeZeroImpressions: boolean;
}

interface IReportDownloadFormData {
  __rdxml: string;
}

interface IReport {
  'report-name': any;
  'date-range': any;
  table: any;
}

interface IReportService {
  reportDownload(
    reportDefinition: IReportDefinition,
    options?: Partial<IReportDownloadOptions>,
  ): Promise<IReport | string>;
  setVerbose(verbose: boolean): void;
}

interface IClientReportService {
  get(reportDefinition: Partial<IReportDefinition>): ReturnType<IReportService['reportDownload']>;
  setOptions(options: Partial<IReportDownloadOptions>): void;
  getOptions(): Partial<IReportDownloadOptions> | undefined;
}

class ReportService implements IReportService {
  public static readonly URL: string = 'https://adwords.google.com/api/adwords/reportdownload/v201809';

  private verbose: boolean = false;
  private httpService: IHttpService;
  constructor(options: IReportServiceOpts) {
    this.httpService = options.httpService;
  }
  public setVerbose(verbose: boolean) {
    this.verbose = verbose;
  }

  public async reportDownload(
    reportDefinition: IReportDefinition,
    options?: Partial<IReportDownloadOptions>,
  ): Promise<IReport | string> {
    const reportDef = _.defaults(reportDefinition, {
      downloadFormat: ReportDefinition.DownloadFormatType.XML,
    });
    const xml = this.buildObjectToXML<{ reportDefinition: IReportDefinition }>({ reportDefinition: reportDef });
    if (this.verbose) {
      console.log('__rdxml: ', pd.xml(xml));
    }
    const formData: IReportDownloadFormData = { __rdxml: xml };
    const requestOptions: OptionsWithUri = {
      uri: ReportService.URL,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        skipReportHeader: _.get(options, ['skipReportHeader'], false),
        skipColumnHeader: _.get(options, ['skipColumnHeader'], true),
        skipReportSummary: _.get(options, ['skipReportSummary'], true),
        useRawEnumValues: _.get(options, ['useRawEnumValues'], false),
        includeZeroImpressions: _.get(options, ['includeZeroImpressions'], false),
      },
      formData,
    };

    return this.httpService
      .request(requestOptions)
      .then(
        (rval: any): Promise<IReport | string> => {
          if (options && options.json) {
            return this.xmlParse(rval).then(
              (rvalJson: { report: IReport }): IReport => {
                const defaultRvalJson: IReport = { table: {}, 'date-range': [], 'report-name': [] };
                const result = _.get(rvalJson, 'report', defaultRvalJson);
                if (
                  result.table &&
                  result.table.length === 1 &&
                  result.table[0].row &&
                  Array.isArray(result.table[0].row)
                ) {
                  result.table = result.table[0].row;
                  result.table = result.table.map((x) => x.$ || x);
                }

                if (result['date-range'] && result['date-range'].length === 1) {
                  result['date-range'] = result['date-range'][0].$ || result['date-range'][0];
                  result['date-range'] = result['date-range'].name || result['date-range'];
                }

                if (result['report-name'] && result['report-name'].length === 1) {
                  result['report-name'] = result['report-name'][0].$ || result['report-name'][0];
                  result['report-name'] = result['report-name'].date || result['report-name'];
                }

                return result;
              },
            );
          }
          return Promise.resolve(rval);
        },
      )
      .catch((error) => {
        console.log(`reportDefinition: ${JSON.stringify(reportDefinition)}`);
        if (options) {
          console.log(`options: ${JSON.stringify(options)}`);
        }
        return Promise.reject(error);
      });
  }

  private buildObjectToXML<T>(obj: T): string {
    const builder = new xml2js.Builder();
    return builder.buildObject(obj);
  }

  private async xmlParse<Rval = { report: IReport }>(xml: string): Promise<Rval> {
    return XMLService.parseStringPromise<Rval>(xml);
  }
}

export {
  ReportService,
  IReportServiceOpts,
  IReportDownloadOptions,
  IReportDefinition,
  IReport,
  IReportService,
  IClientReportService,
};
