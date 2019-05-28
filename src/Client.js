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
  constructor(){
    super();
    this.state = {
      stripe: null
    }
  }
  componentDidMount() {
    /* Server-Side CSS
    *  During server-side rendering we use JSS and emotion to generate the styles
    *  needed for the componentes within the app. When the bundle starts we can safely
    *  remove these injected styles.
    */
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    /* Server-Side Stripe
    *  Stripe.js is not included during Server-Side rendering.
    *  We also load the script async and defer it during the initial page load.
    *  So when the bundle starts running we need to create a stripe instance and
    *  provide it to the StripeProvider.
    */
    if (window.Stripe) {
      this.setState({stripe: window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)});
    } else {
      document.querySelector('#stripe-js').addEventListener('load', () => {
        this.setState({stripe: window.Stripe(process.env.STRIPE_PUBLISHABLE_KEY)});
      });
    }
  }

  render(){
    return (
      <BrowserRouter>
        <StripeProvider stripe={this.state.stripe}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div>{renderRoutes(Routes)}</div>
          </MuiPickersUtilsProvider>
        </StripeProvider>
      </BrowserRouter>
    )
  }
}

export default hot(module)(Client);
