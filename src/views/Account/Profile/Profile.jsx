import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  head(){
    return (
      <Helmet>
        <title>{`Profile`}</title>
        <meta property="og:title" content="Profile"/>
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
            Profile
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(dashboardStyle)(Profile))
}
