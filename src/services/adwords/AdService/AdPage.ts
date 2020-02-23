import { IPage } from './abstract/Page';
import { PartialAd } from './Ad';

export interface IAdPage extends IPage {
  entries: PartialAd[];
}
