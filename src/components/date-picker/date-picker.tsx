import { useCallback, useRef, useState } from "react";
import { startOfDay } from "date-fns";

import { DatePickerPopup } from "./date-picker-popup/date-picker-popup";
import { DatePickerInput } from "./date-picker-input/date-picker-input";
import { useCurrentMonth } from "./use-current-month";
import { DatePickerContainer } from "./date-picker.styles";

import { DatePickerProps } from "./date-picker.types";

export const DatePicker = ({
  value,
  onChange,
  minimum = new Date(1900, 0, 1),
  maximum = new Date(),
}: DatePickerProps) => {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const [displayPopup, setDisplayPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null
  );

  const onDateChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
      onChange(date);
    },
    [setSelectedDate, onChange]
  );

  const {
    yearOnScreen,
    monthOnScreen,
    onMonthScreenChange,
    monthAndYearOnScreen,
    setMonthAndYearOnScreen,
  } = useCurrentMonth(selectedDate);

  return (
    <DatePickerContainer>
      <div ref={inputContainerRef}>
        <DatePickerInput
          minimum={minimum}
          maximum={maximum}
          onChange={onDateChange}
          selectedDate={selectedDate}
          onCalendarClick={() => setDisplayPopup(true)}
        />
      </div>
      <DatePickerPopup
        minimum={minimum}
        maximum={maximum}
        display={displayPopup}
        selectedDate={selectedDate}
        yearOnScreen={yearOnScreen}
        setDisplay={setDisplayPopup}
        onDateChange={onDateChange}
        monthOnScreen={monthOnScreen}
        inputContainerRef={inputContainerRef}
        displayedMonth={monthAndYearOnScreen}
        onMonthChange={setMonthAndYearOnScreen}
        onMonthScreenChange={onMonthScreenChange}
      />
    </DatePickerContainer>
  );
};
