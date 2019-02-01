import React from "react";
import MenuItem from "@material-ui/core/TableSortLabel"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    width: "100%",
    color: "white",
    backgroundColor: "#232323",
    padding: "10px 14px",
  },
  selected: {
    backgroundColor: "white !important"
  }
}

function CustomMenuItem({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <MenuItem
      classes={{
        root: classes.root
      }}
      className="select-menu-item"
      list={{
        classes: {
          selected: classes.selected
        }
      }}
      {...rest}>
      {children}
    </MenuItem>
  );
}

export default withStyles(style)(CustomMenuItem);
