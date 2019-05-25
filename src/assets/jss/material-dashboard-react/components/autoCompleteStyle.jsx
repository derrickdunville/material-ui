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
    height: "56px",
    width: "100%",
    color: state.isDisabled ? "#a1a1a1" : "white",
    borderWidth: "0px",
    boxShadow: state.selectProps.isFocused ? "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)" : "none",
    backgroundColor: "#202225 !important",
  })},
  option: (styles, { isFocused }) => ({
    ...styles,
    color: "white",
    backgroundColor: isFocused ? "#565656" : "#202225"
  }),
  singleValue: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? "#a1a1a1" : "white",
    marginLeft: "14px"
  }),
  placeholder: (styles, state) => ({
    ...styles,
    color: state.isDisabled ? "#a1a1a1" : "white"
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: "0px",
    overflow: "visible"
  }),
  indicatorsContainer: (styles, state) => {
    let borderColor = ""
    if(state.selectProps.isFocused){
      borderColor = "#07C16E"
    } else if(state.selectProps.meta && state.selectProps.meta.touched && state.selectProps.meta.invalid){
      borderColor = "red"
    } else {
      borderColor = "black"
    }

    return ({
      ...styles,
      height: "56px",
      borderStyle: "solid",
      borderWidth: "1px 1px 1px 0px",
      borderTopLeftRadius: "0px",
      borderBottomLeftRadius: "0px",
      borderTopRightRadius: "4px",
      borderBottomRightRadius: "4px",
      borderColor: borderColor,
      transition: "border-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,border-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"
    })
  }
}

export default autoCompleteStyle;
