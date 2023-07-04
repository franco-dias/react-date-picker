export interface CalendarViewProps {
  dismiss(): void;
  changeView(): void;
  displayedMonth: Date;
  selectedDate: Date | null;
  minimum: Date;
  maximum: Date;
  onDateChange(date: Date): void;
  onMonthChange(date: Date): void;
}
