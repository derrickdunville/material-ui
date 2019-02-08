import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Forbidden from 'views/Forbidden.jsx'

export default (requiredRole) => ChildComponent => {
  class RequireRole extends Component {
    render() {
      switch (this.props.roles.includes(requiredRole)) {
        case false:
          return <Forbidden />
        default:
          return <ChildComponent {...this.props}/>
      }
    }
  }

  function mapStateToProps({ auth }) {
    return {
      roles: auth.user.roles || []
    }
  }

  return connect(mapStateToProps)(RequireRole)
}
