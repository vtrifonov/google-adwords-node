import { IManagedCustomer } from './ManagedCustomer';
import { IManagedCustomerLink } from './ManagedCustomerLink';
import { IPage } from '../../../types/abstract';

export interface IManagedCustomerPage extends IPage {
  entries: IManagedCustomer[];
  links: IManagedCustomerLink[];
}
