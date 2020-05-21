import { RegistryService } from '../core';
import { CampaignService } from './CampaignService';
import { AdGroupService } from './AdGroupService';
import { AdGroupAdService } from './AdGroupAdService';
import { AdService } from './AdService';
import { BudgetService } from './BudgetService';
import { FeedService } from './FeedService';
import { FeedItemService } from './FeedItemService';
import { FeedMappingService } from './FeedMappingService';
import { LabelService } from './LabelService';
import { AdGroupCriterionService } from './AdGroupCriterionService';
import {
  AdGroupExtensionSettingService,
  CampaignExtensionSettingService,
  CustomerExtensionSettingService,
} from './ExtensionSettingService';
import { CampaignCriterionService } from './CampaignCriterionService';
import { LocationCriterionService } from './LocationCriterionService';
import { ManagedCustomerService } from './ManagedCustomerService';
import { CustomerService } from './CustomerService';
import { CustomerSyncService } from './CustomerSyncService';
import { ReportDefinitionService } from './ReportDefinitionService';
import {
  CampaignPerformanceReportService,
  GeoPerformanceReportService,
  GenderPerformanceReportService,
  AgeRangePerformanceReportService,
  AdPerformanceReportService,
  AdGroupPerformanceReportService,
  CriteriaPerformanceReportService,
  AudiencePerformanceReportService,
  KeywordlessQueryReportService,
  KeywordsPerformanceReportService,
  SearchQueryPerformanceReportService,
  PlaceholderFeedItemReportService,
} from './Reports';
import { BatchJobService } from './BatchJobService';
import { MediaService } from './MediaService';
import { ConversionTrackerService } from './ConversionTrackerService';

interface IServiceMap {
  CampaignService: CampaignService;
  AdGroupService: AdGroupService;
  AdGroupAdService: AdGroupAdService;
  AdService: AdService;
  BudgetService: BudgetService;
  FeedService: FeedService;
  FeedItemService: FeedItemService;
  FeedMappingService: FeedMappingService;
  LabelService: LabelService;
  AdGroupCriterionService: AdGroupCriterionService;
  AdGroupExtensionSettingService: AdGroupExtensionSettingService;
  CampaignCriterionService: CampaignCriterionService;
  ConversionTrackerService: ConversionTrackerService;
  CampaignExtensionSettingService: CampaignExtensionSettingService;
  CustomerExtensionSettingService: CustomerExtensionSettingService;
  LocationCriterionService: LocationCriterionService;
  ManagedCustomerService: ManagedCustomerService;
  CustomerService: CustomerService;
  CustomerSyncService: CustomerSyncService;
  ReportDefinitionService: ReportDefinitionService;
  BatchJobService: BatchJobService;
  MediaService: MediaService;
  CampaignPerformanceReportService: CampaignPerformanceReportService;
  GeoPerformanceReportService: GeoPerformanceReportService;
  GenderPerformanceReportService: GenderPerformanceReportService;
  AgeRangePerformanceReportService: AgeRangePerformanceReportService;
  AdPerformanceReportService: AdPerformanceReportService;
  AdGroupPerformanceReportService: AdGroupPerformanceReportService;
  CriteriaPerformanceReport: CriteriaPerformanceReportService;
  AudiencePerformanceReportService: AudiencePerformanceReportService;
  KeywordsPerformanceReportService: KeywordsPerformanceReportService;
  KeywordlessQueryReportService: KeywordlessQueryReportService;
  SearchQueryPerformanceReportService: SearchQueryPerformanceReportService;
  PlaceholderFeedItemReportService: PlaceholderFeedItemReportService;
}

const registryService = RegistryService.init()
  .register(CampaignService)
  .register(AdGroupService)
  .register(AdGroupAdService)
  .register(AdService)
  .register(BudgetService)
  .register(FeedService)
  .register(FeedItemService)
  .register(FeedMappingService)
  .register(LabelService)
  .register(AdGroupCriterionService)
  .register(AdGroupExtensionSettingService)
  .register(CampaignExtensionSettingService)
  .register(ConversionTrackerService)
  .register(CampaignCriterionService)
  .register(CustomerExtensionSettingService)
  .register(LocationCriterionService)
  .register(ManagedCustomerService)
  .register(CustomerService)
  .register(CustomerSyncService)
  .register(ReportDefinitionService)
  .register(BatchJobService)
  .register(MediaService)
  .register(CampaignPerformanceReportService)
  .register(GeoPerformanceReportService)
  .register(GenderPerformanceReportService)
  .register(AgeRangePerformanceReportService)
  .register(AdPerformanceReportService)
  .register(AdGroupPerformanceReportService)
  .register(CriteriaPerformanceReportService)
  .register(AudiencePerformanceReportService)
  .register(KeywordsPerformanceReportService)
  .register(KeywordlessQueryReportService)
  .register(PlaceholderFeedItemReportService)
  .register(SearchQueryPerformanceReportService);

export { registryService, IServiceMap };
