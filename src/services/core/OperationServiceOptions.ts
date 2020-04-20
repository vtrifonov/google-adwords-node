import { SoapService } from './SoapService';
import { HttpService } from './HttpService';
import { AdWordsService, ReportService, IServiceOpts, IServiceDeps } from '../adwords';

export interface IOperationServiceOptions {
  soapService: SoapService;
  httpService: HttpService;
  adWordsService: AdWordsService;
  reportsService: ReportService;
  options?: Partial<IServiceOpts & IServiceDeps>;
}
