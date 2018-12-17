import React, { Component } from 'react'
import PropTypes from "prop-types";
import { renderRoutes } from 'react-router-config'
// import Header from './components/Header'
import { fetchCurrentUser } from './actions'
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import image from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import Footer from "components/Footer/Footer.jsx";
import Header from "components/Header/Header.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    // if (navigator.platform.indexOf("Win") > -1) {
    //   const ps = new PerfectScrollbar(this.refs.mainPanel);
    // }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render(){
    const { classes, route, ...rest } = this.props;
    console.dir(route.routes)
    return (
      <div className={classes.wrapper}>
        <Sidebar
          routes={route.routes}
          logoText={"Material UI"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="green"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={route.routes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            {renderRoutes(route.routes)}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default {
  component: withStyles(dashboardStyle)(App),
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
}
