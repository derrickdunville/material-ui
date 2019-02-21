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

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(){
    console.log("Dashboard componentDidUpdate")
  }

  head(){
    return (
      <Helmet title={"Dashboard"} meta={[{name: "Dashboard"}]}/>
    )
  }

  render(){
    const { classes, title, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.content}>
          {this.props.route.title}
        </div>
      </div>
    )
  }
}

export default {
  component: withStyles(dashboardStyle)(Dashboard)
}
