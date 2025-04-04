import {
  AppBar,
  Card,
  Dialog,
  Grid2,
  IconButton,
  Paper,
  Toolbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
//import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import PieChartComponent from "./PieChartComponent";
import ReconViewTableComponent from "./ReconViewTableComponent";
import BarChartComponent from "./BarChartComponent";
import { DatasetType } from "@mui/x-charts/internals";

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
  const [barChartDataSet, setBarChartDataSet] = useState<DatasetType>();
  const [pieCharInfoState, setPieChartInfoState] = useState<pieCharInfo[]>([
    { label: "Completed", value: 28 },
    { label: "Failed", value: 6 },
    { label: "Pending", value: 5 },
  ]);
  const [pieCharAccountPosting, setPieCharAccountPosting] = useState<
    pieCharInfo[]
  >([]);
  const [reconDetails, setReconDetails] = useState<ReconDetails[]>();
  const [dialogOpen, setDialogOpen] = useState(true);

  const [headers, setHeaders] = useState([""]);
  const filterDatafunc = (label: string) => {
    console.log("I am called from piecharcomponent in search comp");
    console.log(label);
    setDialogOpen(true);
    fetchDetailRecords(label);
  };
  let pieCharInfoList: pieCharInfo[] = [];
  const ReconDetailList: ReconDetails[] = [];

  const fetchAccountPostingRecon = async () => {
    const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd");
    const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd");
    try {
      const res = await fetch(
        `http://localhost:8080/fetchAccountPostingRecon?startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
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
    const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd");
    const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd");

    try {
      const res = await fetch(
        `http://localhost:8080/fetchStats?startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
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
      setPieChartInfoState(pieCharInfoList);
      console.log(pieCharInfoList);

      console.log("After fetching Pie chart info");
    } catch (e) {
      console.log(e);
    }
  };
  const fetchBarChartStats = async () => {
    const formattedStartDate = format(selectedStartDate, "yyyy-MM-dd");
    const formattedEndDate = format(selectedEndDate, "yyyy-MM-dd");
    try {
      const res = await fetch(
        `http://localhost:8080/fetchSurge?startdate=${formattedStartDate}&enddate=${formattedEndDate}`,
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
      //handleApiRespose(data);
      setBarChartDataSet(data);
      console.log(data);

      console.log("After fetching Bar chart info");
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
      await Promise.all([
        fetchApplicationStats(),
        fetchAccountPostingRecon(),
        fetchBarChartStats(),
      ]);
    };
    fetchData();
  }, [selectedStartDate, selectedEndDate]);

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
              dateFormat="yyyy-MM-dd"
            />
          </Grid2>

          <Grid2 size={5}>
            <label htmlFor="date-picker"> End Date : &emsp; </label>
            <DatePicker
              popperPlacement="right"
              selected={selectedEndDate}
              onChange={(date) => setSelectedEndDate(date as Date)}
              placeholderText=" End Date"
              dateFormat="yyyy-MM-dd"
            />
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
                ></PieChartComponent>
              )}
            </Paper>
            <Paper></Paper>
          </Grid2>
        </Grid2>

        <h1></h1>

        <Grid2 size={12} container spacing={2}>
          <Grid2 size={8}>
            <Paper style={{ padding: "5px" }}>
              <h1 style={{ fontSize: "14px" }}>Bar Chart</h1>
              {!barChartDataSet ? (
                <p>Loading</p>
              ) : (
                <BarChartComponent
                  barChartDataSet={barChartDataSet}
                ></BarChartComponent>
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
                ></PieChartComponent>
              )}
            </Paper>
            <Paper></Paper>
          </Grid2>
        </Grid2>
      </Card>
      {!reconDetails ? (
        ""
      ) : (
        <Dialog open={dialogOpen} fullScreen>
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  setDialogOpen(false);
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <ReconViewTableComponent
            reconDetails={reconDetails}
            headers={headers}
          ></ReconViewTableComponent>
        </Dialog>
      )}
      <Grid2 container spacing={2}>
        <Grid2 size={12}>
          <Paper></Paper>
        </Grid2>
        <Grid2 size={12}></Grid2>
      </Grid2>
    </div>
  );
};

export default ReconViewSearchComponent;
