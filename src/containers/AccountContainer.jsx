import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'
import withStyles from "@material-ui/core/styles/withStyles";
import accountContainerStyle from "../assets/jss/material-dashboard-react/containers/accountContainerStyle.jsx"
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

import { TransitionGroup, CSSTransition } from "react-transition-group";
import PageTransition from 'react-router-page-transition'

function getPathDepth (location) {
    return (location || {} ).pathname.split('/').length
}

class AccountContainer extends Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      prevDepth: getPathDepth(props.location),
      prevPath: window.previousLocation
    }
    if(window.previousLocation != undefined){
      console.log("prevPath: ", window.previousLocation)
    } else {
      window.accountFrom = "/app/"
    }
    if(window.accountFrom == undefined){
      window.accountFrom = window.previousLocation.pathname
    }
    console.log("accountFrom: ", window.accountFrom)
    // console.log("accontFrom: ", window.accountFrom.pathname)
    this.getClassName = this.getClassName.bind(this);
    this.getTransitionTimeout = this.getTransitionTimeout.bind(this);
    this.clearAccountFrom = this.clearAccountFrom.bind(this)
  }
  componentWillReceiveProps () {
    this.setState({
      prevDepth: getPathDepth(this.props.location)
     })
  }
  head(){
    return (
      <Helmet>
        <title>{`Account`}</title>
        <meta property="og:title" content="Account"/>
      </Helmet>
    )
  }
  clearAccountFrom(){
    console.log("location", this.props.location.pathname)
    if(this.props.location.pathname == '/app/account/'){
      window.accountFrom = undefined
    }
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
      return 250
    }
  }



  render(){
    const { classes, location, ...rest} = this.props
    //This returns a childFactory to provide to TransitionGroup
    const childFactoryCreator = (classNames) => (
      (child) => {
        // console.log("childFactory classNames: " +classNames)
        return React.cloneElement(child, {
          classNames
        })
      }
    );
    const switchRoutes = (
      <TransitionGroup childFactory={childFactoryCreator(this.getClassName(this.props.location))}>
        <CSSTransition
          key={this.props.location.key}
          classNames={this.getClassName(this.props.location)}
          timeout={this.getTransitionTimeout(this.props.location)}
          mountOnEnter={true}
          unmountOnExit={true}>
          <Switch location={this.props.location}>
            {this.props.route.routes.map((prop, key) => {
              return <Route exact={prop.exact} path={prop.path} key={key} render={routeProps => {
                let backPath = prop.backPath
                if(this.props.location.pathname === '/app/account/'){
                  if(window.accountFrom !== undefined){
                    backPath = window.accountFrom
                  } else {
                    backPath = prop.backPath
                  }
                }



                return(
                  <AppBar position="static" color="default" style={{backgroundColor: "#454545", color: "#FFFFFF"}} className="app-bar-slide2">
                    <Toolbar>
                      <NavLink exact to={backPath} style={{color: "#FFF"}} onClick={this.clearAccountFrom}>
                        <IconButton color="inherit" aria-label="Menu">
                          <ArrowBack />
                        </IconButton>
                      </NavLink>
                      <Typography variant="title" color="inherit">
                        {prop.title}
                      </Typography>
                    </Toolbar>
                  </AppBar>
                )
              }}/>
            })}
          </Switch>
        </CSSTransition>
      </TransitionGroup>
    );


    return (
      <div>
        {this.head()}
        {switchRoutes}
        {renderRoutes(
          this.props.route.routes,
          null,
          {location: this.props.location}
        )}

      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(accountContainerStyle)(AccountContainer))
}
