import { Criterion, LocationTargetingStatus } from '../../../types/enum';

interface ICriterionRaw {
  id: string;
  readonly type: Criterion.Type;
  'Criterion.Type': string;
}

interface ICriterion extends Partial<ICriterionRaw> {}

interface ILocation extends ICriterion {
  readonly locationName: string;
  readonly displayType: string;
  readonly targetingStatus: LocationTargetingStatus;
  readonly parentLocations: ILocation[];
  attributes: {
    'xsi:type': 'Location';
  };
}

export { ICriterion, ICriterionRaw, ILocation };
