// This is a the client side root component for hot reloading during development
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import "assets/css/material-dashboard-react.css?v=1.5.0";
import { StaticRouter, Router, Route, Switch } from "react-router-dom";
import Routes from './routes/app'
import { renderRoutes } from 'react-router-config'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';

class Server extends Component {

  render(){
    return (
      <StaticRouter location={this.props.location} context={this.props.context}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <div>{renderRoutes(Routes)}</div>
        </MuiPickersUtilsProvider>
      </StaticRouter>
    )
  }
}

export default Server;
