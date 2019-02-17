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
  rootSidebar: {
    backgroundColor: sideBarBackgroundColor+ "!important",
    zIndex: "1"
  },
  rootSidebarPaper: {
    backgroundColor: sideBarBackgroundColor,
    transition: "transform 0ms !important",

  },
  rootMobileSidebar: {
    zIndex: "1",
    transition: "z-index",
    [theme.breakpoints.up("md")]: {
      zIndex: "-1",
      transitionDelay: '300ms',
    }
  },
  rootMobileSidebarBackdrop: {
    [theme.breakpoints.up("md")]: {
      backgroundColor: "transparent"
    }
  },
  rootMobileSidebarPaper: {
    backgroundColor: sideBarBackgroundColor,
    zIndex: "1",
    transition: "z-index",
    [theme.breakpoints.up("md")]: {
      zIndex: "-1",
      transitionDelay: '300ms',
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
    [theme.breakpoints.up("md")]: {
      marginLeft: "0px",
      width: "100%"
    },
    marginLeft: "-250px",
    position: "relative",
    width: "calc(100% + 250px)",
    height: "100vh",
    paddingRight: "0px !important",
    display: "flex",
    transition: "margin-left 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1), width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",

  },
  sidebar: {
    backgroundColor: sideBarBackgroundColor,
    position: "relative",
    width: '250px',
    zIndex: "-1",
    [theme.breakpoints.up("md")]: {
      zIndex: "1 !important",
    },
  },
  routes: {
    position: "absolute",
    top: "0",
    width: '100%',
    height: "100%",
    marginLeft: "0px",
    overflow: "hidden"
  },
  mainPanel: {
    top: "0",
    position: "relative",
    maxHeight: "100vh",
    transition: "margin-left 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1), width 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
    width: "100%",
    overflowScrolling: "touch",
    backgroundColor: defaultBackgroundColor,
    overflow: "hidden"
  },
  content: {
    overflowX: "hidden",
    overflowY: "auto",
    marginTop: "0px",
    padding: "15px 15px",
    height: "calc(100vh - 94px)",
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
    width: 250,
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
  },
  menuIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    },
  },
  productContainer: {
    [theme.breakpoints.up("sm")]: {
      display: "flex",
      maxHeight: "100px"
    },
    backgroundColor: "#383838",
    borderRadius: "4px",
    padding: "10px",
    marginBottom: "10px"
  },
  productImage: {
    [theme.breakpoints.up("sm")]: {
      height: "100px",
      width: "calc(100px * 1.5625)",
      minWidth: "calc(100px * 1.5625)",
      marginRight: "10px"
    },
    width:"100%",
    height: "calc((100vw - 50px) * .5625)",
    borderRadius: "4px",
    backgroundColor: "#202225"
  },
  productDetails: {
    [theme.breakpoints.up("sm")]: {
      width: "100%"
    },
    display: "flex",
    alignItems: "center",
    borderRadius: "4px",
    paddingTop: "3px",
    paddingBottom: "10px"
  },
  productCoverImage: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
      height: "auto",
    },
    width: "calc(100vw - 50px)",
    height: "calc((100vw - 50px) * .5625)",
    borderRadius: "4px",
    backgroundColor: "#202225"
  }
});

export default appStyle;
