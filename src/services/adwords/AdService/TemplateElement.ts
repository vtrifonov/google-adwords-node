import { ITemplateElementField } from './TemplateElementField';

export interface ITemplateElement {
  uniqueName: string;
  type: ITemplateElementField[];
}
