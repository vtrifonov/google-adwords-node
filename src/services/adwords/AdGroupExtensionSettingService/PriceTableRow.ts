import { PriceExtensionPriceUnit } from './enum/PriceExtensionPriceUnit';
import { IUrlList } from './UrlList';
import { IMoneyWithCurrency } from './Money';

export interface IPriceTableRow {
  header: string;
  description: string;
  finalUrls: IUrlList;
  finalMobileUrls: IUrlList;
  price: IMoneyWithCurrency;
  priceUnit: PriceExtensionPriceUnit;
}
