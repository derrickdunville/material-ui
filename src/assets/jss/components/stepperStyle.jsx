import { successColor } from "assets/jss/material-dashboard-react.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const defaultBackgroundColor = "#454545"

const stepperStyle = {
  root: {
    backgroundColor: "transparent",
    padding: "0px"
  },
  labelRoot: {
    color: "white !important",
    fontSize: "20px !important",
    fontWeight: "1 !important",
  },
  labelLabelRoot: {
    color: "#a1a1a1",
    fontSize: "20px !important",
    fontWeight: "1 !important",
  },
  labelActive: {
    fontSize: "20px",
    fontWeight: "1 !important",
    color: "white !important",
  },
  labelDisabled: {
    fontSize: "20px",
    fontWeight: "1 !important",
    color: "#a1a1a1 !important",
  },
  labelCompleted: {
    fontSize: "20px",
    fontWeight: "1 !important",
    color: "white !important"
  },
  stepIconRoot: {
    color: "#545454 !important"
  },
  stepIconActive: {
    color: "#898989 !important"
  },
  stepIconCompleted: {
    color: "green !important"
  },
  contentRoot: {
    color: "white !important",
    paddingRight: "0px"
  }
};

export default stepperStyle;
