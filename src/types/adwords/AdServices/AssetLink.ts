import { PartialAsset } from './Asset';
import { ServedAssetFieldType, AssetPerformanceLabel } from '../../enum';
import { IAssetPolicySummaryInfo } from './PolicySummaryInfo';

export interface IAssetLink {
  asset: PartialAsset;
  pinnedField: ServedAssetFieldType;
  assetPolicySummaryInfo?: IAssetPolicySummaryInfo;
  assetPerformanceLabel?: AssetPerformanceLabel;
}
