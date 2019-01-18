import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import Slide from '@material-ui/core/Slide';

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      checked: false
    };
  }
  componentDidMount() {
     this.setState(state => ({ checked: !state.checked }));
  }
  componentWillUnmount() {
    this.setState(state => ({ checked: !state.checked }));
  }
  head(){
    return (
      <Helmet>
        <title>{`Billing`}</title>
        <meta property="og:title" content="Billing"/>
      </Helmet>
    )
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.mainPanel} ref="mainPanel">
          <div className={classes.content}>
            Billing
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: withStyles(dashboardStyle)(Billing)
}
