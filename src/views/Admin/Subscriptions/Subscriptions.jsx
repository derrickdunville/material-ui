import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import { withRouter } from "react-router-dom"
import { getSubscriptions } from 'actions/subscriptionActions'
import { NavLink } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import Add from '@material-ui/icons/Add'
import Close from '@material-ui/icons/Close'
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"

class Subscriptions extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.props.getSubscriptions()
  }
  head(){
    return (
      <Helmet>
        <title>{`Subscriptions`}</title>
        <meta property="og:title" content="Subscriptions"/>
      </Helmet>
    )
  }
  renderSubscriptions() {
    if(this.props.subscriptions.docs){
      return this.props.subscriptions.docs.map(subscription => {
        return (
          <NavLink
            to={`/admin/subscriptions/${subscription._id}`}
            key={subscription._id}
            >
            <li>
            {subscription._id}
            </li>
          </NavLink>
        )
      })
    } else {
      return (
        <div>Hmmm... nothing here</div>
      )
    }
  }

  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            {this.props.subscriptions.total} Subscriptions
            <ul>{this.renderSubscriptions()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.subscriptions
  }
}

function loadData(store, match){
  console.log("Admin/Subscriptions.loadData")
  console.dir(match.params)
  return store.dispatch(getSubscriptions())
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps, {getSubscriptions})(withStyles(dashboardStyle)(Subscriptions)))
}
