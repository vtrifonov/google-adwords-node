import { Predicate, SortOrder } from '../enum';

interface IPaging {
  startIndex: number;
  numberResults: number;
}

interface IDateRange {
  min: string;
  max: string;
}

/**
 * Specifies how an entity (eg. adgroup, campaign, criterion, ad) should be filtered.
 *
 * @author dulin
 * @interface IPredicates
 */
interface IPredicate {
  field: string;
  operator: Predicate.Operator;
  values: string[];
}

interface IOrderBy {
  field: string;
  sortOrder: SortOrder;
}

interface ISelector {
  fields: string[];
  predicates?: IPredicate[];
  dateRange?: IDateRange;
  ordering?: IOrderBy[];
  paging?: IPaging;
}

export { ISelector, IPredicate, IDateRange, IOrderBy, IPaging };
