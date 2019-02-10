import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Navbar from "../components/Navbar/Navbar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  head(){
    return (
      <Helmet>
        <title>{`Welcome`}</title>
        <meta property="og:title" content="User"/>
      </Helmet>
    )
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={classes.home}>
        {this.head()}
        <Navbar
          routes={this.props.routes}
          logoText={"App Title"}
          logo={logo}
          image={image}
          color="blue"
          {...rest}
        />
      <div style={{height: "100%", padding: "10px"}} ref="mainPanel">
          <div>
            Welcome
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default {
  component: withStyles(dashboardStyle)(Home)
}
