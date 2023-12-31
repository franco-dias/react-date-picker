import {
  addMonths,
  eachDayOfInterval,
  format,
  getDate,
  getDay,
  getMonth,
  isEqual,
} from "date-fns";
import { DayObject, GridContainer } from "./calendar-view.styles";
import { useMonthMetadata } from "./use-month-metadata";
import { useMemo } from "react";
import { headers } from "./calendar-view.helpers";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { differenceInMonths } from "../../../helpers/date";
import { Header } from "../date-picker-popup/date-picker-popup.styles";
import { CalendarViewProps } from "./calendar-view.types";

export const CalendarView = ({
  selectedDate,
  changeView,
  displayedMonth,
  onMonthChange,
  onDateChange,
  dismiss,
  minimum,
  maximum,
}: CalendarViewProps) => {
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

  const canGoToPreviousMonth = useMemo(
    () => differenceInMonths(minimum, displayedMonth),
    [minimum, displayedMonth]
  );

  const canGoToNextMonth = useMemo(
    () => differenceInMonths(maximum, displayedMonth),
    [maximum, displayedMonth]
  );

  console.log({ canGoToNextMonth, canGoToPreviousMonth });

  return (
    <>
      <Header>
        <button
          onClick={toPreviousMonth}
          disabled={!canGoToPreviousMonth}
          title="Go to previous month"
        >
          <CaretLeft />
        </button>
        <button onClick={changeView} title="Click to select a month">
          {format(displayedMonth, "MMMM yyyy")}
        </button>
        <button
          onClick={toNextMonth}
          disabled={!canGoToNextMonth}
          title="Go to next month"
        >
          <CaretRight />
        </button>
      </Header>
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
