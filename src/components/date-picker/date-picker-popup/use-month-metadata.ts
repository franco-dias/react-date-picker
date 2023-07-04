import {
  endOfMonth,
  endOfWeek,
  getMonth,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { useMemo } from "react";

export const useMonthMetadata = (displayDate: Date) => {
  const metadata = useMemo(() => {
    const firstDayOfMonth = startOfMonth(displayDate);
    const lastDayOfMonth = endOfMonth(displayDate);

    return {
      lastDayOfMonth,
      firstDayOfMonth,
      currentMonth: getMonth(displayDate),
      firstDayToBeDisplayed: startOfWeek(firstDayOfMonth),
      lastDayToBeDisplayed: endOfWeek(lastDayOfMonth),
    };
  }, [displayDate]);

  return metadata;
};
