import { successColor } from "assets/jss/material-dashboard-react.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
const defaultBackgroundColor = "#454545"

const stepperStyle = {
  root: {
    backgroundColor: defaultBackgroundColor,
    padding: "0px"
  },
  labelRoot: {
    color: "white !important",
    fontSize: "22px !important",
    fontWeight: "1 !important",
  },
  labelLabelRoot: {
    color: "#989898",
    fontSize: "22px !important",
    fontWeight: "1 !important",
  },
  labelActive: {
    fontSize: "22px",
    fontWeight: "1 !important",
    color: "white !important",
  },
  labelDisabled: {
    fontSize: "22px",
    fontWeight: "1 !important",
    color: "#898989 !important",
  },
  labelCompleted: {
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
  contentRoot: {
    color: "white !important"
  }
};

export default stepperStyle;
