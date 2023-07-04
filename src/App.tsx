import { useState } from "react";
import { DatePicker } from "./components/date-picker/date-picker";

function App() {
  const [date, setDate] = useState<Date | null>(new Date(1997, 7, 12));

  return <DatePicker value={date} onChange={setDate} />;
}

export default App;
