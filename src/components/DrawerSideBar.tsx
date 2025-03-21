import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";

interface props {
  collapse: boolean;
  doCollapse: () => void;
}

const DrawerSideBar = ({ collapse, doCollapse }: props) => {
  return (
    <div>
      <Sidebar
        collapsed={collapse}
        className="app"
        collapsedWidth={"0px"}
        backgroundColor="lightgrey"
        style={{ height: "100vw" }}
      >
        <Menu>
          <MenuItem
            component={<Link to="/" className="link" />}
            className="menu1"
            onClick={doCollapse}
            // icon={<MenuRoundedIcon />}n
          >
            <h2>Home</h2>
          </MenuItem>
          <MenuItem
            component={<Link to="/Profession" className="link" />}
            // icon={<GridViewRoundedIcon />}
          >
            Profession
          </MenuItem>
          <MenuItem
            component={<Link to="/ReconView" className="link" />}
            // icon={<GridViewRoundedIcon />}
          >
            ReconciliationView
          </MenuItem>
          <MenuItem
            component={<Link to="/Reports" className="link" />}
            // icon={<GridViewRoundedIcon />}
          >
            Reports
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default DrawerSideBar;
