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

  render(){
    const { classes, location, ...rest} = this.props
    const switchRoutes = (
      <TransitionGroup>
        <CSSTransition key={location.key}
          classNames={ getPathDepth(location) > this.state.prevDepth ? 'slideLeft' : 'slideRight' }
          timeout={300}
          mountOnEnter={true}
          unmountOnExit={true}>
          <Switch location={this.props.location}>
            {this.props.route.routes.map((prop, key) => {
              return <Route exact={prop.exact} path={prop.path} key={key} render={routeProps => {
                return(
                  <AppBar position="static" color="default" className="app-bar-slide">
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

    //This returns a childFactory to provide to TransitionGroup
    const childFactoryCreator = (classNames) => (
      (child) => {
        console.log("childFactory classNames: " +classNames)
        return React.cloneElement(child, {
          classNames
        })
      }
    );
    console.log("prevDepth: ", this.state.prevDepth)
    return (
      <div>
        {this.head()}
        {switchRoutes}
        <TransitionGroup childFactory={childFactoryCreator(getPathDepth(location) > this.state.prevDepth ? 'slideLeft' : 'slideRight')}>
          <CSSTransition
            key={location.key}
            classNames={ getPathDepth(location) > this.state.prevDepth ? 'slideLeft' : 'slideRight' }
            timeout={300}
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
    )
  }
}

export default {
  component: withRouter(withStyles(accountContainerStyle)(AccountContainer))
}
