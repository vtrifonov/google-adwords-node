import { IAttributes } from '../../../types/adwords';
import { Criterion, KeywordMatchType, LocationTargetingStatus } from '../../../types/enum';

interface ICriterionRaw<Type> extends IAttributes<Type> {
  id: string | number;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion<Type> extends Partial<ICriterionRaw<Type>> {}

interface IKeyword extends ICriterion<'Keyword'> {
  text: string;
  matchType: KeywordMatchType;
}

interface ILocation extends ICriterion<'Location'> {
  readonly locationName: string;
  readonly displayType: string;
  readonly targetingStatus: LocationTargetingStatus;
  readonly parentLocations: ILocation[];
}

export { IKeyword, ICriterion, ILocation, ICriterionRaw };
