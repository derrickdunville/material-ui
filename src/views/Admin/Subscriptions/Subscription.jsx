import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Switch, Route, Redirect, withRouter } from "react-router-dom"
import { Helmet } from 'react-helmet'
import { getSubscription, deleteSubscription, putSubscription } from 'actions/subscriptionActions'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Delete from '@material-ui/icons/Delete'
import Edit from '@material-ui/icons/Edit'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import AlertDialog from "components/Dialog/AlertDialog.jsx"
import SubscriptionForm from './SubscriptionForm.jsx'

class Subscription extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editOpen: false,
      deleteOpen: false,
      stopOpen: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.closeEdit = this.closeEdit.bind(this)
    this.openDelete = this.openDelete.bind(this)
    this.toggleStop = this.toggleStop.bind(this)
    this.closeDelete = this.closeDelete.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleStop = this.handleStop.bind(this)
  }
  toggleEdit(){
    this.setState({editOpen: !this.state.editOpen})
  }
  closeEdit(){
    this.setState({editOpen: false})
  }
  openDelete(){
    this.setState({deleteOpen: true})
  }
  closeDelete(){
    this.setState({deleteOpen: false})
  }
  handleDelete(){
    this.props.deleteSubscription(this.props.subscription._id)
  }
  toggleStop(){
    this.setState({stopOpen: !this.state.stopOpen})
  }
  handleStop(){
    console.log("handle stop")
    this.props.putSubscription(
      {
        _id: this.props.subscription._id,
        cancel_at_period_end: true
      })
  }
  componentDidMount(){
    console.log("Subscription componentDidMount")
    this.props.getSubscription(this.props.match.params.id)
  }
  componentWillUnmount(){
    // this.props.clearTransaction();
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
              <div>
                <div style={{display: "flex", marginBottom: "10px"}}>
                  <Button style={{width: "100%", marginRight: "10px"}} variant="outlined" color="default" onClick={this.toggleEdit}>
                    {this.state.editOpen ? "Cancel" : "Edit"}
                  </Button>
                  <AlertDialog
                    style={{marginRight: "10px", width: "100%"}}
                    buttonText="Stop"
                    buttonColor="default"
                    loading={this.props.subscriptions.puttingSubscription}
                    loadingMessage={"Stopping..."}
                    successMessage={this.props.subscriptions.putSubscriptionSuccessMessage}
                    errorMessage={this.props.subscriptions.putSubscriptionErrorMessage}
                    open={this.state.stopOpen}
                    title="Stop Subscription?"
                    text="Are you sure you would like to stop this subscription? This will end the users billing cycle. The user will be notified by email of the cancellation."
                    leftAction={this.toggleCancel}
                    leftActionText="Cancel"
                    leftActionColor="default"
                    rightAction={this.handleStop}
                    rightActionText="Stop"
                    rightActionColor="secondary"
                    onClick={this.toggleStop}
                    onClose={this.toggleStop}
                    />
                  <AlertDialog
                    style={{width: "100%"}}
                    buttonText="Delete"
                    buttonColor="secondary"
                    open={this.state.deleteOpen}
                    title="Delete Subscription?"
                    text="Are you sure you would like to delete this subscription? This will result in this subscription being end-dated. It will not actually be deleted permenantly but it will no longer appear in the admin dashboard or the users billing history."
                    leftAction={this.closeDelete}
                    leftActionText="Cancel"
                    leftActionColor="default"
                    rightAction={this.handleDelete}
                    rightActionText="Delete"
                    rightActionColor="secondary"
                    onClick={this.openDelete}
                    onClose={this.closeDelete}
                    />
                </div>
                <div>
                  <SubscriptionForm editing={true} disabled={true} />
                </div>
              </div>
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
    subscriptions: state.subscriptions,
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
  component: withRouter(connect(mapStateToProps,
    {
      getSubscription,
      deleteSubscription,
      putSubscription
    }
  )(withStyles(dashboardStyle)(Subscription)))
}
