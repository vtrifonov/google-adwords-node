import { Budget } from './enum/Budget';
import { IMoney } from '../../../types/adwords';

export interface IBudget {
  budgetId?: string;
  name?: string;
  amount?: IMoney;
  deliveryMethod?: Budget.BudgetDeliveryMethod;
  referenceCount?: number;
  isExplicitlyShared?: boolean;
  status?: Budget.BudgetStatus;
}
