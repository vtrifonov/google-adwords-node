import { PriceExtensionPriceUnit } from '../../../types/enum';
import { IUrlList, IMoneyWithCurrency } from '../../../types/adwords';

export interface IPriceTableRow {
  header: string;
  description: string;
  finalUrls: IUrlList;
  finalMobileUrls: IUrlList;
  price: IMoneyWithCurrency;
  priceUnit: PriceExtensionPriceUnit;
}
