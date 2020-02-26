import { ServedAssetFieldType } from './enum/ServedAssetFieldType';
import { AssetPerformanceLabel } from './enum/AssetPerformanceLabel';
import { PartialAsset } from './Asset';
import { IAssetPolicySummaryInfo } from './PolicySummaryInfo';

export interface IAssetLink {
  asset: PartialAsset;
  pinnedField: ServedAssetFieldType;
  assetPolicySummaryInfo?: IAssetPolicySummaryInfo;
  assetPerformanceLabel?: AssetPerformanceLabel;
}
