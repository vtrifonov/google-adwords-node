import { ReportDefinition } from '../ReportDefinitionService';

export interface IReportInfo {
  selectorFields: string[];
  reportName: string;
  reportType: ReportDefinition.ReportType;
  defaultDateRangeType?: ReportDefinition.DateRangeType;
}
