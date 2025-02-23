import dayjs from "dayjs";
import duration, { type DurationUnitType } from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(duration);
dayjs.extend(relativeTime);

export const dayjsHumanize = (num: number, unit: string = "seconds") => {
  return dayjs.duration(num, unit as DurationUnitType).humanize();
};
