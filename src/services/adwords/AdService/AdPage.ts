import { IPage } from '../../../types/abstract';
import { PartialAd } from '../../../types/adwords';

export interface IAdPage extends IPage {
  entries: PartialAd[];
}
