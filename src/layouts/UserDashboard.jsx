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
  console.log("pathDepth: ", (location || {} ).pathname.split('/').length)
    return (location || {} ).pathname.split('/').length
}

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      prevDepth: getPathDepth(props.location),
      prevPath: props.location.pathname,
      mobile: true,
    }
    this.handleCloseNav = this.handleCloseNav.bind(this);
    this.handleOpenNav = this.handleOpenNav.bind(this);
    this.handleSidebar = this.handleSidebar.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.resizeFunction = this.resizeFunction.bind(this);
    this.getTransitionTimeout = this.getTransitionTimeout.bind(this);
    this.sidebar = React.createRef();
  }
  componentDidMount(){
    if(!this.props.location.pathname.endsWith('/')){
      console.log("doesn't end with /")
      this.props.history.replace(`${this.props.location.pathname}/`)
    }
    // this causes a render immediatly which helps the sidebar get into its correct parent component
    if(window.innerWidth >= 960){
      this.setState({ mobile: false})
    } else {
      this.setState({ mobile: true})
    }
     window.addEventListener("resize", this.resizeFunction);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  componentWillReceiveProps () {
    this.setState({ prevDepth: getPathDepth(this.props.location) })
    this.setState({ prevPath: this.props.location.pathname })
  }
  resizeFunction() {
    if (window.innerWidth >= 960 && this.state.mobile) {
      this.setState({ mobile: false })
    } else if(window.innerWidth < 960 && !this.state.mobile) {
      this.setState({ mobile: true})
    }
  }
  handleSidebar(){
    console.log("sidebar toggle")
  }
  handleCloseNav(){
    this.props.closeNav()
  }
  handleOpenNav(){
    this.props.openNav()
  }

  getClassName(location){
    let slideDepth = getPathDepth(location) - 3
    if (slideDepth > 1){
      slideDepth = 2
    } else {
      slideDepth = 1
    }
    if(getPathDepth(location) > this.state.prevDepth){
      return `slideLeft${slideDepth}`
    } else if (getPathDepth(location) < this.state.prevDepth ){
      return `slideRight${slideDepth}`
    } else {
      return ''
    }
  }
  getTransitionTimeout(location){
    if(getPathDepth(location) == this.state.prevDepth){
      return 0
    } else {
      return 200
    }
  }

  render() {
    console.dir(this.sidebar)
    const { classes, route, ...rest } = this.props;
    const appBar = (
      <AppBar position="static" color="default" className="app-bar-slide" classes={{ root: classes.root }}>
        <Toolbar>
          {this.state.mobile && (
            <IconButton color="inherit" aria-label="Menu" onClick={this.handleOpenNav}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="title" color="inherit" style={{width: '100%'}}>
            App Root
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
          <div className={classes.logoImage} style={{color: "#000000", display: 'flex', alignItems: "center", justifyContent: "center", paddingTop:"10px", height: "56px" }}>
            <img src={logo} className={classes.img} style={{width: '80px'}}/>
            <h6>App Title</h6>
          </div>
        </NavLink>
        <Divider />
        <div style={{display: 'flex', color: "#000000"}}>
          <NavLink exact to={"/app/"}
            onClick={this.handleCloseNav}
            key={2}
            exact
            className={classes.logoLink}
            activeClassName="active"
            style={{width: "100%"}}>
            <div className={classes.logoImage} style={{color: "#000000", display: 'flex', alignItems: "center", padding:"10px", height: "56px" }}>
              <div style={{width: "50px", height: "50px", backgroundColor: "#565656",  borderRadius: "4px"}}></div>
              <div style={{marginLeft: "10px", paddingRight: "10px", flex: '1'}}>username</div>
            </div>
          </NavLink>
          <NavLink to={'/app/account/'} style={{alignItems: "center", display: "flex", color: "black"}}>
            <SettingsIcon style={{float: 'right', zIndex: "2", padding: '10px'}}/>
          </NavLink>
          <NavLink to={'/admin/'} style={{alignItems: "center", display: "flex", color: "black"}}>
            <GavelIcon style={{float: 'right', zIndex: "2", padding: '10px'}} />
          </NavLink>
        </div>
        <Divider />
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


    // let modalProps = {}
    // if(typeof document !== "undefined"){
    //   modalProps = {
    //     container: {document.getElementById("sidebar")}
    //     style: {position: 'absolute'},
    //     classes: {
    //       root: classes.rootAppbar
    //     }
    //   }
    // } else {
    //   modalProps = {
    //     style: {position: 'absolute'},
    //     classes: {
    //       root: classes.rootAppbar
    //     }
    //   }
    // }

    const mobileSideBar = (
      <SwipeableDrawer
        open={this.props.app.navOpen}
        onClose={this.handleCloseNav}
        onOpen={this.handleOpenNav}
        ModalProps={{
          style: {position: 'absolute'},
          classes: {
            root: classes.rootMobileSidebar
          }
        }}
        BackdropProps={{
          style: { position: 'absolute' },
          classes: { root: classes.rootMobileSidebarBackdrop}
        }}
        SlideProps={{ style: { position: 'absolute' } }}
        PaperProps={{
          style: {
            position: "absolute"
          },
          classes: {
            root: classes.rootMobileSidebar
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
        console.log("UserDashboard childFactory classNames: " +classNames)
        return React.cloneElement(child, {
          classNames
        })
      }
    );


    return (
      <div id="wrapper" className={classes.mainPanel}>
        <div id="sidebar" ref={this.sidebar} className={classes.sidebar}>
          {sideList}
          <SwipeableDrawer
            open={true}
            onClose={this.handleSidebar}
            onOpen={this.handleSidebar}
            ModalProps={{
            container: this.sidebar.current,
              style: {position: 'absolute'},
              classes: {
                root: classes.rootAppbar
              }
            }}
            BackdropProps={{ style: { position: 'absolute' } }}
            SlideProps={{ style: { position: 'absolute' } }}
            PaperProps={{
              style: {
                position: "absolute"
              },
              classes: {
                root: classes.rootSidebarPaper
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
        </div>
        <div id="mainPanel" className={classes.routes}>
          {mobileSideBar}
          {appBar}
          <TransitionGroup childFactory={childFactoryCreator(this.getClassName(this.props.location))}>
            <CSSTransition
              key={this.props.location.key}
              classNames={this.getClassName(this.props.location)}
              timeout={this.getTransitionTimeout(this.props.location)}
              mountOnEnter={true}
              unmountOnExit={true}
              >
              {renderRoutes(
                this.props.route.routes,
                null,
                {location: this.props.location}
              )}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

UserDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    app: state.app
  }
}
export default {
  component: withRouter(connect(mapStateToProps, { openNav, closeNav })(withStyles(dashboardStyle)(UserDashboard)))
}
