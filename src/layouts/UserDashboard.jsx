/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { renderRoutes } from 'react-router-config'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom";
import { openNav, closeNav } from "actions"
import { TransitionGroup, CSSTransition } from "react-transition-group";
import requireAuth from 'components/hocs/requireAuth'

// // creates a beautiful scrollbar
// import PerfectScrollbar from "perfect-scrollbar";
// import "perfect-scrollbar/css/perfect-scrollbar.css";

// Style
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

// Assets
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";

// Components
import Account from "views/Account/Account.jsx"
import Avatar from 'components/Avatar/Avatar.jsx'
import Footer from "components/Footer/Footer.jsx";
import Header from "components/Header/Header.jsx";
import MobileSidebar from 'components/Sidebar/MobileSidebar.jsx'
import Sidebar from "components/Sidebar/Sidebar.jsx";

// Core
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Toolbar from '@material-ui/core/Toolbar'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import Typography from '@material-ui/core/Typography'

// Icons
import ArrowBack from '@material-ui/icons/ArrowBack'
import AccountBox from '@material-ui/icons/AccountBox'
import GavelIcon from '@material-ui/icons/Gavel'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import SettingsIcon from '@material-ui/icons/Settings'


function getPathDepth (location) {
  // console.log("pathDepth: ", (location || {} ).pathname.split('/').length)
    return (location || {} ).pathname.split('/').length
}

