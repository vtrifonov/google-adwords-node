import { IMoneyWithCurrency } from '../../../types/adwords';

export interface IFeedItemAttributeValue {
  feedAttributeId: string;
  integerValue?: string;
  doubleValue?: string;
  booleanValue?: boolean;
  stringValue?: string;
  integerValues?: string[];
  doubleValues?: string[];
  booleanValues?: boolean[];
  stringValues?: string[];
  moneyWithCurrencyValue?: IMoneyWithCurrency;
}
