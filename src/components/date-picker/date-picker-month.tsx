import { useMemo } from "react";
import { useMonthMetadata } from "./use-month-metadata";
import {
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getDay,
  getMonth,
  isEqual,
} from "date-fns";
import { DayObject, MonthContainer, MonthHeader } from "./date-picker.styles";
import { headers } from "./date-picker.helpers";

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

  const handleDayClick = (day: Date) => () => {
    if (getMonth(day) !== currentMonth) {
      onMonthChange(day);
    }
    return onDateChange(day);
  };

  return (
    <>
      <MonthHeader>
        <button onClick={toPreviousMonth}>‹</button>
        <h4>{format(displayDate, "MMMM yyyy")}</h4>
        <button onClick={toNextMonth}>›</button>
      </MonthHeader>
      <MonthContainer>
        {headers.map((h, index) => (
          <DayObject
            disabled
            key={h + index}
            $color={index === 0 ? "red" : undefined}
          >
            {h}
          </DayObject>
        ))}
        {daysToBeDisplayed.map((day: Date) => {
          return (
            <DayObject
              key={day.toISOString()}
              onClick={handleDayClick(day)}
              $opaque={getMonth(day) !== currentMonth}
              $color={getDay(day) === 0 ? "red" : undefined}
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
