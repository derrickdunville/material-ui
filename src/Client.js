// This is a the client side root component for hot reloading during development
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";
import { Router, Route, Switch } from "react-router-dom";

class Client extends Component {
  render(){
    return (
      <Router history={this.props.hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </Router>
    )
  }
}

export default hot(module)(Client);
