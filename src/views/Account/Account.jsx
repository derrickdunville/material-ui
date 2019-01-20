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
    this.state = {
      mobileOpen: false
    };
    // this.resizeFunction = this.resizeFunction.bind(this);
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
