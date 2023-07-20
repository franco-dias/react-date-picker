import { memo, useState } from "react";
import { DateFormats } from "./components/date-picker/date-picker.types";
import { format } from "date-fns";
import { Select } from "./components/select/select";
import { DatePicker } from "./components/date-picker/date-picker";
import { PokemonOption } from "./app.styles";
import { Option } from "./components/select/select.types";

const options = [
  {
    label: "Pikachu",
    value: "pikachu",
    data: {
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
      type: "Electric",
    },
  },
  {
    label: "Bulbasaur",
    value: "bulbasaur",
    data: {
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      type: "Poison",
    },
  },
  {
    label: "Squirtle",
    value: "squirtle",
    data: {
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
      type: "Water",
    },
  },
  {
    label: "Charmander",
    value: "charmander",
    data: {
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png",
      type: "Fire",
    },
  },
  {
    label: "Mewtwo",
    value: "mewtwo",
    data: {
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/150.png",
      type: "Psychic",
    },
  },
];

interface Data {
  image: string;
  type: string;
}

const renderCustomOption = (data: Option<Data>) => (
  <PokemonOption>
    <img src={data.data?.image} alt={data.label} />
    <div>
      <p>{data.label}</p>
      <span>{data.data?.type}</span>
    </div>
  </PokemonOption>
);

function App() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <p>{date && format(date, DateFormats.DEFAULT)}</p>
      {/* <DatePicker value={date} onChange={setDate} /> */}
      <Select<Data>
        options={options}
        initialValue="pikachu"
        renderOption={renderCustomOption}
      />
    </>
  );
}

export default App;
