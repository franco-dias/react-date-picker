import {
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getDay,
  getMonth,
  isEqual,
} from "date-fns";
import {
  DayObject,
  GridContainer,
  MonthHeader,
} from "./date-picker-month.styles";
import { useMonthMetadata } from "./use-month-metadata";
import { useMemo } from "react";
import { headers } from "./date-picker-month.helpers";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface CalendarViewProps {
  dismiss(): void;
  changeView(): void;
  displayedMonth: Date;
  selectedDate: Date | null;
  onDateChange(date: Date): void;
  onMonthChange(date: Date): void;
}

export const CalendarView = ({
  selectedDate,
  changeView,
  displayedMonth,
  onMonthChange,
  onDateChange,
  dismiss,
}: CalendarViewProps) => {
  // @TODO - add validation based on minimum and maximum dates
  const toPreviousMonth = () => onMonthChange(addMonths(displayedMonth, -1));
  const toNextMonth = () => onMonthChange(addMonths(displayedMonth, 1));
  const { firstDayToBeDisplayed, lastDayToBeDisplayed, currentMonth } =
    useMonthMetadata(displayedMonth);

  const handleDayClick = (day: Date) => () => {
    if (getMonth(day) !== currentMonth) {
      onMonthChange(day);
    }
    onDateChange(day);
    dismiss();
  };

  const daysToBeDisplayed = useMemo(
    () =>
      eachDayOfInterval({
        start: firstDayToBeDisplayed,
        end: lastDayToBeDisplayed,
      }),
    [firstDayToBeDisplayed, lastDayToBeDisplayed]
  );

  return (
    <>
      <MonthHeader>
        <button onClick={toPreviousMonth} title="Go to previous month">
          <CaretLeft />
        </button>
        <button onClick={changeView} title="Click to select a month">
          {format(displayedMonth, "MMMM yyyy")}
        </button>
        <button onClick={toNextMonth} title="Go to next month">
          <CaretRight />
        </button>
      </MonthHeader>
      <GridContainer>
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
              // @TODO - add keyboard navigation to days list
              key={day.toISOString()}
              onClick={handleDayClick(day)}
              $opaque={getMonth(day) !== currentMonth}
              $highlighted={selectedDate ? isEqual(selectedDate, day) : false}
              $color={getDay(day) === 0 ? "red" : undefined}
            >
              {getDate(day)}
            </DayObject>
          );
        })}
      </GridContainer>
    </>
  );
};
