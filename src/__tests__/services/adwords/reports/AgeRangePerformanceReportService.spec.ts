import { adwordsService } from '../../../initialize';
import { reportServiceMocked } from '../../../depsMocked';
import { ReportDefinition } from '../../../../services/adwords/ReportDefinitionService';
import { AgeRangePerformanceReportService } from '../../../../services/adwords/Reports';

describe('AgeRangePerformanceReportService test suites', () => {
  const ageRangePerformanceReportService = adwordsService.getService('AgeRangePerformanceReportService', {
    reportService: reportServiceMocked,
  });
  describe('#get', () => {
    const mReport = 'age range performance report xml';
    it('should get report correctly with default report definition', async () => {
      reportServiceMocked.reportDownload.mockResolvedValueOnce(mReport);
      const actualValue = await ageRangePerformanceReportService.get({});
      expect(actualValue).toBe(mReport);
      expect(reportServiceMocked.reportDownload).toBeCalledWith({
        selector: {
          fields: [
            'CampaignId',
            'CampaignName',
            'CampaignStatus',
            'Criteria',
            'Clicks',
            'Conversions',
            'ConversionRate',
            'Cost',
            'Ctr',
            'Impressions',
            'AverageCpc',
          ],
        },
        reportName: AgeRangePerformanceReportService.reportName,
        reportType: ReportDefinition.ReportType.AGE_RANGE_PERFORMANCE_REPORT,
        dateRangeType: ReportDefinition.DateRangeType.ALL_TIME,
      });
    });
  });
});
