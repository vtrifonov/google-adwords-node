import { DayOfWeek } from './enum/DayOfWeek';
import { MinuteOfHour } from './enum/MinuteOfHour';

export interface IFeedItemSchedule {
  dayOfWeek: DayOfWeek;
  startHour: number;
  startMinute: MinuteOfHour;
  endHour: number;
  endMinute: MinuteOfHour;
}
