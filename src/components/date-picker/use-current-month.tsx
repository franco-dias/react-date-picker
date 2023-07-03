import { format, parse } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";

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
    (ev: React.ChangeEvent<HTMLSelectElement>, whatChanged: string) => {
      const { value } = ev.target;
      if (whatChanged === "month")
        return setMonthAndYearOnScreen(
          parse(`${yearOnScreen}-${value}`, "yyyy-MM", new Date())
        );

      return setMonthAndYearOnScreen(
        parse(`${value}-${monthOnScreen}`, "yyyy-MM", new Date())
      );
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
