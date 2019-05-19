import React, { Component } from 'react'
import { withRouter } from 'react-router'
import UserReduxForm from 'views/Admin/Users/UserReduxForm.jsx'
import ContactForm from 'views/Contact/ContactForm.jsx'
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/material-dashboard-react/views/homeStyle.jsx"

class UserFormTest extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={classes.home}>
        <UserReduxForm />
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(homeStyle)(UserFormTest))
}
