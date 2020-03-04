import { IBudget } from './Budget';
import { IPage } from '../../../types/abstract';

export interface IBudgetPage extends IPage {
  entries: IBudget[];
}
