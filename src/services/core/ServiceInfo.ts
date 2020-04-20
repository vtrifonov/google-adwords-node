export interface IServiceInfo {
  idField?: string;
  operationType: string;
  selectorFields: string[];
  // the idea of this method is to allow modifying the input type as in some cases like in CampaignExtensionSettingService
  // the input type does not inlcude details for sitelink fields like sitelinkFinalUrlSuffix
  modifyMutateInputOperand?: ((original: any) => any) | undefined;
}
