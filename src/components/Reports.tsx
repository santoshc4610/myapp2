import { ChangeEvent, useState } from "react";

import Mytable from "./Mytable";

//import ButtonBar from "./components/ButtonBar";

function Reports() {
  const items = ["Fender", "Gibson", "Gretsch", "Yamaha"];
  const Ampitems = [
    "Vox",
    "BadCat",
    "Dumble",
    "Marshall",
    "BlackStar",
    "Kustom",
    "Engl",
  ];

  const drumItems = ["Yamaha", "Pearl", "Sonor", "Stagg", "Tama", "Dw"];
  const keyItems = ["Casio", "Yamaha", "Korg", "Novation", "Moog", "Arturia"];

  const [selectedOption, setSelectedOption] = useState("options");

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    console.log(event.target.value);
  };

  return (
    <>
      <div className="container">
        <h1></h1>
        <div className="small-box ">
          <select
            className="form-select form-select-sm"
            onChange={handleSelectChange}
            value={selectedOption}
          >
            <option value="options"></option>
            <option value="option1">Guitars</option>
            <option value="option2">Amps</option>
            <option value="option3">Drums</option>
            <option value="option4">Keys</option>
          </select>
          <h1></h1>
        </div>

        {selectedOption === "option1" && <Mytable items={items} />}
        {selectedOption === "option2" && <Mytable items={Ampitems} />}
        {selectedOption === "option3" && <Mytable items={drumItems} />}
        {selectedOption === "option4" && <Mytable items={keyItems} />}
      </div>
    </>
  );
}

export default Reports;
