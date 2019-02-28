import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { renderRoutes } from 'react-router-config'
import { loadMemberships } from 'actions'
import { fetchCurrentUser, getPaymentMethod, getMyDiscordGuildMember } from 'actions/authActions'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import withStyles from '@material-ui/core/styles/withStyles'
import Socket from 'utils/Socket.jsx'

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    if(!this.props.memberships){
      this.props.loadMemberships()
    }
    if(!this.props.user){
      this.props.fetchCurrentUser()
    } else {
      this.props.getPaymentMethod()
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(!prevProps.user && this.props.user){
      this.props.getMyDiscordGuildMember()
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
    memberships: state.app.memberships || false,
    user: state.auth.user || false
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function loadData(store){
  return store.dispatch(fetchCurrentUser())
  .then(() => store.dispatch(getPaymentMethod()))
  .then(() => store.dispatch(getMyDiscordGuildMember()))
  .then(() => store.dispatch(loadMemberships()))
}

export default {
  component: connect(mapStateToProps, { fetchCurrentUser, getPaymentMethod, getMyDiscordGuildMember, loadMemberships })(withStyles(dashboardStyle)(App)),
  loadData
}
