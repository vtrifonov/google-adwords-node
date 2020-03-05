import { ILocation } from '../../../types/adwords';

export interface ILocationCriterion {
  location: ILocation;
  readonly canonicalName: string;
  readonly reach: string;
  readonly locale: string;
  readonly searchTerm: string;
  countryCode?: string;
}
