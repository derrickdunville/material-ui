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
      prevDepth: getPathDepth(props.location)
    }
    this.getClassName = this.getClassName.bind(this);
    this.getTransitionTimeout = this.getTransitionTimeout.bind(this);
  }
  componentWillReceiveProps () {
    this.setState({ prevDepth: getPathDepth(this.props.location) })
  }
  head(){
    return (
      <Helmet>
        <title>{`Account`}</title>
        <meta property="og:title" content="Account"/>
      </Helmet>
    )
  }

  getClassName(location){
    console.log("greater route: zIndex", this.props.route.zIndex)
    if(getPathDepth(location) > this.state.prevDepth){
      return "slideLeft2"
    } else if(getPathDepth(location) < this.state.prevDepth){
      return "slideRight2"
    } else {
      if(location.pathname.includes("admin") || location.pathname.includes("account")){
        return "slideLeft2"
      }
      return ""
    }
  }
  getTransitionTimeout(location){
    if(getPathDepth(location) > this.state.prevDepth){
      return 10000
    } else if(getPathDepth(location) < this.state.prevDepth){
      return 10000
    } else {
      if(location.pathname.includes("admin") || location.pathname.includes("account")){
        return 1000
      }
      else {
        return 0
      }
    }
  }



  render(){
    const { classes, location, ...rest} = this.props
    //This returns a childFactory to provide to TransitionGroup
    const childFactoryCreator = (classNames) => (
      (child) => {
        console.log("childFactory classNames: " +classNames)
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
                return(
                  <AppBar position="static" color="default" className="app-bar-slide2">
                    <Toolbar>
                      <NavLink to={prop.backPath} style={{color: "black"}}>
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
