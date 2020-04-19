import { IListReturnValue } from '../../abstract';
import { PartialAd } from './Ad';
import { IAdGroupAd } from './AdGroupAd';

export interface IUpdateAdsResult {
  adUpdates?: IListReturnValue<PartialAd>;
  imageAdUpdates?: IListReturnValue<IAdGroupAd>;
}
