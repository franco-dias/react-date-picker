import { Dispatch, SetStateAction } from "react";

export interface DatePickerMonthProps {
  display: boolean;
  displayedMonth: Date;
  selectedDate: Date | null;
  onDateChange: (newDate: Date) => void;
  onMonthChange: (newDate: Date) => void;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  inputContainerRef: React.RefObject<HTMLDivElement>;
}
