import { IAttributes } from '../Attributes';

interface IAdUnionIdRaw<Type> extends IAttributes<Type> {
  id: string;
  'AdUnionId.Type': string;
}

interface IAdUnionId<Type = ''> extends Partial<IAdUnionIdRaw<Type>> {}

interface ITempAdUnionId extends IAdUnionId<'TempAdUnionId'> {}

type PartialAdUnionId = Partial<IAdUnionId | ITempAdUnionId>;

export { IAdUnionId, IAdUnionIdRaw, ITempAdUnionId, PartialAdUnionId };
