import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import Discord from "./Discord.jsx"
import requireAuth from 'components/hocs/requireAuth'

class Connections extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }

  head(){
    return (
      <Helmet>
        <title>{`Connections`}</title>
        <meta property="og:title" content="Connections"/>
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
            <Discord />
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: requireAuth(withRouter(withStyles(dashboardStyle)(Connections)))
}
