import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { renderRoutes } from 'react-router-config'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'
import { Switch, Route, Redirect, withRouter } from "react-router-dom";

class RouteContainer extends Component {
  head(){
    return (
      <Helmet>
        <title>{this.props.route.title}</title>
        <meta property="og:title" content={this.props.route.title}/>
      </Helmet>
    )
  }

  render(){
    const { classes, location, ...rest} = this.props
    const switchRoutes = (
      <Switch location={this.props.location}>
        {this.props.route.routes.map((prop, key) => {
          return <Route exact={prop.exact} path={prop.path} key={key} render={routeProps => {
            let backPath = prop.backPath
            return(
              <AppBar position="static" color="default" style={{backgroundColor: "#454545", color: "#FFFFFF"}} className="app-bar-slide">
                <Toolbar>
                  <NavLink exact to={'/admin'} style={{color: "#FFF"}}>
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
        {renderRoutes(this.props.route.routes)}
      </div>
    )
  }
}

export default {
  component: RouteContainer
}
