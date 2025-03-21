import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import Reports from "./Reports";
import Gallery from "./Gallery";
import Profession from "./Profession";
import ReconViewMainComponent from "./ReconViewMainComponent";

const RouteLink = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Reports" element={<Report />} />
        <Route path="/Gallery" element={<Galleria />} />
        <Route path="/Profession" element={<Profession />}></Route>
        <Route path="/ReconView" element={<ReconViewMainComponent />}></Route>
      </Routes>
    </div>
  );
};

function Home() {
  return (
    <Typography fontFamily={"sans-serif"} fontSize={80} align="center">
      <div className="container d-flex justify-content-center">
        Welcome To My World
      </div>
    </Typography>
  );
}

function Report() {
  return (
    <Typography align="center">
      <Reports></Reports>
    </Typography>
  );
}

function Galleria() {
  return (
    <Typography fontFamily={"sans-serif"} fontSize={100} align="center">
      Gallery
      <Gallery></Gallery>
    </Typography>
  );
}

export default RouteLink;
