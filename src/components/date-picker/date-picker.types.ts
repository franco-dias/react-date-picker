export enum DateFormats {
  DEFAULT = "yyyy-MM-dd",
  BRAZILIAN = "dd/MM/yyyy",
  YEAR_MONTH = "yyyy-MM",
}

export interface DatePickerProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
  minimum?: Date;
  maximum?: Date;
}
