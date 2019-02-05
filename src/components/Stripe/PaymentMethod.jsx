import React, { Component } from 'react'
import { Elements } from 'react-stripe-elements';
import CreditCard from './CreditCard.jsx'
import {StripeProvider} from 'react-stripe-elements';

class PaymentMethod extends Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
      <Elements>
        <CreditCard
          product={this.props.product} onClose={this.props.onClose}/>
      </Elements>
    )
  }
}

export default PaymentMethod
