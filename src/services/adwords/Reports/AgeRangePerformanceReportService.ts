import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class AgeRangePerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Age Range Performance Report';
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
    ...AgeRangePerformanceReportService.attributes,
    ...AgeRangePerformanceReportService.segments,
    ...AgeRangePerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: AgeRangePerformanceReportService.selectorFields,
      reportName: AgeRangePerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AGE_RANGE_PERFORMANCE_REPORT,
    });
  }
}

export { AgeRangePerformanceReportService };
