import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from '../../actions/authActions'
import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

class App extends Component {
  constructor(props) {
    super(props);
    if(!this.props.user){
      this.props.fetchCurrentUser()
    }
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div>
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

export default {
  component: connect(mapStateToProps, { fetchCurrentUser })(withStyles(dashboardStyle)(App)),
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
}
