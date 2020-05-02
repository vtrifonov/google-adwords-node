import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class AdPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Ad Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'AdType',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'CombinedApprovalStatus',
    'Id',
    'Status',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Impressions',
    'Ctr',
    'AverageCpc',
    'Cost',
    'Conversions',
    'AveragePosition',
  ];

  private static readonly selectorFields = [
    ...AdPerformanceReportService.attributes,
    ...AdPerformanceReportService.segments,
    ...AdPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: AdPerformanceReportService.selectorFields,
      reportName: AdPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AD_PERFORMANCE_REPORT,
    });
  }
}

export { AdPerformanceReportService };
