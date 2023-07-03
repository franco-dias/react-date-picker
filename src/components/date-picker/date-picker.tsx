import { useMemo, useState } from "react";
import { DatePickerMonth } from "./date-picker-month";
import { format, parse, startOfDay } from "date-fns";
import { monthOptions, yearOptions } from "./date-picker.helpers";

interface DatePickerProps {
  value?: Date | null;
}

export const DatePicker = ({ value }: DatePickerProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null
  );

  const [displayDate, setDisplayDate] = useState(selectedDate || new Date());

  const displayMonth = useMemo(() => format(displayDate, "MM"), [displayDate]);
  const displayYear = useMemo(() => format(displayDate, "yyyy"), [displayDate]);

  const onDisplayMonthChange = (
    ev: React.ChangeEvent<HTMLSelectElement>,
    whatChanged: string
  ) => {
    const { value } = ev.target;
    if (whatChanged === "month")
      return setDisplayDate(
        parse(`${displayYear}-${value}`, "yyyy-MM", new Date())
      );

    return setDisplayDate(
      parse(`${value}-${displayMonth}`, "yyyy-MM", new Date())
    );
  };

  return (
    <div>
      <p>
        Selected date:{" "}
        {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null"}
      </p>

      <select
        value={displayMonth}
        onChange={(ev) => onDisplayMonthChange(ev, "month")}
      >
        {monthOptions.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
      <select
        value={displayYear}
        onChange={(ev) => onDisplayMonthChange(ev, "year")}
      >
        {yearOptions.map((year) => (
          <option key={year.value} value={year.label}>
            {year.label}
          </option>
        ))}
      </select>
      <DatePickerMonth
        displayDate={displayDate}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
        onMonthChange={setDisplayDate}
      />
    </div>
  );
};
