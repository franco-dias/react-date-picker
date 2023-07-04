import { useState } from "react";
import { DatePicker } from "./components/date-picker/date-picker";
import { DateFormats } from "./components/date-picker/date-picker.types";
import { format } from "date-fns";

function App() {
  const [date, setDate] = useState<Date | null>(new Date(1997, 7, 12));

  return (
    <>
      <p>{date && format(date, DateFormats.DEFAULT)}</p>
      <DatePicker value={date} onChange={setDate} />
    </>
  );
}

export default App;
