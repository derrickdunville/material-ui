import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";

const appStyle = theme => ({
  root: {
    zIndex: "1 !important"
  },
  rootAppbar: {
    zIndex: "1 !important"
  },
  rootMobileSidebar: {
    [theme.breakpoints.up("md")]: {
      zIndex: "-1 !important",
      transitionDelay: "225ms",
      transition: "z-index 225ms",
    },
    zIndex: "1 !important",
    transitionDelay: "0ms",
    transition: "z-index 0ms"
  },
  rootMobileSidebarBackdrop: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent"
    }
  },
  adminRoot: {
    position: "relative",
    zIndex: "3 !important",
    top: "0",
  },
  adminSidebar: {
    zIndex: "5 !important",
    height: "100vh"
  },
  adminWrapper: {
    position: "relative",
    paddingRight: "0px !important",
    zIndex: "3 !important",
    top: "0 !important",
  },
  wrapper: {
    position: "relative",
    height: "100vh",
    paddingRight: "0px !important",
  },
  sidebar: {
    position: "relative",
    width: '250px',
    height: "100%",
    transform: "translateX(-250px)",
    backgroundColor: "black",
  },
  routes: {
    position: "absolute",
    top: "0",
    [theme.breakpoints.up("md")]: {
      width: `100%`,
    },
    width: '100%',
    marginLeft: "0px",
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${250}px)`,
      marginLeft: "250px"
    },
    top: "0",
    height: "100vh",
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
    backgroundColor: "black",
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
