import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import Navbar from "../components/Navbar/Navbar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "../assets/jss/material-dashboard-react/views/homeStyle.jsx";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  head(){
    return (
      <Helmet key={this.props.location} title={"Welcome to App Title - Get Connected Today!"} meta={[
          {name: "description", content: "This is the description for the website. It should appear when a link to the site is embedded somewhere on the web."}
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={classes.home}>
        {this.head()}
        <div className={classes.bgContainer}>
          <div className={classes.bg}>
            <div className={classes.welcome}>
                <h1>Welcome</h1>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: withStyles(homeStyle)(Home)
}
