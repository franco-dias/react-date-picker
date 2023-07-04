import { useCallback, useRef, useState } from "react";
import { DatePickerPopup } from "./date-picker-popup/date-picker-popup";
import { format, startOfDay } from "date-fns";
// import { monthOptions, yearOptions } from "./date-picker.helpers";
import { DatePickerInput } from "./date-picker-input/date-picker-input";
import { useCurrentMonth } from "./use-current-month";
import { DatePickerContainer } from "./date-picker.styles";

interface DatePickerProps {
  value?: Date | null;
  minimum?: Date;
  maximum?: Date;
}

export const DatePicker = ({
  value,
  minimum = new Date(1900, 0, 1),
  maximum = new Date(),
}: DatePickerProps) => {
  const inputContainerRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null
  );
  const [displayPopup, setDisplayPopup] = useState(false);

  const {
    monthOnScreen,
    yearOnScreen,
    onMonthScreenChange,
    monthAndYearOnScreen,
    setMonthAndYearOnScreen,
  } = useCurrentMonth(selectedDate);

  const onInputChange = useCallback(
    (date: Date | null) => {
      setSelectedDate(date);
    },
    [setSelectedDate]
  );

  return (
    <DatePickerContainer>
      <p>
        {`Selected date: ${
          selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null"
        }`}
      </p>
      <div ref={inputContainerRef}>
        <DatePickerInput
          minimum={minimum}
          maximum={maximum}
          onChange={onInputChange}
          selectedDate={selectedDate}
          onCalendarClick={() => setDisplayPopup(true)}
        />
      </div>
      <DatePickerPopup
        yearOnScreen={yearOnScreen}
        monthOnScreen={monthOnScreen}
        onMonthScreenChange={onMonthScreenChange}
        display={displayPopup}
        selectedDate={selectedDate}
        setDisplay={setDisplayPopup}
        onDateChange={setSelectedDate}
        inputContainerRef={inputContainerRef}
        displayedMonth={monthAndYearOnScreen}
        onMonthChange={setMonthAndYearOnScreen}
      />
    </DatePickerContainer>
  );
};
