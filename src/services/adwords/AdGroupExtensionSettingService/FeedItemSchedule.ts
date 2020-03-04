import { DayOfWeek, MinuteOfHour } from '../../../types/enum';

export interface IFeedItemSchedule {
  dayOfWeek: DayOfWeek;
  startHour: number;
  startMinute: MinuteOfHour;
  endHour: number;
  endMinute: MinuteOfHour;
}
