import { IReportService, IClientReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class KeywordlessQueryReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Keywordless Performance Report';
  private static readonly attributes: string[] = [
    'AdGroupId',
    'AdGroupName',
    'CampaignId',
    'CampaignName',
    'CriterionId',
    'Query',
  ];
  private static readonly segments: string[] = [];
  private static readonly metrics: string[] = ['Clicks', 'Impressions', 'Cost'];

  private static readonly selectorFields = [
    ...KeywordlessQueryReportService.attributes,
    ...KeywordlessQueryReportService.segments,
    ...KeywordlessQueryReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: KeywordlessQueryReportService.selectorFields,
      reportName: KeywordlessQueryReportService.reportName,
      reportType: ReportDefinition.ReportType.KEYWORDLESS_QUERY_REPORT,
    });
  }
}

export { KeywordlessQueryReportService };
