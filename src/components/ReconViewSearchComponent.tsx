import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Card,
  Divider,
  Grid2,
  Paper,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useEffect, useState } from "react";
//import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PieChartComponent from "./PieChartComponent";
import ReconViewTableComponent from "./ReconViewTableComponent";

interface pieCharInfo {
  label: string;
  value: number;
}

interface ReconDetails {
  RequestTmisId: string;
  RequestStatus: string;
  Transactionid: string;
  ResponseTmisId: string;
  ResponseStatus: string;
  FinalStatus: string;
}

const ReconViewSearchComponent = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const [pieCharInfoState, setPieChartInfoState] = useState<pieCharInfo[]>([
    { label: 'Completed', value: 28 },
    { label: 'Failed', value: 6 },
    { label: 'Pending', value: 5 }
  ]);
  const [pieCharAccountPosting, setPieCharAccountPosting] =
    useState<pieCharInfo[]>([
      { label: 'Posting Completed', value: 6 },
      { label: 'Response Not Processed', value: 2 },
      { label: 'Response Not Received', value: 5 },
      { label: 'Request Not Processed', value: 2 }
    ]
    );
  const [reconDetails, setReconDetails] = useState<ReconDetails[]>();
  // const [click, setClick] = useState(false);
  //const [filter, setFilter] = useState(false);
  const [headers, setHeaders] = useState([""]);
  const handleEndDate = (date: Date) => {
    setSelectedEndDate(date);
  };

  const filterDatafunc = (label: string) => {
    console.log("I am called from piecharcomponent in search comp");
    console.log(label);
    fetchDetailRecords(label);
  };
  let pieCharInfoList: pieCharInfo[] = [];
  const ReconDetailList: ReconDetails[] = [];

  //const handleClick = () => {
  // setClick(true);
  //};

  const fetchAccountPostingRecon = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/fetchAccountPostingRecon`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      handleApiRespose(data);
      setPieCharAccountPosting(pieCharInfoList);
      // console.log(res);

      console.log("After fetching accounting chart info");
    } catch (e) {
      console.log(e);
    }
  };

  const fetchApplicationStats = async () => {
    try {
      const res = await fetch(`http://localhost:8080/fetchStats`, {
        mode: "cors",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      const data = await res.json();
      handleApiRespose(data);
      setPieChartInfoState(pieCharInfoList);
      console.log(pieCharInfoList);

      console.log("After fetching Pie chart info");
    } catch (e) {
      console.log(e);
    }
  };

  const handleApiRespose = (res: []) => {
    pieCharInfoList = [];
    res.map((item) => {
      const itemLabel = item["LABEL"];
      const itemValue = item["VALUE"];

      console.log(pieCharInfoList);
      const pieChartInfo: pieCharInfo = {
        label: itemLabel,
        value: itemValue,
      };
      pieCharInfoList.push(pieChartInfo);
    });
    console.log(pieCharInfoList[0].value);
  };

  const handleReconDetails = (res: []) => {
    res.map((item) => {
      const RequestTmisId = item["REQUESTTMISID"];
      const RequestStatus = item["REQUESTSTATUS"];
      const Transactionid = item["TRANSACTIONID"];
      const ResponseTmisId = item["RESPONSETMISID"];
      const ResponseStatus = item["RESPONSESTATUS"];
      const FinalStatus = item["FINALSTATUS"];

      const ReconDetail: ReconDetails = {
        RequestTmisId: RequestTmisId,
        RequestStatus: RequestStatus,
        Transactionid: Transactionid,
        ResponseTmisId: ResponseTmisId,
        ResponseStatus: ResponseStatus,
        FinalStatus: FinalStatus,
      };
      ReconDetailList.push(ReconDetail);
    });
  };

  const fetchDetailRecords = async (status: string) => {
    console.log(status);
    try {
      const res = await fetch(
        `http://localhost:8080/fetchDetails?finalstatus=${status}`,
        {
          mode: "cors",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      handleReconDetails(data);
      const headers = data[0] && Object.keys(data[0]);
      setHeaders(headers);
      setReconDetails(ReconDetailList);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log("coming to fetch piechart information");
    const fetchData = async () => {
      await Promise.all([fetchApplicationStats(), fetchAccountPostingRecon()]);
    };
    fetchData();
  }, []);

  return (
    <div style={{ margin: "5px" }}>
      <Card style={{ padding: "5px" }}>
        <Grid2 container spacing={2}>
          <Grid2 size={5}>
            <label htmlFor="date-picker">Start Date :&emsp;</label>
            <DatePicker
              selected={selectedStartDate}
              onChange={(date) => setSelectedStartDate(date as Date)}
              placeholderText="Start Date"
            />
          </Grid2>

          <Grid2 size={5}>
            <label htmlFor="date-picker"> End Date : &emsp; </label>
            <DatePicker
              popperPlacement="right"
              selected={selectedEndDate}
              onChange={(date) => handleEndDate(date as Date)}
              placeholderText=" End Date"
            />
          </Grid2>
          <Grid2 size={2}>
            <Button
              style={{ bottom: "10%", left: "20%" }}
              variant="contained"
              size="small"
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </Card>
      <h1></h1>
      <Card>
        <Grid2 size={12} container spacing={2}>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Application Overview</h1>
              {!pieCharInfoState ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharInfoState}
                  filterDatafunc={filterDatafunc}
                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Account Posting</h1>
              {!pieCharAccountPosting ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharAccountPosting}
                  filterDatafunc={filterDatafunc}

                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
              {/* <Button
              style={{
                top: "50%",
                left: "80%",
                transform: "translate(-50%, -50%)",
              }}
              variant="contained"
              size="small"
              onClick={() => fetchDetailRecords("")}
            >
              View Details
            </Button> */}
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Account Posting</h1>
              {!pieCharAccountPosting ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharAccountPosting}
                  filterDatafunc={filterDatafunc}

                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
              {/* <Button
              style={{
                top: "50%",
                left: "80%",
                transform: "translate(-50%, -50%)",
              }}
              variant="contained"
              size="small"
              onClick={() => fetchDetailRecords("")}
            >
              View Details
            </Button> */}
            </Paper>
            <Paper></Paper>
          </Grid2>
        </Grid2>

        <h1></h1>

        <Grid2 size={12} container spacing={2}>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Application Overview</h1>
              {!pieCharInfoState ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharInfoState}
                  filterDatafunc={filterDatafunc}
                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Account Posting</h1>
              {!pieCharAccountPosting ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharAccountPosting}
                  filterDatafunc={filterDatafunc}

                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
              {/* <Button
              style={{
                top: "50%",
                left: "80%",
                transform: "translate(-50%, -50%)",
              }}
              variant="contained"
              size="small"
              onClick={() => fetchDetailRecords("")}
            >
              View Details
            </Button> */}
            </Paper>
          </Grid2>
          <Grid2 size={4}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Account Posting</h1>
              {!pieCharAccountPosting ? (
                <p>loading</p>
              ) : (
                <PieChartComponent
                  pieCharInfoState={pieCharAccountPosting}
                  filterDatafunc={filterDatafunc}

                //selectedReconDetails={selectedReconDetails}
                ></PieChartComponent>
              )}
              {/* <Button
              style={{
                top: "50%",
                left: "80%",
                transform: "translate(-50%, -50%)",
              }}
              variant="contained"
              size="small"
              onClick={() => fetchDetailRecords("")}
            >
              View Details
            </Button> */}
            </Paper>
            <Paper></Paper>
          </Grid2>
        </Grid2>
      </Card>

      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Paper>
            {!reconDetails ? (
              ""
            ) : (
              <ReconViewTableComponent
                reconDetails={reconDetails}
                headers={headers}
              ></ReconViewTableComponent>
            )}
          </Paper>
        </Grid2>
        <Grid2 size={12}></Grid2>
      </Grid2>
    </div>
  );
};

export default ReconViewSearchComponent;
