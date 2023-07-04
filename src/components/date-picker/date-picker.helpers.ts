import { eachMonthOfInterval, eachYearOfInterval, format } from "date-fns";

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
