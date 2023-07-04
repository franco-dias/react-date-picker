import { eachMonthOfInterval, eachYearOfInterval, format } from "date-fns";

export enum WeekDays {
  SUNDAY = 0,
  MONDAY = 1,
  TUESDAY = 2,
  WEDNESDAY = 3,
  THURSDAY = 4,
  FRIDAY = 5,
  SATURDAY = 6,
}

export enum Months {
  JANUARY = 0,
  FEBRUARY = 1,
  MARCH = 2,
  APRIL = 3,
  MAY = 4,
  JUNE = 5,
  JULY = 6,
  AUGUST = 7,
  SEPTEMBER = 8,
  OCTOBER = 9,
  NOVEMBER = 10,
  DECEMBER = 11,
}

export const monthOptions = eachMonthOfInterval({
  start: new Date(1900, 0, 1),
  end: new Date(1900, 11, 1),
}).map((date: Date) => ({
  label: format(date, "MMMM"),
  value: format(date, "MM"),
}));

export const yearOptions = (start: Date, end: Date) =>
  eachYearOfInterval({
    start,
    end,
  }).map((date: Date) => ({
    label: format(date, "yyyy"),
    value: format(date, "yyyy"),
  }));
