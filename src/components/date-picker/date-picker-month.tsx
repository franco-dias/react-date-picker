import { useMemo } from "react";
import { useMonthMetadata } from "./use-month-metadata";
import {
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getMonth,
  isEqual,
} from "date-fns";
import { DayObject, MonthContainer, MonthHeader } from "./date-picker.styles";
import { monthOptions, yearOptions } from "./date-picker.helpers";

interface DatePickerMonth {
  displayDate: Date;
  selectedDate: Date | null;
  onDateChange: (newDate: Date) => void;
  onMonthChange: (newDate: Date) => void;
}

const DatePickerMonth = ({
  displayDate,
  selectedDate,
  onDateChange,
  onMonthChange,
}: DatePickerMonth) => {
  const { firstDayToBeDisplayed, lastDayToBeDisplayed, currentMonth } =
    useMonthMetadata(displayDate);

  const daysToBeDisplayed = useMemo(
    () =>
      eachDayOfInterval({
        start: firstDayToBeDisplayed,
        end: lastDayToBeDisplayed,
      }),
    [firstDayToBeDisplayed, lastDayToBeDisplayed]
  );

  const toPreviousMonth = () => onMonthChange(addMonths(displayDate, -1));
  const toNextMonth = () => onMonthChange(addMonths(displayDate, 1));

  return (
    <>
      <MonthHeader>
        <button onClick={toPreviousMonth}>‹</button>
        <h4>{format(displayDate, "MMMM yyyy")}</h4>
        <button onClick={toNextMonth}>›</button>
      </MonthHeader>
      <MonthContainer>
        {daysToBeDisplayed.map((day: Date) => {
          return (
            <DayObject
              key={day.toISOString()}
              onClick={() => onDateChange(day)}
              disabled={getMonth(day) !== currentMonth}
              $highlighted={selectedDate ? isEqual(selectedDate, day) : false}
            >
              {getDate(day)}
            </DayObject>
          );
        })}
      </MonthContainer>
    </>
  );
};

export { DatePickerMonth };
