import React, { Component } from 'react'
import PropTypes from "prop-types";
import { renderRoutes } from 'react-router-config'
import { fetchCurrentUser } from '../../actions/authActions'
import dashboardStyle from "../../assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {renderRoutes(route.routes)}
      </div>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default {
  component: withStyles(dashboardStyle)(App),
  loadData: ({ dispatch }) => dispatch(fetchCurrentUser())
}
