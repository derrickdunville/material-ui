import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  transactionCreated,
  transactionUpdated,
  transactionDeleted
} from 'actions/transactionActions'
import {
  subscriptionCreated,
  subscriptionUpdated,
  subscriptionDeleted
} from 'actions/subscriptionActions'
import {
  productCreated,
  productUpdated,
  productDeleted
} from 'actions/productActions'
import {
  userCreated,
  userUpdated,
  userDeleted
} from 'actions/userActions'
import {
  fetchCurrentUser,
  paymentMethodUpdated
} from 'actions/authActions'

import io from 'socket.io-client'
const socket = io(process.env.API_URL, { path: '/ws' })

class Socket extends Component {

  constructor(props, context) {
    super(props, context)
    this.joinMe = this.joinMe.bind(this)
    this.leaveMe = this.leaveMe.bind(this)
    this.joinAdmin = this.joinAdmin.bind(this)
    this.leaveAdmin = this.leaveAdmin.bind(this)
  }
  joinAdmin(){
    const { dispatch, user } = this.props;
    console.log("User is Admin... joining admin socket")
    socket.emit("JOIN_ADMIN", user._id)

    socket.on("ADMIN_USER_CREATED", user => {
      console.log("ADMIN_USER_CREATED heard: ", user.username)
      this.props.userCreated(user)
    })
    socket.on("ADMIN_USER_UPDATED", user => {
      console.log("ADMIN_USER_UPDATED heard: ", user.username)
      this.props.userUpdated(user)
    })
    socket.on("ADMIN_USER_DELETED", user_id => {
      console.log("ADMIN_USER_DELETED heard: ", user_id)
      this.props.userDeleted(user_id)
    })

    socket.on("ADMIN_PRODUCT_CREATED", product => {
      console.log("ADMIN_PRODUCT_CREATED heard: ", product.name)
      this.props.productCreated(product)
    })
    socket.on("ADMIN_PRODUCT_UPDATED", product => {
      console.log("ADMIN_PRODUCT_UPDATED heard: ", product.name)
      this.props.productUpdated(product)
    })
    socket.on("ADMIN_PRODUCT_DELETED", product_id => {
      console.log("ADMIN_PRODUCT_DELETED heard: ", product_id)
      this.props.productDeleted(product)
    })

    socket.on("ADMIN_SUBSCRIPTION_CREATED", subscription => {
      console.log("ADMIN_SUBSCRIPTION_CREATED heard: ", subscription._id)
      this.props.subscriptionCreated(subscription)
    })
    socket.on("ADMIN_SUBSCRIPTION_UPDATED", subscription => {
      console.log("ADMIN_SUBSCRIPTION_UPDATED heard: ", subscription._id)
      this.props.subscriptionUpdated(subscription)
    })
    socket.on("ADMIN_SUBSCRIPTION_DELETED", subscription_id => {
      console.log("ADMIN_SUBSCRIPTION_DELETED heard: ", subscription_id)
      this.props.subscriptionDeleted(subscription_id)
    })

    socket.on("ADMIN_TRANSACTION_CREATED", transaction => {
      console.log("ADMIN_TRANSACTION_CREATED heard: ", transaction._id)
      console.dir(transaction)
      this.props.transactionCreated(transaction)
    })
    socket.on("ADMIN_TRANSACTION_UPDATED", transaction => {
      console.log("ADMIN_TRANSACTION_UPDATED heard: ", transaction._id)
      this.props.transactionUpdated(transaction)
    })
    socket.on("ADMIN_TRANSACTION_DELETED", transaction_id => {
      console.log("ADMIN_TRANSACTION_DELETED heard: ", transaction_id)
      this.props.transactionDeleted(transaction_id)
    })
  }
  leaveAdmin(){
    const { user } = this.props
    socket.emit("LEAVE_ADMIN", user._id)
  }
  joinMe(){
    const { dispatch } = this.props;
    console.log("Signed in... joining my socket")
    socket.emit("JOIN_ME", this.props.user._id)
    socket.on("ME_UPDATED", user => {
      console.log("ME_UPDATED")
      console.dir(user)
      // this just relogs in the user, so the entire auth.user is reloaded
      this.props.fetchCurrentUser()
    })
    socket.on("PAYMENT_METHOD_UPDATED", payment_method => {
      console.log("PAYMENT_METHOD_UPDATED")
      console.dir(payment_method)
      // this just relogs in the user, so the entire auth.user is reloaded
      this.props.paymentMethodUpdated(payment_method)
    })
  }
  leaveMe(){
    const { user } = this.props
    socket.emit("LEAVE_ME", user._id)
  }

  componentDidMount() {
    if(this.props.user){
      this.joinMe()
      if(this.props.user.role === 'admin'){
        this.joinAdmin()
      }
    }
  }

  componentDidUpdate(prevProps, prevState){
    console.log("socket controller componentDidUpdate()")
    // console.dir(prevProps)
    const { dispatch, user } = this.props;
    if(prevProps.user && !user){
      this.leaveMe()
      this.leaveAdmin()
    }
    if(!prevProps.user && user){
      this.joinMe()
      if(user.role === 'admin'){ this.joinAdmin() }
    }
  }
  componentWillUnmount() {
    console.log("socket controller componentWillUnmount()")
    this.leaveMe()
    if(this.props.user.role === 'admin'){ this.leaveAdmin() }
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

export default connect(mapStateToProps, {
  fetchCurrentUser,
  transactionCreated,
  transactionUpdated,
  transactionDeleted,
  subscriptionCreated,
  subscriptionUpdated,
  subscriptionDeleted,
  productCreated,
  productUpdated,
  productDeleted,
  userCreated,
  userUpdated,
  userDeleted,
  paymentMethodUpdated
})(Socket)
