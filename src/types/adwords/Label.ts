import { IDisplayAttribute } from './LabelAttribute';
import { Label } from '../enum';

interface ILabel {
  id?: string;
  name?: string;
  readonly status?: Label.Status;
  readonly attribute?: IDisplayAttribute;
  attributes?: {
    'xsi:type': Label.Type;
  };
}

interface ITextLabel extends ILabel {}

export { ILabel, ITextLabel };
