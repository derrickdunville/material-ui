import React, { Component } from "react";
import ReactDOM from "react-dom";
import Client from "./Client"
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import { createHashHistory } from "history";

const hist = createHashHistory();

class Main extends Component {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const baseCss = document.getElementById('base-css');
    if (baseCss && baseCss.parentNode) {
      baseCss.parentNode.removeChild(baseCss);
    }
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }
  render(){
    return (<Client hist={this.props.hist} />)
  }
}

// Create a theme instance.
const theme = createMuiTheme({palette: {}});
// Create a new class name generator.
const generateClassName = createGenerateClassName();

ReactDOM.hydrate(
  <JssProvider generateClassName={generateClassName}>
    <MuiThemeProvider theme={theme}>
      <Main hist={hist}/>
    </MuiThemeProvider>
  </JssProvider>,
  document.getElementById("root")
);
