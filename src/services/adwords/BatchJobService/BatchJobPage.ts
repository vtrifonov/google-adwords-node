import { IBatchJob } from './BatchJob';
import { IPage } from '../../../types/abstract';

export interface IBatchJobPage extends IPage {
  entries: IBatchJob[];
  attributes: {
    'xsi:type': 'BatchJobPage';
  };
}
