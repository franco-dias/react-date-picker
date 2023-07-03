import { useMemo, useRef, useState } from "react";
import { DatePickerMonth } from "./date-picker-month";
import {
  format,
  isAfter,
  isBefore,
  isValid,
  parse,
  startOfDay,
} from "date-fns";
import { monthOptions, yearOptions } from "./date-picker.helpers";
import InputMask from "react-input-mask";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? startOfDay(value) : null
  );
  const [displayDate, setDisplayDate] = useState(selectedDate || new Date());
  const [inputState, setInputState] = useState(
    selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
  );
  const [hasError, setHasError] = useState(false);

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

  const onDateChange = (date: Date) => {
    setSelectedDate(date);
    setInputState(format(date, "dd/MM/yyyy"));
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(ev.target.value);
    if (!ev.target.value) {
      setHasError(false);
      return;
    }
    const parsedDate = parse(ev.target.value, "dd/MM/yyyy", new Date());

    if (!isValid(parsedDate)) return setHasError(false);
    if (!isBefore(minimum, parsedDate) || !isAfter(maximum, parsedDate))
      return setHasError(true);

    setHasError(false);
    setSelectedDate(parsedDate);
    setDisplayDate(parsedDate);
  };

  const clear = () => {
    setSelectedDate(null);
    setDisplayDate(new Date());
    setInputState("");
  };

  return (
    <div>
      <input
        hidden
        type="date"
        min={format(minimum, "yyyy-MM-dd")}
        max={format(maximum, "yyyy-MM-dd")}
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 200,
          margin: "0 auto",
        }}
      >
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          value={inputState}
          onChange={handleChange}
          inputRef={inputRef}
        />
        {hasError && <span>Invalid date!</span>}
      </div>

      <button onClick={clear}>clear</button>

      <p>
        {`Selected date: ${
          selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null"
        }`}
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
        onDateChange={onDateChange}
        onMonthChange={setDisplayDate}
      />
    </div>
  );
};
