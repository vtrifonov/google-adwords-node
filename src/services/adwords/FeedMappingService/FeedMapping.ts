import { FeedMapping } from '../../../types/enum';
import { IAttributeFieldMapping } from './AttributeFieldMapping';

interface IFeedMapping {
  feedMappingId: string;
  feedId: string;
  placeholderType: string;
  status: FeedMapping.Status;
  attributeFieldMappings: IAttributeFieldMapping[];
  criterionType: string;
}

export { IFeedMapping, IAttributeFieldMapping };
