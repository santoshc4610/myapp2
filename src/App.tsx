//import { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'

//import "./App.css";

//import BasicMenu from "./components/BasicMenu";
//import ButtonAppBar from "./components/Material";

//import ButtonAppBar from "./components/Material";

import { useState } from "react";
import ButtonAppBar from "./components/Material";
import DrawerSideBar from "./components/DrawerSideBar";
import RouteLink from "./components/RouteLink";

function App() {
  const [collapse, setCollapse] = useState(true);

  const doCollapse = () => {
    setCollapse(!collapse);
    console.log("getting called");
  };

  return (
    <div>
      <ButtonAppBar doCollapse={doCollapse}></ButtonAppBar>
      <div style={{ display: "flex", width: "100%", height: "100vh" }}>
        <DrawerSideBar
          collapse={collapse}
          doCollapse={doCollapse}
        ></DrawerSideBar>
        <section>
          <RouteLink></RouteLink>
        </section>
      </div>
    </div>
  );
}

export default App;
