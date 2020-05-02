import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class AdGroupPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Adgroup Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
  ];
  private static readonly segments: string[] = ['Device'];
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
    ...AdGroupPerformanceReportService.attributes,
    ...AdGroupPerformanceReportService.segments,
    ...AdGroupPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: AdGroupPerformanceReportService.selectorFields,
      reportName: AdGroupPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.ADGROUP_PERFORMANCE_REPORT,
    });
  }
}

export { AdGroupPerformanceReportService };
