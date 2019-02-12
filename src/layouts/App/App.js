import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser, getPaymentMethod } from 'actions/authActions'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import withStyles from '@material-ui/core/styles/withStyles'
import Socket from 'utils/Socket.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    if(!this.props.user){
      this.props.fetchCurrentUser()
      this.props.getPaymentMethod()
    }
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div>
        <Socket/>
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    user: state.auth.user || false
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function loadData(store){
  return store.dispatch(fetchCurrentUser()).then(() => store.dispatch(getPaymentMethod()))
}

export default {
  component: connect(mapStateToProps, { fetchCurrentUser, getPaymentMethod })(withStyles(dashboardStyle)(App)),
  loadData
}
