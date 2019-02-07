import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import { postTransaction } from 'actions/transactionActions'
import { updatePaymentMethod, createSubscription } from 'actions/authActions'

class CreditCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      error: ''
    }
  }
  handleSubmit = (ev) => {
    // We don't want to let default form submission happen here, which would refresh the page.
    ev.preventDefault();
    // Within the context of `Elements`, this call to createToken knows which Element to
    // tokenize, since there's only one in this group.
    this.props.stripe.createToken({name: this.props.user.email}).then(({token}) => {
      console.log('Received Stripe token:', token);
      // Now we need to send the token back up to the parent
      if(token != undefined){
        if(this.props.action === "update"){
          this.props.updatePaymentMethod(token)
        }
        if(this.props.action === "subscription"){
          this.props.createSubscription({ product: this.props.product._id, stripe_source_token: token })
        }
        if(this.props.action === "transaction"){
          this.props.postTransaction({ product: this.props.product._id, stripe_source_token: token })
        }
      } else {
        this.setState({error: "error creating token"})
      }

      // I guess we can pass a prop to determine what action is happening with the token
      // could be update payment method, create transaction, or create subscription
      // this.props.postSubscription(subscription)
    });
  };
  render(){
    let styles = {}
    if(this.props.action == 'update'){
      styles = {
        base: {
          iconColor: 'white',
          color: "white",
          fontSize: '16px',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
      }
    } else {
      styles = {
        base: {
          iconColor: 'black',
          color: "black",
          fontSize: '16px',
          fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        }
      }
    }
    return (
      <form style={{width: "100%"}} onSubmit={this.handleSubmit}>
        <div
          style={{
            paddingBottom: "10px",
            paddingTop: "8px",
            alignItems: "center"
          }}>
          <CardElement style={styles} />
        </div>
        <div style={{height: "36.5px"}}>
          <Button
            color="primary"
            style={{
              float: "right",
            }}
            onClick={this.handleSubmit}
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
      </form>
    )
  }
}
CreditCard.propTypes = {
  action: PropTypes.oneOf(["update", "transaction", "subscription"]).isRequired
}

function mapStateToProps(state) {
  return {
    user: state.auth.user || {}
  }
}

export default injectStripe(connect(mapStateToProps, { createSubscription, postTransaction, updatePaymentMethod })(CreditCard))
