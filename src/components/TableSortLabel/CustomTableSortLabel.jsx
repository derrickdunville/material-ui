import React from "react";
import TableSortLabel from "@material-ui/core/TableSortLabel"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    "&:hover": {
      color: "#d9d9d9 !important"
    }
  },
  active: {
    color: "#fff !important"
  }
}

function CustomTableSortLabel({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <TableSortLabel {...rest} classes={classes}>
      {children}
    </TableSortLabel>
  );
}

export default withStyles(style)(CustomTableSortLabel);
