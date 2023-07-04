import { CaretLeft } from "@phosphor-icons/react";
import { Header } from "../date-picker-popup/date-picker-popup.styles";
import { MonthGrid, Option } from "./month-selection-view.styles";
import { monthOptions, yearOptions } from "../date-picker.helpers";
import { useEffect } from "react";
interface MonthSelectionViewProps {
  changeView(): void;
  yearOnScreen: string;
  monthOnScreen: string;
  minimum: Date;
  maximum: Date;
  onMonthScreenChange: (value: string, whatChanged: string) => void;
}

export const MonthSelectionView = ({
  minimum,
  maximum,
  changeView,
  yearOnScreen,
  monthOnScreen,
  onMonthScreenChange,
}: MonthSelectionViewProps) => {
  useEffect(() => {
    document.getElementById(`year-${yearOnScreen}`)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.getElementById(`month-${monthOnScreen}`)?.scrollIntoView();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onYearClick = (year: string) => () => {
    onMonthScreenChange(year, "year");
    changeView();
  };

  return (
    <>
      <Header style={{ justifyContent: "flex-start" }}>
        <button onClick={changeView} title="Back to calendar">
          <CaretLeft />
        </button>
      </Header>
      <MonthGrid>
        <div className="option-list">
          {/* @TODO - add month validation based on current year */}
          {monthOptions.map((month) => (
            <Option
              key={month.value}
              id={`month-${month.value}`}
              $highlighted={monthOnScreen === month.value}
              onClick={() => onMonthScreenChange(month.value, "month")}
            >
              {month.label}
            </Option>
          ))}
        </div>
        <div className="option-list year">
          {yearOptions(minimum, maximum).map((year) => (
            <Option
              key={year.value}
              id={`year-${year.value}`}
              $highlighted={yearOnScreen === year.value}
              onClick={onYearClick(year.value)}
            >
              {year.label}
            </Option>
          ))}
        </div>
      </MonthGrid>
    </>
  );
};
