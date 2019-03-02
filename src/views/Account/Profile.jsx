import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import ProfileForm from './Profile/ProfileForm.jsx'
import requireAuth from 'components/hocs/requireAuth'

class Profile extends Component {
  constructor(props) {
    super(props);
  }

  head(){
    return (
      <Helmet key={this.props.location}
        title={"Profile"}
        meta={[
          {
            name: "Profile"
          }
        ]}/>
    )
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            <ProfileForm />
          </div>
        </div>
      </div>
    )
  }
}

export default {
  component: requireAuth(withRouter(withStyles(dashboardStyle)(Profile)))
}
