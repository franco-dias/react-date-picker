import { format, isValid } from "date-fns";
import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import {
  IconButton,
  InputContainer,
  InputField,
} from "./date-picker-input.styles";
import { CalendarBlank } from "@phosphor-icons/react";
import { DateFormats } from "../date-picker.types";
import { DatePickerInputProps } from "./date-picker-input.types";
import { isBetween, parseDate } from "../../../helpers/date";

export const DatePickerInput = ({
  minimum,
  maximum,
  onChange,
  selectedDate,
  onCalendarClick,
}: DatePickerInputProps) => {
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
      return;
    }
    const { value } = ev.target;
    const parsedDate = parseDate(value, DateFormats.BRAZILIAN);

    if (!isValid(parsedDate) || !isBetween(parsedDate, minimum, maximum))
      return;

    onChange(parsedDate);
  };

  return (
    <InputField>
      <input
        hidden
        type="date"
        min={format(minimum, DateFormats.DEFAULT)}
        max={format(maximum, DateFormats.DEFAULT)}
        value={
          selectedDate ? format(selectedDate, DateFormats.DEFAULT) : undefined
        }
        onChange={handleChange}
      />
      <InputContainer>
        <InputMask
          mask="99/99/9999"
          maskChar={null}
          value={inputState}
          onChange={handleChange}
          placeholder={format(new Date(), DateFormats.BRAZILIAN)}
        />
        <IconButton onClick={onCalendarClick}>
          <CalendarBlank size={20} />
        </IconButton>
      </InputContainer>
    </InputField>
  );
};
