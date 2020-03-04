import { IAudio, IImage, IMediaBundle, IVideo } from '../../../types/adwords';

export interface IMediaPage {
  entries: Array<IAudio | IImage | IMediaBundle | IVideo>;
  totalNumEntries: number;
}
