import { IClientReportService, IReportService } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { BaseClientReportService } from './BaseClientReportService';

class GeoPerformanceReportService extends BaseClientReportService implements IClientReportService {
  public static readonly reportName: string = 'Geo Performance Report';
  private static readonly attributes: string[] = [
    'CampaignId',
    'CampaignName',
    'CampaignStatus',
    'CityCriteriaId',
    'CountryCriteriaId',
    'IsTargetingLocation',
  ];

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
    ...GeoPerformanceReportService.attributes,
    ...GeoPerformanceReportService.segments,
    ...GeoPerformanceReportService.metrics,
  ];

  private constructor(opts: { reportService: IReportService }) {
    super(opts.reportService, {
      selectorFields: GeoPerformanceReportService.selectorFields,
      reportName: GeoPerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.GEO_PERFORMANCE_REPORT,
    });
  }
}

export { GeoPerformanceReportService };
