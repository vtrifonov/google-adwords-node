import { ICampaign } from './Campaign';
import { IPage } from '../../../types/abstract';

export interface ICampaignPage extends IPage {
  entries: ICampaign[];
}
