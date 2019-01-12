import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${0}px)`
    },
    overflow: "auto",
    position: "relative",
    ...transition,
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "0px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 123px)",

  },
  container: {
    marginTop: "0px"
  }
});

export default appStyle;
