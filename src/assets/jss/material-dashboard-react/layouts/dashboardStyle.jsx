import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  root: {
    zIndex: "1 !important"
  },
  adminRoot: {
    position: "relative",
    zIndex: "2 !important",
    top: "0",
  },
  adminSidebar: {
    zIndex: "3 !important"
  },
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  adminWrapper: {
    position: "relative",
    zIndex: "3 !important",
    top: "0 !important",
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
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  }
});

export default appStyle;
