import React from "react";
import MenuItem from "@material-ui/core/TableSortLabel"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    color: "white",
    backgroundColor: "#232323",
  }
}

function CustomMenuItem({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <MenuItem {...rest} classes={classes}>
      {children}
    </MenuItem>
  );
}

export default withStyles(style)(CustomMenuItem);
