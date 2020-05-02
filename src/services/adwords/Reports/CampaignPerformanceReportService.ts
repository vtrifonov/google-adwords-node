import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService/enum/ReportDefinition';
import { BaseClientReportService } from './BaseClientReportService';

class CampaignPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Campaign Performance Report';
  private static readonly attributes: string[] = [
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'StartDate',
    'EndDate',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Conversions',
    'Ctr',
    'Cost',
    'Impressions',
    'ConversionRate',
    'AverageCpc',
  ];
  private static readonly selectorFields = [
    ...CampaignPerformanceReportService.attributes,
    ...CampaignPerformanceReportService.segments,
    ...CampaignPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: CampaignPerformanceReportService.selectorFields,
      reportName: CampaignPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.CAMPAIGN_PERFORMANCE_REPORT,
    });
  }
}

export { CampaignPerformanceReportService };
