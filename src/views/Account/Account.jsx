import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";

class Account extends Component {
  constructor(props) {
    super(props);
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
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            Account Details Stuff
            <div style={{width: '100%'}}>
              <NavLink style={{width: '100%'}} to={"/app/account/profile/"}>
                Profile
              </NavLink>
            </div>
            <div style={{width: '100%'}}>
              <NavLink to={"/app/account/billing/"} style={{width: '100%'}}>
                Billing
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(dashboardStyle)(Account))
}
