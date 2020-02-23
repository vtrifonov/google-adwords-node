import { ReportService, IClientReportService, IReport } from '../ReportService';
import { ReportDefinition } from '../ReportDefinitionService';
import { IReportDefinition } from '../ReportDefinitionService/ReportDefinition';
import _ from 'lodash';
import { ClientReportService } from './AbstractClientReportService';

class AgeRangePerformanceReportService extends ClientReportService implements IClientReportService {
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

  private reportService: ReportService;
  private constructor(opts: { reportService: ReportService }) {
    super();
    this.reportService = opts.reportService;
  }

  public async get(reportDefinition: Partial<IReportDefinition>) {
    const reportDef: IReportDefinition = {
      // order is matter
      selector: _.get(reportDefinition, 'selector', { fields: AgeRangePerformanceReportService.selectorFields }),
      reportName: AgeRangePerformanceReportService.reportName,
      reportType: ReportDefinition.ReportType.AGE_RANGE_PERFORMANCE_REPORT,
      dateRangeType: reportDefinition.dateRangeType || ReportDefinition.DateRangeType.ALL_TIME,
    };

    return this.reportService.reportDownload(reportDef, this.getOptions());
  }
}

export { AgeRangePerformanceReportService };
