import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { parseDate } from "../../helpers/date";
import { DateFormats } from "./date-picker.types";

export const useCurrentMonth = (selectedDate: Date | null) => {
  const [monthAndYearOnScreen, setMonthAndYearOnScreen] = useState(
    selectedDate || new Date()
  );

  useEffect(() => {
    setMonthAndYearOnScreen(selectedDate || new Date());
  }, [selectedDate]);

  const monthOnScreen = useMemo(
    () => format(monthAndYearOnScreen, "MM"),
    [monthAndYearOnScreen]
  );
  const yearOnScreen = useMemo(
    () => format(monthAndYearOnScreen, "yyyy"),
    [monthAndYearOnScreen]
  );

  const onMonthScreenChange = useCallback(
    (value: string, whatChanged: string) => {
      const dateString =
        whatChanged === "month"
          ? `${yearOnScreen}-${value}`
          : `${value}-${monthOnScreen}`;

      const parsedDate = parseDate(dateString, DateFormats.YEAR_MONTH);

      setMonthAndYearOnScreen(parsedDate);
    },
    [yearOnScreen, monthOnScreen]
  );

  return {
    monthAndYearOnScreen,
    setMonthAndYearOnScreen,
    onMonthScreenChange,
    monthOnScreen,
    yearOnScreen,
  };
};
