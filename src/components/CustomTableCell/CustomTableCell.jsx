import React from "react";
import TableCell from "@material-ui/core/TableCell"
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  root: {
    border: "none",
    padding: "10px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
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
    <TableCell {...rest} classes={styles}>
      {children}
    </TableCell>
  );
}

export default withStyles(styles)(TableCell);