class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      left: false,
      prevDepth: getPathDepth(props.location),
      prevPath: props.location.pathname,
    }
    this.handleCloseNav = this.handleCloseNav.bind(this)
    this.handleOpenNav = this.handleOpenNav.bind(this)
    this.handleSidebar = this.handleSidebar.bind(this)
    this.getClassName = this.getClassName.bind(this)
    this.getTransitionTimeout = this.getTransitionTimeout.bind(this)
    this.sidebar = React.createRef()
    this.wrapper = React.createRef()
    this.mobileSidebar = React.createRef()
  }
  componentDidMount(){
    // // console.dir(this.props.location.pathname)
    // if(this.props.location.pathname === "/app"){
    //   // console.log("doesn't end with /")
    //   this.props.history.replace(`${this.props.location.pathname}/`)
    // } else {
    //   this.props.history.replace(`${this.props.location.pathname}`)
    // }
  }

  componentWillReceiveProps () {
    window.previousLocation = this.props.location
    this.setState({ prevDepth: getPathDepth(this.props.location) })
    this.setState({ prevPath: this.props.location.pathname })
  }

  handleSidebar(){
    return
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
      return `slideLeft${slideDepth}`
    }
  }
  getTransitionTimeout(location){
    let timeout = 0
    if(getPathDepth(location) == this.state.prevDepth){
      timeout = 0
    } else {
      timeout = 220
    }
    return timeout
  }

  render() {
    const { classes, route, ...rest } = this.props;
    console.log("render UserDashboard 1")
    const switchRoutes = (
      <Switch location={this.props.location}>
        {this.props.route.routes.map((prop, key) => {
          return <Route exact={prop.exact} path={prop.path} key={key} render={routeProps => {
            return(
              <AppBar
                position="static"
                color="default"
                className="app-bar-slide"
                style={{backgroundColor: "#454545", color: "#FFFFFF"}}
                classes={{ root: classes.rootAppBar,
                colorDefault: classes.rootAppBar }}>
                <Toolbar>
                  <IconButton className={classes.menuIcon} color="inherit" aria-label="Menu" onClick={this.handleOpenNav}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="title" color="inherit" style={{width: '100%'}}>
                    {prop.title}
                  </Typography>
                </Toolbar>
              </AppBar>
            )
          }}/>
        })}
      </Switch>
    );
    const sideList = (
      <div className={classes.list}>
        <NavLink exact to={"/"}
          key={1}
          exact
          className={classes.logoLink}
          activeClassName="active">
          <div className={classes.logoImage} style={{display: 'flex', alignItems: "center", justifyContent: "center", paddingTop:"10px", paddingBottom: "10px", height: "66px"}}>
            <img src={logo} className={classes.img} style={{width: '80px'}}/>
            <h6>App Title</h6>
          </div>
        </NavLink>
        <Divider />
        {this.props.loggedIn ? (
          <div style={{display: 'flex', maxWidth: "250px", color: "#000000"}}>
            <NavLink to={"/account"}
              onClick={this.handleCloseNav}
              key={2}
              className={classes.logoLink}
              activeClassName="active"
              style={{width: "100%"}}>
              <Avatar />
            </NavLink>
            <NavLink to={'/account/'}
              className={classes.logoLink}
              style={{alignItems: "center", display: "flex", color: "#FFFFFF"}}>
              <SettingsIcon style={{float: 'right', padding: '10px'}}/>
            </NavLink>
            {this.props.role === "admin" && (
              <NavLink to={'/admin/'} style={{alignItems: "center", display: "flex", color: "#FFFFFF"}}>
                <GavelIcon style={{float: 'right', padding: '10px'}} />
              </NavLink>
            )}
          </div>
        ):(
          <div style={{display: "flex"}}>
            <NavLink exact to={"/login"}
              onClick={this.handleCloseNav}
              key={2}
              exact
              activeClassName="active"
              style={{width: "100%", padding: "10px", height: "50px"}}>
              <Button variant="outlined" color="primary" style={{width: "100%", height: "100%"}}>
                Log In
              </Button>
            </NavLink>
            <NavLink exact to={"/sign-up"}
              onClick={this.handleCloseNav}
              key={3}
              exact
              activeClassName="active"
              style={{width: "100%", padding: "10px"}}>
              <Button variant="outlined" color="primary" style={{width: "100%", height: "100%"}}>
                Sign Up
              </Button>
            </NavLink>
          </div>
        )}
        <Divider />
        <div style={{display: "flex", flexWrap: "wrap", maxWidth: "250px" }}>
          {this.props.route.routes.map((route, index) => {
            if(route.hidden){
              return (<div key={index+10}></div>)
            } else {
              return (
                <NavLink
                  exact={route.exact} to={route.path} className="navlink" key={index + 10} onClick={this.handleCloseNav}
                  style={{paddingLeft: "15px", marginLeft: "5px", marginRight: "5px", marginBottom: "5px", borderRadius: "3px"}}>
                  <div style={{display: "flex", width: "225px", height: "50px", paggingLeft: "15px", alignItems: "center"}}>
                    <ListItemIcon style={{color: "#FFF"}}>{route.icon}</ListItemIcon>
                    {route.title}
                  </div>
                </NavLink>
              )}
          })}
        </div>
        <Divider />
        <div style={{height: "100%"}}/>
        <div>
          <div style={{display: "flex", justifyContent: "center", width: "230px"}}>
            <div>
              <NavLink to={'/contact'} key={4} style={{width: "100%", color: "#898989"}} onClick={this.handleCloseNav}>
                Contact
              </NavLink>
            </div>
            <div style={{width: "30px"}}>
            </div>
            <div>
              <NavLink to={'/tos'} key={5} style={{width: "100%", color: "#898989"}} onClick={this.handleCloseNav}>
                Terms
              </NavLink>
            </div>
          </div>
          <div style={{display: "flex", justifyContent: "center", width: "230px"}}>
            <span style={{color: "#898989", fontSize: "12px"}}>
              &copy; {1900 + new Date().getYear()}{" "}
              <a href="http://www.derrickdunville.com" className={classes.a} style={{color: "#898989", fontSize: "12px"}}>
                Derrick Dunville
              </a>
            </span>
          </div>
        </div>
      </div>
    );

    //This returns a childFactory to provide to TransitionGroup
    const childFactoryCreator = (classNames, timeout) => (
      (child) => {
        return React.cloneElement(child, {
          classNames, timeout
        })
      }
    );

    return (
      <div id="wrapper"  ref={this.wrapper} className={classes.wrapper}>
        <div id="sidebar" ref={this.sidebar} className={classes.sidebar}>
          {sideList}
        </div>
        <MobileSidebar sideList={sideList} />
        <div id="mainPanel" className={classes.mainPanel}>
          {switchRoutes}
          {renderRoutes(
            this.props.route.routes,
            null,
            {location: this.props.location}
          )}
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
    loggedIn: state.auth.user || false,
    role: state.auth.user.role || 'everyone'
  }
}
export default {
  component: withRouter(connect(mapStateToProps, { openNav, closeNav })(withStyles(dashboardStyle)(UserDashboard)))
}

// <TransitionGroup childFactory={childFactoryCreator(this.getClassName(this.props.location), this.getTransitionTimeout(this.props.location))}>
//   <CSSTransition
//     key={this.props.location.key}
//     classNames={this.getClassName(this.props.location)}
//     timeout={this.getTransitionTimeout(this.props.location)}
//     mountOnEnter={true}
//     unmountOnExit={true}
//     >
//     {renderRoutes(
//       this.props.route.routes,
//       null,
//       {location: this.props.location}
//     )}
//   </CSSTransition>
// </TransitionGroup>
