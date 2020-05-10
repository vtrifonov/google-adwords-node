import { FeedAttribute } from '../../../types/enum';

export interface IFeedAttribute {
  id: string;
  name: string;
  type: FeedAttribute.Type;
  isPartOfKey: boolean;
}
