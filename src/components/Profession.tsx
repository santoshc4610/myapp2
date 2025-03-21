import {
  Box,
  Button,
  FormControlLabel,
  FormGroup,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PaperComponent from "./PaperComponent";
import Architeture from "./Architecture.png";
import { useEffect, useState } from "react";
import FloatingActionButtonComponent from "./FloatingActionButtonComponent";
import DeleteIcon from "@mui/icons-material/Delete"; // Import DeleteIcon

const Profession = () => {
  // const currentProject = [
  // { key: "UI", value: "React" },
  //{ key: "UI", value: "Material UI" },
  //{ key: "MW", value: "Spring Boot" },
  //{ key: "MW", value: "Java" },
  // { key: "DB", value: "Oracle EXA DATA" },
  //];

  //const UiList = ["React", "Material UI"];
  //const MWList = ["SpringBoot", "Java"];
  //const DBList = ["Oracle ExaData", "SQL Server"];

  // const intesaUiList = ["Flexcube"];
  //const intesaMWList = ["ODI", "IIB"];
  //const intesaDBList = ["Oracle 11g", "SQL Server"];
  //const fullList = [
  //{ key: "UI", value: UiList },
  //{ key: "MW", value: MWList },
  //{ key: "DB", value: DBList },
  //];
  interface techListClass {
    TechName: string;
  }

  interface iResposeJson {
    projectName: string;
    UI: techListClass[];
    MW: techListClass[];
    DB: techListClass[];
  }

  //const IntesaList = [
  //{ key: "UI", value: intesaUiList },
  //{ key: "MW", value: intesaMWList },
  //{ key: "DB", value: intesaDBList },
  //];

  const [showDgm, setShowDgm] = useState(false);
  //const [showBibDgm, setShowBibDgm] = useState(false);
  //const [apiResponse, setApiresponse] = useState([]);
  // const [postData, setPostData] = useState(false);
  //const [loading, setLoading] = useState(true);
  const [completedList, setCompletedList] = useState<iResposeJson[]>([
    {
      projectName: "",
      UI: [],
      MW: [],
      DB: [],
    },
  ]);

  const handleDelete = () => {
    console.log("Deleteing this entry");
  };
  const doCompletedList = (value: iResposeJson) => {
    setCompletedList([...completedList, value]);
  };
  const handleChange = () => {
    setShowDgm(!showDgm);
  };

  const handleApiRespose = (res: []) => {
    console.log("entered api response");
    const completeListArray: iResposeJson[] = [];

    res.map((item) => {
      const list1 = item["INPUTPAYLOAD"]["DB"];
      const list2 = item["INPUTPAYLOAD"]["MW"];
      const list3 = item["INPUTPAYLOAD"]["UI"];
      const projectName = item["INPUTPAYLOAD"]["projectName"];
      const completeList: iResposeJson = {
        projectName: projectName,
        UI: list3 || [],
        MW: list2 || [],
        DB: list1 || [],
      };
      completeListArray.push(completeList);
    });
    setCompletedList(completeListArray);
  };
  useEffect(() => {
    console.log("coming inside first effect");
    //setPostData(true);
    const fetchData = async () => {
      try {
        fetch(`http://localhost:8080/fetchProfession`, {
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
            //              setApiresponse(res);
            handleApiRespose(res);
            console.log(res);
            // const headers = res[0] && Object.keys(res[0]);
            //setHeader(headers);
          });

        console.log("came from node after fetching");
        //doPostData(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I am a Software
        Engineer &nbsp;
        <p></p>
      </h1>

      <Button variant="contained" startIcon={<PlayCircleFilledIcon />}>
        Let's Begin
      </Button>

      {completedList.map((item, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "lightgreen",
            }}
          >
            <Typography>{item.projectName}</Typography>
          </AccordionSummary>

          <AccordionDetails sx={{ backgroundColor: "lightgrey" }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 128,
                  height: 128,
                },
              }}
            >
              {Object.entries(item).map(([key, value]) =>
                key === "UI" || key === "MW" || key === "DB" ? (
                  <PaperComponent key={key} value={value}></PaperComponent>
                ) : null
              )}
            </Box>
            <FormGroup>
              <FormControlLabel
                control={<Switch onChange={handleChange} />}
                label="Architecture Diagram"
              />
            </FormGroup>
            {showDgm ? (
              <img
                style={{ width: "600px", height: "300px" }}
                src={Architeture}
              ></img>
            ) : null}
            <IconButton onClick={handleDelete} sx={{ marginLeft: "500px" }}>
              <DeleteIcon />
            </IconButton>
          </AccordionDetails>
        </Accordion>
      ))}
      <FloatingActionButtonComponent
        doCompletedList={doCompletedList}
      ></FloatingActionButtonComponent>
    </div>
  );
};

export default Profession;
