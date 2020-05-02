import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class PlaceholderFeedItemReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Placeholder Feed Item Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'AdGroupStatus',
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'AdId',
    'FeedId',
    'FeedItemId',
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
    ...PlaceholderFeedItemReportService.attributes,
    ...PlaceholderFeedItemReportService.segments,
    ...PlaceholderFeedItemReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: PlaceholderFeedItemReportService.selectorFields,
      reportName: PlaceholderFeedItemReportService.reportName,
      reportType: ReportDefinition.ReportType.PLACEHOLDER_FEED_ITEM_REPORT,
    });
    this.options.includeZeroImpressions = false;
  }
}

export { PlaceholderFeedItemReportService };
