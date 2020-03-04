import { IComparableValue } from "../../../types/abstract";

interface IMoney extends IComparableValue {
  microAmount: number;
}

export { IMoney };
