import {
  drawerWidth,
  transition,
  container
} from "assets/jss/material-dashboard-react.jsx";
const defaultBackgroundColor = "#454545"
const sideBarBackgroundColor = "#323232"
const appStyle = theme => ({
  root: {
    zIndex: "1 !important",
  },
  rootAppbar: {
    backgroundColor: sideBarBackgroundColor+ "!important"
  },
  rootSidebarPaper: {
    transitionDelay: "0",
    transition: "transform 0ms !important",
    backgroundColor: sideBarBackgroundColor
  },
  rootMobileSidebar: {
    [theme.breakpoints.up("md")]: {
      zIndex: "-1 !important",
      transitionDelay: "225ms",
      transition: "z-index 225ms",
    },
    zIndex: "1 !important",
    transitionDelay: "0ms",
    transition: "z-index 0ms",
  },
  rootMobileSidebarBackdrop: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent"
    }
  },
  rootMobileSidebarPaper: {
    backgroundColor: sideBarBackgroundColor
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
  },
  routes: {
    position: "absolute",
    top: "0",
    [theme.breakpoints.up("md")]: {
      width: `100%`,
    },
    width: '100%',
    height: "100%",
    marginLeft: "0px",
    overflow: "hidden"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${250}px)`,
      marginLeft: "250px"
    },
    top: "0",
    height: "100vh",
    position: "relative",
    maxHeight: "100vh",
    transition: "margin-left 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1), width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
    width: "100%",
    overflowScrolling: "touch",
    backgroundColor: defaultBackgroundColor
  },
  content: {
    overflow: "auto",
    marginTop: "0px",
    padding: "30px 15px",
    height: "100%",
    minHeight: "calc(100vh - 125px)",
    backgroundColor: defaultBackgroundColor,
    width: "calc(100% - 30px)",
    webkitBoxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)",
    mozBoxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)",
    boxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)"
  },
  container: {
    marginTop: "0px"
  },
  list: {
    width: 250
  },
  fullList: {
    width: 'auto'
  },
  home: {
    width: "100%",
    height: `calc(100% - ${64}px)`
  },
  navLink : {
    width: '100%'
  },
  activeNavLink: {
    backgroundColor: "#565656"
  }
});

export default appStyle;
