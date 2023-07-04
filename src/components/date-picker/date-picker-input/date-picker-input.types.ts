export interface DatePickerInputProps {
  minimum: Date;
  maximum: Date;
  onChange: (date: Date | null) => void;
  selectedDate: Date | null;
  onCalendarClick: () => void;
}
