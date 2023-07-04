import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MonthContainer } from "./date-picker-popup.styles";
import { fadeAnimation } from "./date-picker-popup.helpers";
import { DatePickerMonthProps } from "./date-picker-popup.types";
import { createPortal } from "react-dom";
import { CalendarView } from "../calendar-view/calendar-view";
import { MonthSelectionView } from "../month-selection-view/month-selection-view";
import { useOutsideClick } from "../../../hooks/use-outside-click";
import { useFixedElementPosition } from "../../../hooks/use-fixed-element-position";

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
            id="test"
            {...fadeAnimation}
            ref={floatingElementRef}
            $position={position}
          >
            {viewMode === ViewModes.CALENDAR && (
              <motion.div {...fadeAnimation}>
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
              </motion.div>
            )}
            {viewMode === ViewModes.MONTH_SELECTION && (
              <motion.div {...fadeAnimation}>
                <MonthSelectionView
                  minimum={minimum}
                  maximum={maximum}
                  changeView={toggleView}
                  yearOnScreen={yearOnScreen}
                  monthOnScreen={monthOnScreen}
                  onMonthScreenChange={onMonthScreenChange}
                />
              </motion.div>
            )}
          </MonthContainer>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root") as HTMLElement
  );
};

export { DatePickerPopup };
