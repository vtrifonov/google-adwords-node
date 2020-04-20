import { ChangeStatus } from './enum/ChangeStatus';

export interface IFeedChangeData {
  feedId: string;
  feedChangeStatus: ChangeStatus;
  changedFeedItems: string[];
  removedFeedItems: string[];
}
