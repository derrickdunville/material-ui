import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Helmet } from 'react-helmet'
import Navbar from "../components/Navbar/Navbar.jsx"
import Footer from "../components/Footer/Footer.jsx";
import image from "../assets/img/sidebar-2.jpg";
import logo from "../assets/img/reactlogo.png";
import withStyles from "@material-ui/core/styles/withStyles";
import homeStyle from "../assets/jss/material-dashboard-react/views/homeStyle.jsx";
import queryString from 'query-string'

import { postClick } from 'actions/clickActions'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){

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

function loadData(store, match, query, url, referring_url){
  console.log("home page load data: ", query)
  console.dir(query)
  if(query.ref){
    store.dispatch(postClick(query.ref, url, referring_url))
  }
}

export default {
  loadData,
  component: withRouter(withStyles(homeStyle)(Home))
}
