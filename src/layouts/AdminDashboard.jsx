/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
// // creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Account from "views/Account/Account.jsx"
import { renderRoutes } from 'react-router-config'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import AccountBox from '@material-ui/icons/AccountBox';
import { NavLink } from 'react-router-dom'

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import GavelIcon from '@material-ui/icons/Gavel';

import { openNav, closeNav } from "../actions"
import { connect } from 'react-redux'
import { TransitionGroup, CSSTransition } from "react-transition-group";


function getPathDepth (location) {
    return (location || {} ).pathname.split('/').length
}

class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      prevDepth: getPathDepth(props.location)
    }
    this.handleCloseNav = this.handleCloseNav.bind(this);
    this.handleOpenNav = this.handleOpenNav.bind(this);
    this.getClassName = this.getClassName.bind(this);
    // this.getTransitionTimeout = this.getTransitionTimeout.bind(this);
  }
  componentWillReceiveProps () {
    this.setState({ prevDepth: getPathDepth(this.props.location) })
  }
  toggleDrawer = (side, open) => () => {
    console.log("toggle")
    this.props.openNav()
    this.setState({[side]: open});
  };
  handleCloseNav(){
    this.props.closeNav()
  }
  handleOpenNav(){
    this.props.openNav()
  }
  // handleDrawerToggle = () => {
  //   this.setState({ mobileOpen: !this.state.mobileOpen });
  // };
  // resizeFunction() {
  //   if (window.innerWidth >= 960) {
  //     this.setState({ mobileOpen: false });
  //   }
  // }
  // componentDidMount() {
  //   // if (navigator.platform.indexOf("Win") > -1) {
  //   //   const ps = new PerfectScrollbar(this.refs.mainPanel);
  //   // }
  //   window.addEventListener("resize", this.resizeFunction);
  // }
  // componentDidUpdate(e) {
  //   if (e.history.location.pathname !== e.location.pathname) {
  //     this.refs.mainPanel.scrollTop = 0;
  //     if (this.state.mobileOpen) {
  //       this.setState({ mobileOpen: false });
  //     }
  //   }
  // }
  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.resizeFunction);
  // }
  getClassName(location){
    if(getPathDepth(location) > this.state.prevDepth){
      return "fade"
    } else if(getPathDepth(location) < this.state.prevDepth){
      return "fade"
    } else {
      console.log("path depth ===")
      console.dir(location)
      if(location.pathname==="/app/admin"){
        return "fade"
      } else {
        return "fade"
      }
    }
  }
  // getTransitionTimeout(location){
  //   if(location.pathname.includes("/app/admin")){
  //     console.log("location is admin route")
  //     return 0
  //   } else {
  //     return 300
  //   }
  // }
  render() {
    const { classes, route, ...rest } = this.props;
    const appBar = (
      <AppBar position="static" color="default" className="app-bar-slide" classes={{ root: classes.adminRoot }}>
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu" onClick={this.handleOpenNav}>
            <MenuIcon />
          </IconButton>
          <Typography variant="title" color="inherit" style={{width: '100%'}}>
            Admin Root
          </Typography>
        </Toolbar>
      </AppBar>
    )
    const sideList = (
      <div className={classes.list}>
        <NavLink exact to={"/"}
          key={1}
          exact
          className={classes.logoLink}
          activeClassName="active">
          <div className={classes.logoImage} style={{color: "#000000", display: 'flex', alignItems: "center", justifyContent: "center", marginTop:"10px", height: "56px" }}>
            <img src={logo} alt="logo" className={classes.img} style={{width: '80px'}}/>
            <h6>Admin Root</h6>
          </div>
        </NavLink>
        <NavLink to={'/app'} style={{alignItems: "center", display: "flex", color: "black"}}>
          <ArrowBack style={{float: 'right', zIndex: "2", padding: '10px'}} />
        </NavLink>
        <List>
          {this.props.route.routes.map((route, index) => (
            <NavLink exact={route.exact} to={route.path} key={index + 2} activeClassName="active" onClick={this.handleCloseNav}>
              <ListItem button key={index}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={route.title} />
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );

    const sideBar = (
      <SwipeableDrawer
        open={this.props.app.navOpen}
        onClose={this.handleCloseNav}
        onOpen={this.handleOpenNav}
        ModalProps={{
          classes: {
            root: classes.adminSidebar
          }
        }}
        PaperProps={{
          classes: {
            root: classes.adminSidebar
          }
        }}
        >
        <div
          tabIndex={0}
          role="button"
          onKeyDown={this.handleCloseNav}
        >
          {sideList}
        </div>
      </SwipeableDrawer>
    )
    //This returns a childFactory to provide to TransitionGroup
    const childFactoryCreator = (classNames) => (
      (child) => {
        console.log("childFactory classNames: " +classNames)
        return React.cloneElement(child, {
          classNames
        })
      }
    );

    return (
      <div className={classes.adminWrapper}>
        {sideBar}
        {appBar}

            {renderRoutes(
              this.props.route.routes,
              null,
              {location: this.props.location}
            )}

      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    app: state.app
  }
}
export default {
  component: withRouter(connect(mapStateToProps, { openNav, closeNav })(withStyles(dashboardStyle)(AdminDashboard)))
}
