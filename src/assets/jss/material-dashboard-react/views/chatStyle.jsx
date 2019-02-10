import { successColor } from "assets/jss/material-dashboard-react.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const defaultBackgroundColor = "#454545"

const chatStyle = {
  content: {
    overflowX: "hidden",
    overflowY: "auto",
    marginTop: "0px",
    padding: "30px 15px",
    height: "calc(100vh - 124px)",
    backgroundColor: defaultBackgroundColor,
    width: "calc(100% - 30px)",
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
  }
};

export default chatStyle;
