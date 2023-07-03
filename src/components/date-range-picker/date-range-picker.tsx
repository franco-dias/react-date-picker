import { useState } from "react";
import { RangeContainer } from "./date-range-picker.styles";
import { DatePicker } from "../date-picker/date-picker";
import { format } from "date-fns";

export interface Range {
  start: Date | null;
  end: Date | null;
}

export const DateRangePicker = () => {
  const [range, setRange] = useState<Range>({
    start: new Date(2023, 6, 2),
    end: new Date(2023, 6, 12),
  });

  return (
    <>
      <h4>
        Selected range:{" "}
        {range.start ? format(range.start, "yyyy-MM-dd") : "null"} to{" "}
        {range.end ? format(range.end, "yyyy-MM-dd") : "null"}
      </h4>
      <RangeContainer>
        <DatePicker />
      </RangeContainer>
    </>
  );
};
