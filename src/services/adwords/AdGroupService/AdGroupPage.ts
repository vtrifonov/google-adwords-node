import { IAdGroup } from './AdGroup';
import { IPage } from '../../../types/abstract';

export interface IAdGroupPage extends IPage {
  entries: IAdGroup[];
}
