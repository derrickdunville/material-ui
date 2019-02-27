// This is a the client side root component for hot reloading during development
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import "assets/css/material-dashboard-react.css?v=1.5.0";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Routes from './routes/app'
import { renderRoutes } from 'react-router-config'
import { MuiPickersUtilsProvider } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { StripeProvider } from 'react-stripe-elements';

class Client extends Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    // const baseCss = document.getElementById('base-css');
    // if (baseCss && baseCss.parentNode) {
    //   baseCss.parentNode.removeChild(baseCss);
    // }
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render(){
    return (
      <BrowserRouter>
        <StripeProvider apiKey="pk_test_1u5ImR375vh3iwVcWfdaPtJk">
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>{renderRoutes(Routes)}</div>
          </MuiPickersUtilsProvider>
        </StripeProvider>
      </BrowserRouter>
    )
  }
}

export default hot(module)(Client);
