import { useCallback, useState } from "react";
import { DatePickerMonth } from "./date-picker-month/date-picker-month";
import { format, startOfDay } from "date-fns";
import { monthOptions, yearOptions } from "./date-picker.helpers";
import { DatePickerInput } from "./date-picker-input/date-picker-input";
import { useCurrentMonth } from "./use-current-month";

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
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null
  );

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
    <div>
      <DatePickerInput
        minimum={minimum}
        maximum={maximum}
        selectedDate={selectedDate}
        onChange={onInputChange}
      />
      <p>
        {`Selected date: ${
          selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null"
        }`}
      </p>

      <select
        value={monthOnScreen}
        onChange={(ev) => onMonthScreenChange(ev, "month")}
      >
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <select
        value={yearOnScreen}
        onChange={(ev) => onMonthScreenChange(ev, "year")}
      >
        {yearOptions.map((year) => (
          <option key={year.value} value={year.label}>
            {year.label}
          </option>
        ))}
      </select>
      <DatePickerMonth
        displayedMonth={monthAndYearOnScreen}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onMonthChange={setMonthAndYearOnScreen}
      />
    </div>
  );
};
