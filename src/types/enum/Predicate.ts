/**
 * The operator to use for filtering the data returned.
 * https://developers.google.com/adwords/api/docs/reference/v201809/AdGroupAdService.Predicate.Operator
 *
 * @enum {number}
 */

export namespace Predicate {
  export enum Operator {
    EQUALS = 'EQUALS',
    NOT_EQUALS = 'NOT_EQUALS',
    IN = 'IN',
    NOT_IN = 'NOT_IN',
    GREATER_THAN = 'GREATER_THAN',
    GREATER_THAN_EQUALS = 'GREATER_THAN_EQUALS',
    LESS_THAN = 'LESS_THAN',
    LESS_THAN_EQUALS = 'LESS_THAN_EQUALS',
    STARTS_WITH = 'STARTS_WITH',
    STARTS_WITH_IGNORE_CASE = 'STARTS_WITH_IGNORE_CASE',
    CONTAINS = 'CONTAINS',
    CONTAINS_IGNORE_CASE = 'CONTAINS_IGNORE_CASE',
    DOES_NOT_CONTAIN = 'DOES_NOT_CONTAIN',
    DOES_NOT_CONTAIN_IGNORE_CASE = 'DOES_NOT_CONTAIN_IGNORE_CASE',
    CONTAINS_ANY = 'CONTAINS_ANY',
    CONTAINS_ALL = 'CONTAINS_ALL',
    CONTAINS_NONE = 'CONTAINS_NONE',
    UNKNOWN = 'UNKNOWN',
  }
}
