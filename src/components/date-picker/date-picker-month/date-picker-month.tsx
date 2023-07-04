import { useCallback, useMemo, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
import {
  DayObject,
  GridContainer,
  MonthContainer,
  MonthHeader,
} from "./date-picker-month.styles";
import { fadeAnimation, headers } from "./date-picker-month.helpers";
import { useOutsideClick } from "./use-outside-click";
import { DatePickerMonthProps } from "./date-picker-month.types";
import { createPortal } from "react-dom";

const DatePickerMonth = ({
  displayedMonth,
  selectedDate,
  onDateChange,
  onMonthChange,
  display,
  setDisplay,
  inputContainerRef,
}: DatePickerMonthProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { firstDayToBeDisplayed, lastDayToBeDisplayed, currentMonth } =
    useMonthMetadata(displayedMonth);

  const dismiss = useCallback(() => setDisplay(false), [setDisplay]);

  useOutsideClick({
    ref: containerRef,
    active: display,
    cb: dismiss,
  });

  const daysToBeDisplayed = useMemo(
    () =>
      eachDayOfInterval({
        start: firstDayToBeDisplayed,
        end: lastDayToBeDisplayed,
      }),
    [firstDayToBeDisplayed, lastDayToBeDisplayed]
  );

  const toPreviousMonth = () => onMonthChange(addMonths(displayedMonth, -1));
  const toNextMonth = () => onMonthChange(addMonths(displayedMonth, 1));

  const handleDayClick = (day: Date) => () => {
    if (getMonth(day) !== currentMonth) {
      onMonthChange(day);
    }
    onDateChange(day);
    dismiss();
  };

  const inputRect = inputContainerRef.current?.getBoundingClientRect();
  const containerPosition = inputRect
    ? {
        left: inputRect.left + 16,
        top: inputRect.top + inputRect.height + 16,
      }
    : { left: 0, top: 0 };

  return createPortal(
    <AnimatePresence>
      {display && (
        <MonthContainer
          {...fadeAnimation}
          ref={containerRef}
          $position={containerPosition}
        >
          <MonthHeader>
            <button onClick={toPreviousMonth}>‹</button>
            <h4>{format(displayedMonth, "MMMM yyyy")}</h4>
            <button onClick={toNextMonth}>›</button>
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
                  key={day.toISOString()}
                  onClick={handleDayClick(day)}
                  $opaque={getMonth(day) !== currentMonth}
                  $highlighted={
                    selectedDate ? isEqual(selectedDate, day) : false
                  }
                  $color={getDay(day) === 0 ? "red" : undefined}
                >
                  {getDate(day)}
                </DayObject>
              );
            })}
          </GridContainer>
        </MonthContainer>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLElement
  );
};

export { DatePickerMonth };
