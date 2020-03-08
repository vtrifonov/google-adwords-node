import { IAccountLabel } from './AccountLabel';
import { IAttributes } from '../../../types/adwords';

interface IManagedCustomerRaw extends IAttributes {
  name: string;
  readonly customerId: string;
  canManageClients: boolean;
  currencyCode: string;
  dateTimeZone: string;
  testAccount: boolean;
  readonly accountLabels: IAccountLabel[];
  readonly excludeHiddenAccounts: boolean;
}

interface IManagedCustomer extends Partial<IManagedCustomerRaw> {}

export { IManagedCustomer, IManagedCustomerRaw };
