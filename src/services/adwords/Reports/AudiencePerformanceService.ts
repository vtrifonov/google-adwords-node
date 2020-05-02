import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class AudiencePerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Audience Performance Report';
  private static readonly attributes: string[] = ['Id', 'CampaignId', 'CampaignName', 'Criteria'];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = ['Clicks', 'Impressions', 'Cost', 'Conversions'];

  private static readonly selectorFields = [
    ...AudiencePerformanceReportService.attributes,
    ...AudiencePerformanceReportService.segments,
    ...AudiencePerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: AudiencePerformanceReportService.selectorFields,
      reportName: AudiencePerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AUDIENCE_PERFORMANCE_REPORT,
    });
  }
}

export { AudiencePerformanceReportService };
