import { IAttributes } from './Attributes';
import { Criterion, KeywordMatchType, LocationTargetingStatus, Gender, AgeRange, Proximity } from '../enum';
import { IGeoPoint } from './GeoPoint';
import { IAddress } from './Address';

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

interface IGender extends ICriterion<'Gender'> {
  genderType: Gender.GenderType;
}

interface IAgeRange extends ICriterion<'AgeRange'> {
  ageRangeType: AgeRange.AgeRangeType;
}

interface IProximity extends ICriterionRaw<'Proximity'> {
  geoPoint: IGeoPoint;
  radiusDistanceUnits: Proximity.DistanceUnits;
  radiusInUnits: number;
  address: IAddress;
}

type PartialCriterion = Partial<IKeyword | IGender | IAgeRange | ILocation | IProximity>;

export { IKeyword, IGender, IAgeRange, ICriterion, ICriterionRaw, ILocation, IProximity, PartialCriterion };
