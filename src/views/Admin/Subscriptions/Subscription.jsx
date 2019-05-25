import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getSubscription, clearSubscription } from 'actions/subscriptionActions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'

import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import SubscriptionReduxForm from './SubscriptionReduxForm.jsx'

class Subscription extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    console.log("Subscription componentDidMount")
    this.props.getSubscription(this.props.match.params.id)
  }
  componentWillUnmount(){
    this.props.clearSubscription();
  }
  head(){
    return (
      <Helmet>
        <title>{`Subscription`}</title>
        <meta property="og:title" content="Subscription"/>
      </Helmet>
    )
  }
  render(){
    const { subscription, classes, route, ...rest } = this.props;
    const appBar = (
      <AppBar
        position="static"
        color="default"
        style={{backgroundColor: "#454545", color: "#FFFFFF"}}
        className="app-bar-slide2"
        >
        <Toolbar>
          <NavLink exact to={"/admin/subscriptions"} style={{color: "#FFF"}}>
            <IconButton color="inherit" aria-label="Menu">
              <ArrowBack />
            </IconButton>
          </NavLink>
          <Typography variant="title" color="inherit">
            Subscription  >  {subscription._id}
          </Typography>
        </Toolbar>
      </AppBar>
    )
    return (
      <div className={`admin-slide${route.zIndex}`}>
        {this.head()}
        {appBar}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            {subscription ? (
              <SubscriptionReduxForm subscription={this.props.subscription} editing={true} disabled={true} />
            ):(
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscription: state.subscriptions.subscription
  }
}

function loadData(store, match){
  console.log("admin/subscriptions/subscription.loadData")
  console.dir(match.params)
  return store.dispatch(getSubscription(match.params.id))
}

export default {
  loadData,
  component: withRouter(connect(mapStateToProps,{getSubscription, clearSubscription}
  )(withStyles(dashboardStyle)(Subscription)))
}
