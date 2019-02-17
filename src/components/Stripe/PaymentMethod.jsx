import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import CreditCard from './CreditCard.jsx'
import {StripeProvider} from 'react-stripe-elements'
import { toggleUpdatePaymentMethodOpen } from 'actions/authActions'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import Button from '@material-ui/core/Button';
import { createSubscription, createTransaction } from 'actions/authActions'
import { postTransaction } from 'actions/transactionActions'
import CircularProgress from '@material-ui/core/CircularProgress';

class PaymentMethod extends Component {
  constructor(props){
    super(props)
    this.state = {
      editOpen: false
    }
    this.openEdit = this.openEdit.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  openEdit(){
    this.setState({editOpen: true})
  }
  onSubmit(){
    // onSubmit is used to create a transaction or subscription with existing payment method
    console.log("handle submit")
    if(this.props.action === "subscription"){
      this.props.createSubscription({ product: this.props.product._id })
    }
    if(this.props.action === "transaction"){
      this.props.createTransaction({ product: this.props.product._id })
    }
  }

  renderUpdate(){
    return (
      <div>
        {this.props.updatingPaymentMethod ? (
          <div style={{ padding: "10px", borderRadius: "4px", display:"flex", alignItems: "center", justifyContent:"center", fontSize: "15px", fontWeight: '1', backgroundColor: "#202225"}}>
            <CircularProgress size={20}/>
          </div>
        ):(
          <div>
            {this.props.editPaymentMethodOpen ? (
              <div style={{ padding: "10px", borderRadius: "4px", display:"flex", alignItems: "center", fontSize: "15px", fontWeight: '1', backgroundColor: "#202225"}}>
                <Elements>
                  <CreditCard
                    action="update"
                    errorMessage={this.props.updatePaymentMethodErrorMessage}
                    onClose={this.props.toggleUpdatePaymentMethodOpen}/>
                </Elements>
              </div>
            ):(
              <div>
                {this.props.payment_method != false ? (
                  <div style={{  padding: "10px", borderRadius: "4px", display:"flex", alignItems: "center", fontSize: "15px", fontWeight: '1', backgroundColor: "#202225"}}>
                    <CreditCardIcon fontSize='large' style={{marginRight: "10px"}}/>
                    <div style={{width: "100%"}}>{this.props.payment_method.brand} {this.props.payment_method.last4} - {this.props.payment_method.exp_month}/{this.props.payment_method.exp_year}</div>
                    <Button variant="outlined" color="primary" onClick={this.props.toggleUpdatePaymentMethodOpen}>Update</Button>
                  </div>
                ):(
                  <div style={{  padding: "10px", borderRadius: "4px", display:"flex", alignItems: "center", fontSize: "15px", fontWeight: '1', backgroundColor: "#202225"}}>
                    <CreditCardIcon fontSize='large' style={{marginRight: "10px"}}/>
                    <div style={{width: "100%"}}>Add a payment method</div>
                    <Button variant="outlined" color="primary" onClick={this.props.toggleUpdatePaymentMethodOpen}>Add</Button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }
  renderSubscription(){
    return (
      <div>
        {this.state.editOpen || !this.props.payment_method ? (
          <div>
            <Elements>
              <CreditCard
                product={this.props.product}
                action="subscription"
                onClose={this.props.onClose}/>
            </Elements>
          </div>
        ):(
          <div>
            <div style={{height: "37.2px", paddingRight: "16px", color: "black", display:"flex", alignItems: "center", fontSize: "15px", fontWeight: '1'}}>
              <CreditCardIcon fontSize='large' style={{marginRight: "10px"}}/>
              <div style={{color: "black", width: "100%"}}>{this.props.payment_method.brand} {this.props.payment_method.last4} - {this.props.payment_method.exp_month}/{this.props.payment_method.exp_year}</div>
              <Button color="default" onClick={this.openEdit}>Update</Button>
            </div>
            <div style={{height: "36.5px"}}>
              <Button
                color="primary"
                style={{
                  float: "right",
                }}
                onClick={this.onSubmit}
                >
                {this.props.action == "update" ? "Save" : "Pay"}
              </Button>
              <Button
                color="secondary"
                style={{
                  float: "right",
                }}
                onClick={this.props.onClose}
                >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }
  renderTransaction(){
    return (
      <div>
        {this.state.editOpen || !this.props.payment_method ? (
          <Elements>
            <CreditCard
              product={this.props.product}
              action="transaction"
              onClose={this.props.onClose}/>
          </Elements>
        ):(
          <div>
            <div style={{height: "37.2px", paddingRight: "16px", color: "black", display:"flex", alignItems: "center", fontSize: "15px", fontWeight: '1'}}>
              <CreditCardIcon fontSize='large' style={{marginRight: "10px"}}/>
              <div style={{color: "black", width: "100%"}}>{this.props.payment_method.brand} {this.props.payment_method.last4} - {this.props.payment_method.exp_month}/{this.props.payment_method.exp_year}</div>
              <Button color="default" onClick={this.openEdit}>Update</Button>
            </div>
            <div style={{ padding: "10px", fontSize: "11px", color: "#787878", lineHeight: "1.2"}}>
              *By purchasing this product you argee to our Terms of Service. You authorize us to
              immediatly charge the payment method provided at ${(this.props.product.amount/100).toFixed(2)} for
              this one-time purchase. This product is a digital product and is non-refundable.
            </div>
            <div style={{height: "36.5px"}}>
              <Button
                color="primary"
                style={{
                  float: "right",
                }}
                onClick={this.onSubmit}
                >
                {this.props.action == "update" ? "Save" : "Pay"}
              </Button>
              <Button
                color="secondary"
                style={{
                  float: "right",
                }}
                onClick={this.props.onClose}
                >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    )
  }

  render(){
    return (
      <div>
        {this.props.action == "update" && this.renderUpdate()}
        {this.props.action == "transaction" && this.renderTransaction()}
        {this.props.action == "subscription" && this.renderSubscription()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    payment_method: state.auth.payment_method,
    editPaymentMethodOpen: state.auth.editPaymentMethodOpen,
    updatingPaymentMethod: state.auth.updatingPaymentMethod,
    updatePaymentMethodErrorMessage: state.auth.updatePaymentMethodErrorMessage
  }
}

export default connect(mapStateToProps, { toggleUpdatePaymentMethodOpen, createSubscription, createTransaction })(PaymentMethod)
