import React, { Component } from 'react'
import { withRouter } from 'react-router'
import ProductReduxForm from 'views/Admin/Products/ProductReduxForm.jsx'
import withStyles from "@material-ui/core/styles/withStyles"
import homeStyle from "assets/jss/material-dashboard-react/views/homeStyle.jsx"

class FormTest extends Component {
  constructor(props) {
    super(props)
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div style={{padding: "60px 20px 20px 20px"}}>
        <ProductReduxForm />
      </div>
    )
  }
}

export default {
  component: withRouter(withStyles(homeStyle)(FormTest))
}
