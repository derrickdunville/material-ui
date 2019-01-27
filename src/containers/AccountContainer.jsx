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

  render(){
    const { classes, location, ...rest} = this.props
    const switchRoutes = (
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
