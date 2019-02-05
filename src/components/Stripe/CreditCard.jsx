import React, { Component } from 'react'
import { connect } from 'react-redux'
import { injectStripe } from 'react-stripe-elements';
import { CardElement, CardNumberElement, CardExpiryElement, CardCVCElement, PostalCodeElement} from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import { postSubscription } from 'actions/subscriptionActions'

class CreditCard extends Component {
  constructor(props){
    super(props)
    this.state = {

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
      let subscription = {
        product: this.props.product._id,
        stripe_source_token: token
      }
      this.props.postSubscription(subscription)
    });
  };

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div
          style={{
            paddingRight: "16px",
            paddingLeft: "20px",
            paddingBottom: "15px"
          }}>
          <CardElement />
        </div>
        <Button
          style={{
            float: "right",
            marginRight: "8px",
            marginBottom: "8px"
          }}
          onClick={this.handleSubmit}
          >
          Pay
        </Button>
        <Button
          style={{
            float: "right",
            marginBottom: "8px"
          }}
          onClick={this.props.onClose}
          >
          Cancel
        </Button>
      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user || {}
  }
}

export default injectStripe(connect(mapStateToProps, { postSubscription })(CreditCard))
