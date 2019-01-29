import React from "react";
import TableCell from "@material-ui/core/TableCell"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    border: "none"
  },
  head: {
    backgroundColor: "#232323",
    color: "#c5c5c5",
  },
  body: {
    fontSize: 14,
    color: "white"
  }
};

function CustomTableCell({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <TableCell {...rest} classes={style}>
      {children}
    </TableCell>
  );
}

export default withStyles(style)(TableCell);
