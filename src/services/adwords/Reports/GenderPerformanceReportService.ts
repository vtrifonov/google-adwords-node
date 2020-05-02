import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class GenderPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Gender Performance Report';
  private static readonly attributes: string[] = ['CampaignId', 'CampaignName', 'CampaignStatus', 'Criteria'];

  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'ConversionRate',
    'Cost',
    'Ctr',
    'Impressions',
    'AverageCpc',
  ];
  private static readonly selectorFields = [
    ...GenderPerformanceReportService.attributes,
    ...GenderPerformanceReportService.segments,
    ...GenderPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: GenderPerformanceReportService.selectorFields,
      reportName: GenderPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.GENDER_PERFORMANCE_REPORT,
    });
  }
}

export { GenderPerformanceReportService };
