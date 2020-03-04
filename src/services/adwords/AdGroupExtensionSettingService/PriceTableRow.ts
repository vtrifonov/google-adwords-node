import { IUrlList } from './UrlList';
import { IMoneyWithCurrency } from './Money';
import { PriceExtensionPriceUnit } from '../../../types/enum';

export interface IPriceTableRow {
  header: string;
  description: string;
  finalUrls: IUrlList;
  finalMobileUrls: IUrlList;
  price: IMoneyWithCurrency;
  priceUnit: PriceExtensionPriceUnit;
}
