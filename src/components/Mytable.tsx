//import { useState } from "react";
//import { ChangeEvent, useState } from "react";
//import ButtonBar from "./ButtonBar";
import ButtonBar from "./ButtonBar";
import "./Mytable.css";
import { ChangeEvent, useState } from "react";
//const items = ["Fender", "Gibson", "Yamaha"];
interface props {
  items: string[];
}

const Mytable = ({ items }: props) => {
  const [selectedName, setSelectedName] = useState([""]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleselectall = () => {
    console.log("Coming inside selectall");
    console.log(items.length);
    console.log(selectedName.length - 1);
    setSelectAllChecked(!selectAllChecked);
    if (selectAllChecked) {
      setSelectedName([""]); //Deselect all
    } else {
      setSelectedName(items);
    }
  };

  const handleSelectedId = (event: ChangeEvent<HTMLInputElement>) => {
    const itemName = event.target.value;
    if (event.target.checked) {
      console.log(event.target.value);
      setSelectedName([...selectedName, itemName]);
      console.log(selectedName);
    } else {
      setSelectedName(selectedName.filter((id) => id !== itemName));
    }
  };

  return (
    <div className="container ">
      <div className="container first tableContainer">
        <table className="table mx-auto " id="customers">
          <thead>
            <tr>
              <th className="col-sm-2">
                <input
                  type="checkbox"
                  id="btncheck1"
                  checked={selectAllChecked}
                  onChange={handleselectall}
                ></input>
              </th>
              <th className="col-sm-2">No</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, id) => (
              <tr key={item}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectAllChecked || selectedName.includes(item)}
                    value={item}
                    onChange={handleSelectedId}
                  ></input>
                </td>
                <td>{id + 1} </td>
                <td>{item} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="container">
        <ButtonBar selectedItems={selectedName}>Fetch</ButtonBar>
      </div>
    </div>
  );
};

export default Mytable;
