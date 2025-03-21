import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { FormEvent, useState } from "react";

interface props {
  handleClose: () => void;
  add: boolean;
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

const MyForm = ({ handleClose, add, doCompletedList }: props) => {
  const [textFieldList, setTextFieldList] = useState("");
  const [mwtextFieldList, setmwTextFieldList] = useState("");
  const [dbtextFieldList, setDBTextFieldList] = useState("");
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const UIList = textFieldList
      .split(",")
      .map((item) => ({ TechName: item.trim() }));
    const MwList = mwtextFieldList
      .split(",")
      .map((item) => ({ TechName: item.trim() }));
    const DbList = dbtextFieldList
      .split(",")
      .map((item) => ({ TechName: item.trim() }));

    const updatedJsonData2: irequestjson = {
      projectName: projectName,
      UI: UIList,
      MW: MwList,
      DB: DbList,
    };

    const saveData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/saveData`, {
          mode: "cors",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify(updatedJsonData2),
        });
        const res = await response.json();
        if (response.ok) {
          doCompletedList(updatedJsonData2);
        } else {
          console.log("Error from the POST api call:", res);
        }
      } catch (e) {
        console.log(e);
      }
    };
    saveData();
  };

  return (
    <div>
      <div className="form-container">
        <Dialog open={add} onClose={handleClose}>
          <DialogTitle>Add a New Project</DialogTitle>
          <DialogContent>
            <Box component="form" onSubmit={(e) => handleSubmit(e)}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="ProjectName"
                name="ProjectName"
                label="ProjectName"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setProjectName(event.target.value)}
              ></TextField>
              <TextField
                autoFocus
                required
                margin="dense"
                id="UI"
                name="UI"
                label="UI"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setTextFieldList(event.target.value)}
              ></TextField>
              <TextField
                autoFocus
                required
                margin="dense"
                id="MW"
                name="Middleware"
                label="Middleware"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setmwTextFieldList(event.target.value)}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="DB"
                name="DB"
                label="DB"
                type="text"
                fullWidth
                variant="standard"
                onChange={(event) => setDBTextFieldList(event.target.value)}
              />
              <p>**Use Comma seperated list for multple entries</p>

              <Button variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default MyForm;
