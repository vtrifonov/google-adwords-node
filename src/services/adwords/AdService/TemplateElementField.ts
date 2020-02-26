import { TemplateElementField } from './enum/TemplateElementField';
import { IMedia } from '../AdGroupAdService';
import { PartialMedia } from './Media';

export interface ITemplateElementField {
  name: string;
  type: TemplateElementField.Type;
  fieldText?: string;
  fieldMedia: PartialMedia;
}
