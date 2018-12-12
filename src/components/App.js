import React, { Component } from 'react';
import styles from './App.css';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';

import Child from './Child';
import Button from '@material-ui/core/Button';

class App extends Component {
  render() {
    const { count, dispatch } = this.props;
    return (
      <div>
        <h1></h1>
        <p>{count.num}</p>
        <button
          className={styles.increment}
          onClick={() => dispatch({type: "INC"})}
        >
          +1
        </button>
        <Button>Mateial Button</Button>
        <Child />
        <p>
          <a href="/whoami">Server-only route</a>
        </p>
      </div>
    );
  }
}

App.propTypes = {
  count: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default hot(module)( connect(state => ({count: state}))(App) );
