import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import { withRouter } from "react-router-dom";

class Profile extends Component {
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
  //   //   const ps = new PerfectScrollbar(this.re fs.mainPanel);
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
        <title>{`Profile`}</title>
        <meta property="og:title" content="Profile"/>
      </Helmet>
    )
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={'slide'}>
        {this.head()}
        <div className={classes.mainPanel} ref="mainPanel">
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
