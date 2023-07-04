import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MonthContainer } from "./date-picker-month.styles";
import { fadeAnimation } from "./date-picker-month.helpers";
import { useOutsideClick } from "./use-outside-click";
import { DatePickerMonthProps } from "./date-picker-month.types";
import { createPortal } from "react-dom";
import { useFixedElementPosition } from "./use-fixed-element-position";
import { CalendarView } from "./calendar-view";
import { MonthSelectionView } from "./month-selection-view";

export enum ViewModes {
  CALENDAR = "CALENDAR",
  MONTH_SELECTION = "MONTH_SELECTION",
}

const DatePickerPopup = ({
  displayedMonth,
  selectedDate,
  onDateChange,
  onMonthChange,
  display,
  setDisplay,
  inputContainerRef,
  yearOnScreen,
  monthOnScreen,
  onMonthScreenChange,
  minimum,
  maximum,
}: DatePickerMonthProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.CALENDAR);

  const dismiss = useCallback(() => setDisplay(false), [setDisplay]);

  const { position, floatingElementRef } = useFixedElementPosition({
    anchorRef: inputContainerRef,
    marginFromAnchor: 16,
  });

  useOutsideClick({
    ref: containerRef,
    active: display,
    cb: dismiss,
  });

  const toggleView = () => {
    if (viewMode === ViewModes.CALENDAR)
      return setViewMode(ViewModes.MONTH_SELECTION);
    setViewMode(ViewModes.CALENDAR);
  };

  return createPortal(
    <AnimatePresence>
      {display && (
        <div ref={containerRef}>
          <MonthContainer
            id="test"
            {...fadeAnimation}
            ref={floatingElementRef}
            $position={position}
          >
            {viewMode === ViewModes.CALENDAR && (
              <CalendarView
                changeView={toggleView}
                dismiss={dismiss}
                displayedMonth={displayedMonth}
                onDateChange={onDateChange}
                onMonthChange={onMonthChange}
                selectedDate={selectedDate}
              />
            )}
            {viewMode === ViewModes.MONTH_SELECTION && (
              <MonthSelectionView
                minimum={minimum}
                maximum={maximum}
                changeView={toggleView}
                yearOnScreen={yearOnScreen}
                monthOnScreen={monthOnScreen}
                onMonthScreenChange={onMonthScreenChange}
              />
            )}
          </MonthContainer>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLElement
  );
};

export { DatePickerPopup };
