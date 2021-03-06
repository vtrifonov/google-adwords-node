import { IAttributes } from '../Attributes';
import { Asset, AssetStatus, MediaMimeType } from '../../enum';
import { IImageDimensionInfo } from './ImageDimensionInfo';

interface IAssetRaw<Type> extends IAttributes<Type> {
  assetId: string;
  assetName: string;
  readonly assetSubtype?: Asset.Type;
  readonly assetStatus?: AssetStatus;
  'Asset.Type': string;
}

interface IAsset<Type = ''> extends Partial<IAssetRaw<Type>> {}

interface IImageAsset extends IAsset<'ImageAsset'> {
  imageData: string;
  readonly imageFileSize?: number;
  readonly imageMimeType?: MediaMimeType;
  readonly fullSizeInfo?: IImageDimensionInfo;
}

interface IMediaBundleAsset extends IAsset<'MediaBundleAsset'> {
  mediaBundleData: string;
}

interface ITextAsset extends IAsset<'ITextAsset'> {
  assetText: string;
}

interface IYouTubeVideoAsset extends IAsset<'YouTubeVideoAsset'> {
  youTubeVideoId: string;
}

type PartialAsset = Partial<IAsset | IImageAsset | IMediaBundleAsset | ITextAsset | IYouTubeVideoAsset>;

export { IAsset, IAssetRaw, IImageAsset, IMediaBundleAsset, ITextAsset, IYouTubeVideoAsset, PartialAsset };
