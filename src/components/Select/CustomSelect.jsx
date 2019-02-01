import React from "react";
import Select from "@material-ui/core/Select"
import CustomMenuItem from "components/MenuItem/CustomMenuItem.jsx"
import withStyles from "@material-ui/core/styles/withStyles";

const style = {
  root: {
    color: "white",
    borderRadius: "4px"
  },
  selectMenu: {
    color: "white",
  },
  icon: {
    color: "white"
  },
  listRoot: {
    backgroundColor: "#202225",
    // borderRadius: "4px",
    // border: "1px solid #07C16E",
    // boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
  }
}

function CustomSelect({ ...props }) {
  const { classes, items, children, ...rest } = props;
  return (
    <Select
      classes={{
        root: classes.root,
        icon: classes.icon
      }}
      MenuProps={{
        classes: {
          paper: classes.listRoot
        },
        MenuListProps: {
          classes: {
            root: classes.listRoot
          }
        }
      }}
      {...rest}
      >
      {items !== undefined && (
        items.map((item) => (
          <CustomMenuItem key={item} style={{color: "white"}} id={item} value={item}>{item}</CustomMenuItem>
        ))
      )}
    </Select>
  );
}

export default withStyles(style)(CustomSelect);
