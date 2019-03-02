import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router'

export default (ChildComponent) => {
  class RequireAuth extends Component {
    render() {
      switch (this.props.auth.user) {
        case false:
          return <Redirect to="/login" from={this.props.location.url}/>
        default:
          return <ChildComponent {...this.props}/>
      }
    }
  }

  function mapStateToProps({ auth }) {
    return { auth }
  }

  return withRouter(connect(mapStateToProps)(RequireAuth))
}
