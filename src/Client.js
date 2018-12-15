// This is a the client side root component for hot reloading during development
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import "assets/css/material-dashboard-react.css?v=1.5.0";
import indexRoutes from "routes/index.jsx";
import { BrowserRouter, Route, Switch } from "react-router-dom";

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
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route path={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </BrowserRouter>
    )
  }
}

export default hot(module)(Client);
