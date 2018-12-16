import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  componentDidMount() {
    // this.props.fetchAdmins()
    console.dir(this.props)
  }
  render() {
    return(<h1> Hello world - {this.props.message} - {this.props.auth} </h1>)
  }
}
function mapStateToProps(state) {
  return {
    message: state.app.message,
    auth: state.app.auth
  }
}
export default {
  component: connect(mapStateToProps)(Home)
}
