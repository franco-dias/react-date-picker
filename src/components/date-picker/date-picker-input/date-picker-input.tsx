import { format, parse, isValid, isBefore, isAfter } from "date-fns";
import { useEffect, useRef, useState } from "react";
import InputMask from "react-input-mask";
import { IconButton, InputContainer } from "./date-picker-input.styles";
import { CalendarBlank } from "@phosphor-icons/react";

interface DatePickerInputProps {
  minimum: Date;
  maximum: Date;
  onChange: (date: Date | null) => void;
  selectedDate: Date | null;
}

export const DatePickerInput = ({
  minimum,
  maximum,
  onChange,
  selectedDate,
}: DatePickerInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasError, setHasError] = useState(false);

  const [inputState, setInputState] = useState(
    selectedDate ? format(selectedDate, "dd/MM/yyyy") : ""
  );

  useEffect(() => {
    if (!selectedDate) return;
    setInputState(format(selectedDate, "dd/MM/yyyy"));
  }, [selectedDate]);

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
        min={format(minimum, "yyyy-MM-dd")}
        max={format(maximum, "yyyy-MM-dd")}
        value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : undefined}
      />
      <InputContainer>
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          value={inputState}
          onChange={handleChange}
          inputRef={inputRef}
          placeholder={format(new Date(), "dd/MM/yyyy")}
        />
        <IconButton>
          <CalendarBlank size={20} />
        </IconButton>
      </InputContainer>
    </>
  );
};
