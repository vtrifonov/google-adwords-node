import { TemplateElementField } from '../../enum';
import { PartialMedia } from '../Media';

export interface ITemplateElementField {
  name: string;
  type: TemplateElementField.Type;
  fieldText?: string;
  fieldMedia: PartialMedia;
}
