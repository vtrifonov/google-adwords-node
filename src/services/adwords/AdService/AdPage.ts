import { PartialAd } from './Ad';
import { IPage } from '../../../types/abstract';

export interface IAdPage extends IPage {
  entries: PartialAd[];
}
