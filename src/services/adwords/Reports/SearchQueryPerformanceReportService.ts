import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class SearchQueryPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Search Query Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'KeywordId',
    'Query',
    'QueryTargetingStatus',
  ];
  private static readonly segments: string[] = ['QueryMatchTypeWithVariant'];
  private static readonly metrics: string[] = ['Clicks', 'Impressions', 'Cost', 'Ctr', 'AverageCpv'];

  private static readonly selectorFields = [
    ...SearchQueryPerformanceReportService.attributes,
    ...SearchQueryPerformanceReportService.segments,
    ...SearchQueryPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: SearchQueryPerformanceReportService.selectorFields,
      reportName: SearchQueryPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.SEARCH_QUERY_PERFORMANCE_REPORT,
    });
  }
}

export { SearchQueryPerformanceReportService };
