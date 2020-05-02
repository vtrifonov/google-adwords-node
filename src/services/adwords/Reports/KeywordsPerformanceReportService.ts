import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class KeywordsPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Keywords Performance Report';
  private static readonly attributes: string[] = [
    'Id',
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'Criteria',
    'Status',
    'CpcBid',
    'FirstPageCpc',
    'TopOfPageCpc',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = [
    'Clicks',
    'Impressions',
    'Ctr',
    'Cost',
    'Conversions',
    'AverageCpc',
    'AveragePosition',
  ];

  private static readonly selectorFields = [
    ...KeywordsPerformanceReportService.attributes,
    ...KeywordsPerformanceReportService.segments,
    ...KeywordsPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: KeywordsPerformanceReportService.selectorFields,
      reportName: KeywordsPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.KEYWORDS_PERFORMANCE_REPORT,
    });
  }
}

export { KeywordsPerformanceReportService };
