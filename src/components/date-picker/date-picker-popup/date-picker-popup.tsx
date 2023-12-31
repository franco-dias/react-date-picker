import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { MonthContainer } from "./date-picker-popup.styles";
import { DatePickerMonthProps } from "./date-picker-popup.types";
import { createPortal } from "react-dom";
import { CalendarView } from "../calendar-view/calendar-view";
import { MonthSelectionView } from "../month-selection-view/month-selection-view";
import { useOutsideClick } from "../../../hooks/use-outside-click";
import { useFixedElementPosition } from "../../../hooks/use-fixed-element-position";
import { fadeAnimation } from "../../../helpers/animations";

export enum ViewModes {
  CALENDAR = "CALENDAR",
  MONTH_SELECTION = "MONTH_SELECTION",
}

const DatePickerPopup = ({
  minimum,
  maximum,
  display,
  setDisplay,
  selectedDate,
  onDateChange,
  yearOnScreen,
  monthOnScreen,
  onMonthChange,
  displayedMonth,
  inputContainerRef,
  onMonthScreenChange,
}: DatePickerMonthProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<ViewModes>(ViewModes.CALENDAR);

  const dismiss = useCallback(() => {
    setViewMode(ViewModes.CALENDAR);
    setDisplay(false);
  }, [setDisplay]);

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
                minimum={minimum}
                maximum={maximum}
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
