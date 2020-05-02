import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import { IReport, IClientReportService, IReportDownloadOptions, IReportService } from '../ReportService';
import { IReportInfo } from './ReportInfo';
import { ReportDefinition } from '../ReportDefinitionService';
import parser from 'xml2json';

export abstract class BaseClientReportService implements IClientReportService {
  private options?: Partial<IReportDownloadOptions> = {
    json: true,
    skipReportHeader: false,
    skipColumnHeader: true,
    skipReportSummary: true,
    useRawEnumValues: true,
    includeZeroImpressions: true,
  };

  constructor(protected readonly reportService: IReportService, protected readonly reportInfo: IReportInfo) {}

  public async get(reportDefinition: Partial<IReportDefinition>): Promise<string | IReport> {
    if (!reportDefinition.selector) {
      reportDefinition.selector = {
        fields: this.reportInfo.selectorFields,
        predicates: reportDefinition.predicates,
        paging: reportDefinition.paging,
        ordering: reportDefinition.ordering,
      };
    } else if (!reportDefinition.selector.fields || reportDefinition.selector.fields.length === 0) {
      reportDefinition.selector.fields = this.reportInfo.selectorFields;
    }

    // delete all undefined fields
    Object.keys(reportDefinition.selector).forEach(
      (key) =>
        reportDefinition.selector &&
        reportDefinition.selector[key] === undefined &&
        delete reportDefinition.selector[key],
    );

    const reportDef: IReportDefinition = {
      // order matters
      selector: reportDefinition.selector,
      reportName: this.reportInfo.reportName,
      reportType: this.reportInfo.reportType,
      dateRangeType: reportDefinition.dateRangeType || ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDef, this.getOptions());
  }

  public setOptions(options: Partial<IReportDownloadOptions>): void {
    this.options = options;
  }

  public getOptions(): Partial<IReportDownloadOptions> | undefined {
    return this.options;
  }

  public xmlToJSONResult<T>(tableResultXML: string): T[] {
    const jsonString = parser.toJson(tableResultXML);
    const jsonResult = JSON.parse(jsonString);
    const rows = jsonResult && jsonResult.report && jsonResult.report.table && jsonResult.report.table.row;
    const result: T[] = [];
    rows && rows.forEach((row) => result.push(row as T));
    return result;
  }
}
