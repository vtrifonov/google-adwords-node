import { IComparableValue } from '../abstract';

interface IMoney extends IComparableValue {
  microAmount: number;
}

interface IMoneyWithCurrency extends IComparableValue {
  money: IMoney;
  currencyCode: string;
}

export { IMoney, IMoneyWithCurrency };
