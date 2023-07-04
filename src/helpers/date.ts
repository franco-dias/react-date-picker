import {
  isBefore,
  isAfter,
  startOfDay,
  isEqual,
  format,
  parse,
  differenceInMonths as monthDiff,
} from "date-fns";
import { DateFormats } from "../components/date-picker/date-picker.types";

const toStartOfDay = (dateList: Date[]) =>
  dateList.map((date) => startOfDay(date));

export const isBeforeOrEqual = (base: Date, compare: Date) => {
  const [date, toCompare] = toStartOfDay([base, compare]);
  return isBefore(date, toCompare) || isEqual(date, toCompare);
};

export const isAfterOrEqual = (base: Date, compare: Date) => {
  const [date, toCompare] = toStartOfDay([base, compare]);
  return isAfter(date, toCompare) || isEqual(date, toCompare);
};

export const isBetween = (base: Date, start: Date, end: Date) => {
  const [date, minimum, maximum] = toStartOfDay([base, start, end]);
  return isBeforeOrEqual(minimum, date) && isAfterOrEqual(maximum, date);
};

export const toDefaultDate = (date: Date) => format(date, DateFormats.DEFAULT);
export const toBrDate = (date: Date) => format(date, DateFormats.BRAZILIAN);

export const parseDate = (
  date: string,
  format: DateFormats = DateFormats.DEFAULT
) => parse(date, format, new Date());

export const differenceInMonths = (base: Date, compare: Date) => {
  const [baseSod, compareSod] = toStartOfDay([base, compare]);

  return monthDiff(baseSod, compareSod);
};
