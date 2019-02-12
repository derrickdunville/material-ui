import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
// import * as transactionActions from '../actions/transactionActions'
// import * as subscriptionActions from '../actions/subscriptionActions'
// import * as productActions from '../actions/productActions'
// import * as userActions from '../actions/userActions'
// import * as universalActions from '../actions/universalActions'
import * as authActions from '../actions/authActions'

import io from 'socket.io-client'
const socket = io('http://localhost:3001', { path: '/ws' })

class Socket extends Component {

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const { dispatch } = this.props;
    if(this.props.user){
      console.log("Signed in... joining my socket")
      // socket.emit("JOIN_ME", this.props.user._id)
      // socket.on("ME_UPDATED", user => {
      //   console.log("ME_UPDATED")
      //   console.dir(user)
      //   // this just relogs in the user, so the entire auth.user is reloaded
      //   dispatch(authActions.loadAuth())
      // })
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log("socket controller componentDidUpdate()")
    // console.dir(prevProps)
    const { dispatch } = this.props;
    if(prevProps.user && !this.props.user){
      socket.emit("LEAVE_ME", prevProps.user._id)
    }

    console.log("prevProps: ", prevProps.user)
    console.log("props: ", this.props.user)
    if(!prevProps.user && this.props.user){
      console.log("Signed in... joining my socket")
      socket.emit("JOIN_ME", this.props.user._id)
      socket.on("ME_UPDATED", user => {
        console.log("ME_UPDATED")
        console.dir(user)
        // this just relogs in the user, so the entire auth.user is reloaded
        // dispatch(authActions.loadAuth())
        dispatch(authActions.fetchCurrentUser())
      })
    }
  }
  componentWillUnmount() {
    console.log("socket controller componentWillUnmount()")
  }
  render() {
    console.log("rendering socket controller")
    return (
      <div></div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps)(Socket)
