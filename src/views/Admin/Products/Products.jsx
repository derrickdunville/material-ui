import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class Products extends Component {
  constructor(props) {
    super(props);
  }

  head(){
    return (
      <Helmet>
        <title>{`Products`}</title>
        <meta property="og:title" content="Products"/>
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
            Products
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(dashboardStyle)(Products))
}
