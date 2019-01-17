import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, IndexLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import navbarStyle from "../../assets/jss/material-dashboard-react/components/navbarStyle.jsx";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const Navbar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  // <a href="/api/logout"
  //   className={classes.item + " " + classes.navbarRight}
  //   key={100}
  // >
  //   <ListItem button className={classes.itemLink}>
  //     <ListItemText
  //       primary={"Logout"}
  //       className={classes.itemText}
  //       disableTypography={true}
  //     />
  //   </ListItem>
  // </a>
  var links = (
    <div className={classes.navbarRight}>
      {props.auth.user ? (
        <NavLink
          to={"/app"}
          className={classes.item + " " + classes.navbarRight}
          activeClassName="active"
          key={101}
        >
          <ListItem button className={classes.itemLink}>
            <ListItemText
              primary={"Open"}
              className={classes.itemText}
              disableTypography={true}
            />
          </ListItem>
        </NavLink>
      ):(
        <NavLink
          to={"/login"}
          className={classes.item}
          activeClassName="active"
          key={101}
        >
          <ListItem button className={classes.itemLink}>
            <ListItemText
              primary={"Login"}
              className={classes.itemText}
              disableTypography={true}
            />
          </ListItem>
        </NavLink>
      )}
    </div>
  );
  var brand = (
    <div className={classes.logo}>
      <NavLink exact to={"/"}
        key={102}
        exact
        className={classes.logoLink}
        activeClassName="active">
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </NavLink>
    </div>
  );
  return (
    <div className={classes.navbarWrapper}>
      {brand}
      {links}
    </div>
  );
};

Navbar.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps({ auth }){
  return { auth }
}

export default connect(mapStateToProps)(withStyles(navbarStyle)(Navbar));
