import { Dispatch, SetStateAction } from "react";

export interface DatePickerMonthProps {
  display: boolean;
  displayedMonth: Date;
  selectedDate: Date | null;
  onDateChange: (newDate: Date) => void;
  onMonthChange: (newDate: Date) => void;
  setDisplay: Dispatch<SetStateAction<boolean>>;
  inputContainerRef: React.RefObject<HTMLDivElement>;
  yearOnScreen: string;
  monthOnScreen: string;
  onMonthScreenChange: (value: string, whatChanged: string) => void;
  minimum: Date;
  maximum: Date;
}

export enum NavigationKeys {
  ARROW_DOWN = "ArrowDown",
  ARROW_UP = "ArrowUp",
  ARROW_LEFT = "ArrowLeft",
  ARROW_RIGHT = "ArrowRight",
}
