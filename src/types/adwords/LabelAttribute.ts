export interface ILabelAttribute {
  'LabelAttribute.Type'?: string;
}

export interface IDisplayAttribute extends ILabelAttribute {
  backgroundColor: string;
  description: string;
}
