import { successColor } from "assets/jss/material-dashboard-react.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const defaultBackgroundColor = "#454545"

const chatStyle = theme => ({
  content: {
    overflowX: "hidden",
    overflowY: "auto",
    marginTop: "0px",
    padding: "15px 15px",
    height: "calc(100vh - 94px)",
    backgroundColor: defaultBackgroundColor,
    width: "calc(100vw - 30px)",
    webkitBoxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)",
    mozBoxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)",
    boxShadow: "-3px 0px 5px -3px rgba(0,0,0,0.75)"
  },
  stepperRoot: {
    backgroundColor: defaultBackgroundColor,
    padding: "0px"
  },
  stepLabelRoot: {
    color: "white !important",
    fontSize: "22px !important",
    fontWeight: "1 !important",
  },
  stepLabelCompleted: {
    fontSize: "22px",
    fontWeight: "1 !important",
    color: "white !important"
  },
  stepIconRoot: {
    color: "#565656 !important"
  },
  stepIconActive: {
    color: "#898989 !important"
  },
  stepIconCompleted: {
    color: "green !important"
  },
  membershipContainer: {
    [theme.breakpoints.up('sm')]: {
      display: "flex",
    },
    padding: "10px",
    backgroundColor: "#202225",
    marginBottom: "10px",
    borderRadius: "4px",
    marginRight: "0px"
  },
  membershipDetails: {
    [theme.breakpoints.up('sm')]: {
      marginBottom: "0px"
    },
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    width: "100%"
  },
  membershipButtonContainer: {
    [theme.breakpoints.up('sm')]: {
      width: "120px"
    },
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  membershipButton: {
    [theme.breakpoints.up('sm')]: {
      width: "120px"
    },
    width: "100%"
  },
  membershipName: {
    width: "100%"
  },
  membershipIcon: {
    width: "60px",
    height: "60px",
    marginRight: "10px",
    minWidth: "60px",
    borderRadius: "4px"
  },
  discordAvatar: {
    width: "60px",
    height: "60px",
    marginRight: "10px",
    minWidth: "60px",
    borderRadius: "60px"
  }
});

export default chatStyle;
