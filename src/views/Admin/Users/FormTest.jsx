import React, { Component } from 'react'
import { withRouter } from 'react-router'
import SubscriptionReduxForm from 'views/Admin/Subscriptions/SubscriptionReduxForm.jsx'
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/material-dashboard-react/views/homeStyle.jsx"

class FormTest extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div style={{padding: "70px 20px 20px 20px", overflow: "scroll", height: "100%"}}>
        <SubscriptionReduxForm />
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(homeStyle)(FormTest))
}
