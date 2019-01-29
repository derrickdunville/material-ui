import React from "react";
import Select from "@material-ui/core/Select"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    color: "white",
    borderRadius: "4px"
  },
  selectMenu: {
    color: "white",
  }
}

function CustomSelect({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Select {...rest} classes={classes}>
      {children}
    </Select>
  );
}

export default withStyles(style)(CustomSelect);
