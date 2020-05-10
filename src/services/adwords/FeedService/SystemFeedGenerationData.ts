import { IAttributes } from '../../../types/adwords';
import { RelationshipType } from '../../../types/enum';
import { IChain } from './Chain';
import { IOAuthInfo } from './OAuthInfo';

interface ISystemFeedGenerationData<Type> extends IAttributes<Type> {
  'SystemFeedGenerationData.Type': string;
}

interface IAffiliateLocationFeedData extends ISystemFeedGenerationData<'AffiliateLocationFeedData'> {
  chains: IChain[];
  relationshipType: RelationshipType;
}

interface IPlacesLocationFeedData extends ISystemFeedGenerationData<'PlacesLocationFeedData'> {
  oAuthInfo: IOAuthInfo;
  emailAddress: string;
  businessAccountIdentifier: string;
  businessNameFilter: string;
  categoryFilters: string;
  labelFilters: string[];
}

type PartialSystemFeedGenerationData = Partial<IAffiliateLocationFeedData | IPlacesLocationFeedData>;

export {
  ISystemFeedGenerationData,
  IAffiliateLocationFeedData,
  IPlacesLocationFeedData,
  PartialSystemFeedGenerationData,
};
