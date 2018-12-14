import React, { Component } from 'react'
import { connect } from 'react-redux'

class Home extends Component {
  componentDidMount() {
    // this.props.fetchAdmins()
    console.dir(this.props)
  }
  render() {
    console.log(this.props.message)
    return(<h1> Hello World chirp- {this.props.message} </h1>)
  }
}
function mapStateToProps(state) {
  return {
    message: state.app.message
  }
}

export default connect(mapStateToProps)(Home)
