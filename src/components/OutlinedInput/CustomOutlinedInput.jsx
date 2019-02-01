import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    borderColor: "white !important"
  },
  focused: {
    borderColor: "white !important"
  },
  cssFocused: {},
  cssUnderline: {
    '&:after': {
      borderBottomColor: "#0fed8a",
    },
  },
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderWidth: "1px",
      borderColor: "#07C16E",
      boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
    },

    borderRadius: "4px",
    WebkitAutofill: {
      backgroundColor: "#565656"
    }
  },
  notchedOutline: {},
}

function CustomOutlinedInput({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <OutlinedInput
      classes={{
        root: classes.cssOutlinedInput,
        notchedOutline: classes.notchedOutline,
        focused: classes.cssFocused
      }}
      {...rest}/>
  );
}

export default withStyles(style)(CustomOutlinedInput);
