import { format, parse, isValid, isBefore, isAfter } from "date-fns";
import { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { IconButton, InputContainer } from "./date-picker-input.styles";
import { CalendarBlank } from "@phosphor-icons/react";
import { DateFormats } from "../date-picker.types";

interface DatePickerInputProps {
  minimum: Date;
  maximum: Date;
  onChange: (date: Date | null) => void;
  selectedDate: Date | null;
  onCalendarClick: () => void;
}

export const DatePickerInput = ({
  minimum,
  maximum,
  onChange,
  selectedDate,
  onCalendarClick,
}: DatePickerInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  const [inputState, setInputState] = useState(
    selectedDate ? format(selectedDate, DateFormats.BRAZILIAN) : ""
  );

  useEffect(() => {
    if (!selectedDate) return;
    setInputState(format(selectedDate, DateFormats.BRAZILIAN));
  }, [selectedDate]);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(ev.target.value);
    if (!ev.target.value) {
      setHasError(false);
      return;
    }
    const parsedDate = parse(
      ev.target.value,
      DateFormats.BRAZILIAN,
      new Date()
    );

    if (!isValid(parsedDate)) return setHasError(false);
    if (!isBefore(minimum, parsedDate) || !isAfter(maximum, parsedDate))
      return setHasError(true);

    setHasError(false);
    onChange(parsedDate);
  };

  const clear = () => {
    onChange(null);
    setInputState("");
  };

  return (
    <>
      <input
        hidden
        type="date"
        min={format(minimum, DateFormats.DEFAULT)}
        max={format(maximum, DateFormats.DEFAULT)}
        value={
          selectedDate ? format(selectedDate, DateFormats.DEFAULT) : undefined
        }
      />
      <InputContainer>
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          value={inputState}
          onChange={handleChange}
          inputRef={inputRef}
          placeholder={format(new Date(), DateFormats.BRAZILIAN)}
        />
        <IconButton onClick={onCalendarClick}>
          <CalendarBlank size={20} />
        </IconButton>
      </InputContainer>
    </>
  );
};
