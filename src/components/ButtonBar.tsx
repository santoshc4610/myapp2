import { useEffect, useState } from "react";

interface props {
  children: string;
  selectedItems: string[];
}
//let apidata: string[];

const ButtonBar = ({ children, selectedItems }: props) => {
  //const myobj = JSON.stringify(selectedItems);
  const [myobj1, setMyObj1] = useState("");
  //let jsonarray: string[];
  const [apiResponse, setApiresponse] = useState([]);
  const [header, setHeader] = useState([""]);
  //const handleClick = async () => {
  //setMyObj1(JSON.stringify(selectedItems));

  //console.log(myobj);
  //};
  useEffect(() => {
    const fetchData = async () => {
      try {
        fetch(`http://localhost:8080/corspost?myobj=${myobj1}`, {
          mode: "cors",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          //body: myobj1,
        })
          .then((res) => res.json())
          .then((res) => {
            setApiresponse(res);
            const headers = res[0] && Object.keys(res[0]);
            setHeader(headers);
          });

        console.log("came from node");
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, [myobj1]);

  function resulttoui() {
    return (
      <table className="table mx-auto " id="customers">
        <thead>
          <tr>
            {header &&
              header.map((header, id) => (
                <th className="col-sm-2" key={id}>
                  {header}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {apiResponse.map((item) => (
            <tr key={item["NAME"]}>
              <td>{item["NAME"]}</td>
              <td>{item["DESCRIPTION"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div>
      <div className="container buttondiv d-flex justify-content-center ">
        <button
          className="btn btn-primary center-button buttonsize"
          onClick={() => setMyObj1(JSON.stringify(selectedItems))}
        >
          {children}
        </button>
      </div>
      <div className="container d-flex justify-content-center">
        {resulttoui()}
      </div>
    </div>
  );
};

export default ButtonBar;
