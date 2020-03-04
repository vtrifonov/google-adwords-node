import { IAdGroupAd } from './AdGroupAd';
import { IPage } from '../../../types/abstract';

export interface IAdGroupAdPage extends IPage {
  entries: IAdGroupAd[];
}
