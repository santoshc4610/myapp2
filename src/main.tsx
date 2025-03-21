import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { green } from "@mui/material/colors";
import { BrowserRouter as Router } from "react-router-dom";
//import { ProSidebarProvider } from "react-pro-sidebar";

const Mytheme = createTheme({
  palette: { primary: green },
  typography: {
    fontFamily: ["Roboto", "Helvetica Neue"].join(","),
    fontSize: 100,
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={Mytheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);
