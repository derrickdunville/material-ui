// This is a the client side root component for hot reloading during development
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";
import { StaticRouter, Router, Route, Switch } from "react-router-dom";
import Routes from './routes/app'
import { renderRoutes } from 'react-router-config'

class Server extends Component {

  render(){
    console.log("Location: ", this.props.location)
    return (
      <StaticRouter location={this.props.location} context={this.props.context}>
        <div>{renderRoutes(Routes)}</div>
      </StaticRouter>
    )
  }
}

export default Server;
