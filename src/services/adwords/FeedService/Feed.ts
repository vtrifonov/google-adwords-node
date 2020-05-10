import { IFeedAttribute } from './FeedAttribute';
import { Feed } from '../../../types/enum';
import { PartialSystemFeedGenerationData } from './SystemFeedGenerationData';

interface IFeed {
  id: string;
  name: string;
  attributes: IFeedAttribute[];
  status: Feed.Status;
  origin: Feed.Origin;
  systemFeedGenerationData: PartialSystemFeedGenerationData;
}

export { IFeed };
