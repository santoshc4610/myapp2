import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import MyForm from "./MyForm";
interface props {
  doCompletedList: (value: irequestjson) => void;
}

interface techClass {
  TechName: string;
}

interface irequestjson {
  projectName: string;
  UI: techClass[];
  MW: techClass[];
  DB: techClass[];
}

const FloatingActionButtonComponent = ({ doCompletedList }: props) => {
  const [add, setAdd] = useState(false);
  const handleAdd = () => {
    setAdd(true);
  };

  const handleClose = () => {
    setAdd(false);
  };

  return (
    <div>
      <Tooltip title="Add your Project details here" placement="top">
        <Fab
          color="primary"
          aria-label="add"
          style={{ position: "absolute", right: "600px" }}
          onClick={handleAdd}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      {add ? (
        <div>
          <MyForm
            doCompletedList={doCompletedList}
            add={add}
            handleClose={handleClose}
          ></MyForm>
        </div>
      ) : null}
    </div>
  );
};

export default FloatingActionButtonComponent;
