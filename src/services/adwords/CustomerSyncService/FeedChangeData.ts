import { ChangeStatus } from '../../../types/enum';

export interface IFeedChangeData {
  feedId: string;
  feedChangeStatus: ChangeStatus;
  changedFeedItems: string[];
  removedFeedItems: string[];
}
