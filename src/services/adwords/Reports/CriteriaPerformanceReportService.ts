import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class CriteriaPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Criteria Performance Report';
  private static readonly attributes: string[] = [
    'CampaignId',
    'AdGroupId',
    'Id',
    'Criteria',
    'CriteriaType',
    'Impressions',
    'Clicks',
    'Cost',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [];

  private static readonly selectorFields = [
    ...CriteriaPerformanceReportService.attributes,
    ...CriteriaPerformanceReportService.segments,
    ...CriteriaPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: CriteriaPerformanceReportService.selectorFields,
      reportName: CriteriaPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.CRITERIA_PERFORMANCE_REPORT,
    });
  }
}

export { CriteriaPerformanceReportService };
