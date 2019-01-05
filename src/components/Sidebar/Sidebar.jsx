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

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle.jsx";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux'

const Sidebar = ({ ...props }) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1 ? true : false;
  }
  const { classes, color, logo, image, logoText, routes } = props;
  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        // console.log("Key: ", key)
        if (prop.redirect) return null;
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else if(prop.path === '' || prop.path === '/' || prop.path === '/login') {
          return(<div></div>)
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            exact={prop.exact}
            className={activePro + classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
      {props.auth ? (
        <a href="/api/logout"
          className={classes.item}
          key={100}
        >
          <ListItem button className={classes.itemLink}>
            <ListItemText
              primary={"Logout"}
              className={classes.itemText}
              disableTypography={true}
            />
          </ListItem>
        </a>
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
    </List>
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
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>
      </Hidden>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired
};
function mapStateToProps({ auth }){
  return { auth }
}

export default connect(mapStateToProps)(withStyles(sidebarStyle)(Sidebar));
