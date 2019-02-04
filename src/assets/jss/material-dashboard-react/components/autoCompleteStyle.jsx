import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  primaryBoxShadow
} from "assets/jss/material-dashboard-react.jsx";

const autoCompleteStyle = {
  input:  (styles, state) => ({
    ...styles,
    color: state.isDisabled ? "#a1a1a1" : "white",
    backgroundColor: "#202225"
  }),
  menu:  (styles) => ({
    ...styles,
    zIndex: "2",
    marginTop: "2px",
    backgroundColor: "#202225"
  }),
  control: (styles, state) => {
    return ({
    ...styles,
    marginBottom: "14px",
    height: "56px",
    width: "100%",
    color: state.isDisabled ? "#a1a1a1" : "white",
    border: state.isFocused ? "1px solid #0FED8A" : "1px solid black",
    boxShadow: state.isFocused ? "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)" : "none",
    backgroundColor: "#202225 !important",
    '&:hover' : {
      border: state.isFocused ? "1px solid #0FED8A" : "1px solid black"
    }
  })},
  option: (styles, { isFocused }) => ({
    ...styles,
    color: "white",
    backgroundColor: isFocused ? "#565656" : "#202225"
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? "#a1a1a1" : "white",
  }),
  placeholder: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? "#a1a1a1" : "white"
  })
}

export default autoCompleteStyle;
