import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles"
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx"
import Paper from "@material-ui/core/Paper"
import { parseDate } from "utils/DateUtils"
import { getProducts } from "actions/productActions"
import {
  cancelSubscription,
  toggleCancelSubscriptionOpen,
  clearCancelSubscription,
  resumeSubscription,
  toggleResumeSubscriptionOpen,
  clearResumeSubscription
} from "actions/authActions"
import defaultPic from "assets/img/faces/marc.jpg"
import AlertDialog from "components/Dialog/AlertDialog.jsx"
import SubscribeDialog from "components/Dialog/SubscribeDialog.jsx"
import { Elements } from 'react-stripe-elements'
import Button from '@material-ui/core/Button'

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      subscribeOpen: false,
      openMembership: "",
      cancelMembership: "",
      resumeMembership: "",
      checked: false
    };
    this.closeSubscribe = this.closeSubscribe.bind(this)
    this.openSubscribe = this.openSubscribe.bind(this)
    this.openCancel = this.openCancel.bind(this)
    this.closeCancel = this.closeCancel.bind(this)
    this.handleSubscribe = this.handleSubscribe.bind(this)
    this.handleCancel = this.handleCancel.bind(this)

    this.openResume = this.openResume.bind(this)
    this.closeResume = this.closeResume.bind(this)
    this.handleResume = this.handleResume.bind(this)
  }
  componentDidMount() {
     this.setState(state => ({ checked: !state.checked }));
     this.props.getProducts({category: "membership"})
  }
  componentWillUnmount() {
    this.setState(state => ({ checked: !state.checked }));
  }
  closeSubscribe() {
    this.setState({ subscribeOpen: false, openMembership: "" })
  }
  openSubscribe(event) {
    this.setState({ subscribeOpen: true, openMembership: event.target.name })
  }
  openCancel(event){
    this.setState({ cancelMembership: event.target.name }, () =>
    this.props.toggleCancelSubscriptionOpen())
  }
  closeCancel(){
    this.setState({ cancelMembership: "" }, () => this.props.toggleCancelSubscriptionOpen())
    let props2 = this.props
    setTimeout(function () {
      props2.clearCancelSubscription()
    }, 250);
  }
  handleCancel(){
    this.props.cancelSubscription(this.state.cancelMembership)
  }
  openResume(event){
    this.setState({ resumeMembership: event.target.name }, () => this.props.toggleResumeSubscriptionOpen())
  }
  closeResume(){
    this.setState({ resumeMembership: "" }, () => this.props.toggleResumeSubscriptionOpen())
    let props2 = this.props
    setTimeout(function () {
      props2.clearResumeSubscription()
    }, 250);
  }
  handleResume(){
    this.props.resumeSubscription(this.state.resumeMembership)
  }
  handleSubscribe(){
    console.log("handle subscribe")
  }
  head(){
    return (
      <Helmet>
        <title>{`Billing`}</title>
        <meta property="og:title" content="Billing"/>
      </Helmet>
    )
  }

  renderSubscriptions(){
    return (
      <div>
        {this.props.subscriptions.map(subscription => (
          <div key={subscription._id}
            style={{
              display: "flex",
              alignItems: "center"
            }}>
            <div style={{ borderRadius:"4px", height: "70px", minWidth:"70px", width: "60px", backgroundColor: "white", marginRight: "10px"}}></div>
            <div style={{ width: "100%" }}>
              <div style={{fontSize: "18px", fontWeight: '1'}}>{subscription.product.name}</div>
              {subscription.cancel_at_period_end ? (
                <div style={{fontSize: "14px", fontWeight: '1'}}>Canceled and ends on {parseDate(subscription.current_period_end)}</div>
              ):(
                <div style={{fontSize: "14px", fontWeight: '1'}}>${(subscription.product.amount/100).toFixed(2)} occurs on {parseDate(subscription.current_period_end)}</div>
              )}

            </div>
            <div>
              <AlertDialog
                hidden={!subscription.cancel_at_period_end}
                name={subscription._id}
                style={{width: "100%"}}
                buttonText="Resume"
                buttonColor="primary"
                message={this.props.auth.resumingSubscriptionSuccessMessage}
                loading={this.props.auth.resumingSubscription}
                loadingMessage="Resuming..."
                open={this.props.auth.resumeSubscriptionOpen && this.state.resumeMembership == subscription._id}
                title={`Resume ${subscription.product.name} Membership?`}
                text={`Are you sure you would like to resume your ${subscription.product.name} Membership? This will resume future recurring charges of the subscription associated with this memebership.`}
                leftAction={this.closeResume}
                leftActionText="Nevermind"
                leftActionColor="default"
                rightAction={this.handleResume}
                rightActionText="Resume"
                rightActionColor="primary"
                onClick={this.openResume}
                onClose={this.closeResume}
                />
              <AlertDialog
                hidden={subscription.cancel_at_period_end}
                name={subscription._id}
                style={{width: "100%"}}
                buttonText="Cancel"
                buttonColor="secondary"
                message={this.props.auth.cancelingSubscriptionSuccessMessage}
                loading={this.props.auth.cancelingSubscription}
                loadingMessage="Cancelling..."
                open={this.props.auth.cancelSubscriptionOpen && this.state.cancelMembership == subscription._id}
                title={`Cancel ${subscription.product.name} Membership?`}
                text={`Are you sure you would like to cancel your ${subscription.product.name} Membership? This will stop future recurring charges of the subscription associated with this memebership. Your memberhsip will expire on ${parseDate(subscription.current_period_end)}. You will still have access until then.`}
                leftAction={this.closeCancel}
                leftActionText="Nevermind"
                leftActionColor="default"
                rightAction={this.handleCancel}
                rightActionText="Cancel"
                rightActionColor="secondary"
                onClick={this.openCancel}
                onClose={this.closeCancel}
                />
            </div>
          </div>
        ))}
      </div>
    )
  }
  renderMemberships(){
    return (
      <div>
        <div style={{marginBottom: "10px"}}>Memberships</div>
        {this.props.products.length == 0 && (
          <div>Empty</div>
        )}
        {this.props.products.map(product => (
          <div key={product._id}
            style={{
              display: "flex",
              height: "80px",
              alignItems: "center",
              backgroundColor: "#202225",
              marginBottom: "10px",
              borderRadius: "4px",
              paddingLeft: "10px",
              paddingRight: "10px"
            }}>
            <div style={{
                height: "60px",
                width: "60px",
                marginRight: "10px"
              }}>
              <img src={defaultPic} style={{width: "60px", height: "60px"}}/>
            </div>
            <div style={{width: "100%"}}>
              <div style={{fontSize: '18px', fontWeight: '1'}}>
              {product.name}
              </div>
              <div style={{fontSize: '15px'}}>
                ${(product.amount/100).toFixed(2)} {product.interval}
              </div>
            </div>
            <div>
              <SubscribeDialog
                name={product._id}
                product={product}
                style={{width: "100%"}}
                buttonText="Subscribe"
                buttonColor="primary"
                open={this.state.subscribeOpen && this.state.openMembership == product._id}
                title={`Subscribe to ${product.name}`}
                text={`Thank you for subscribing to ${product.name}. You will not be charged until you click "Pay".`}
                leftAction={this.closeSubscribe}
                leftActionText="Cancel"
                leftActionColor="default"
                rightAction={this.handleSubscribe}
                rightActionText="Pay"
                rightActionColor="primary"
                onClick={this.openSubscribe}
                onClose={this.closeSubscribe}
                />
            </div>
          </div>
        ))}
      </div>
    )
  }
  renderPaymentMethod(){
    return(
      <div>Payment Method</div>
    )
  }
  renderTransactions(){
    return (
      <div>
        <div style={{marginBottom: "10px"}}>Billing History</div>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: '50px',
            backgroundColor: "#202225",
            alignItems: "center",
            borderRadius: "4px 4px 0 0"
          }}>
          <div style={{fontSize: "13px", width: "100%", minWidth: "80px", paddingLeft: "10px"}}>DATE</div>
          <div style={{fontSize: "13px", width: "100%", minWidth: "100px"}}>PRODUCT</div>
          <div style={{fontSize: "13px", width: "100%", float:"right", textAlign: "right", paddingRight: "10px"}}>AMOUNT</div>
        </div>
        <div style={{height: "1px", backgroundColor: "black"}}/>
        {this.props.transactions.length == 0 && (
          <div style={{
              fontSize: "13px",
              display: "flex",
              height: '50px',
              paddingLeft: "10px",
              backgroundColor: "#202225",
              alignItems: "center",
              borderRadius: "0 0 4px 4px"
            }}>
            No transactions
          </div>
        )}
        {this.props.transactions.map(transaction => (
           <div key={transaction._id}
             style={{
               display: "flex",
               width: "100%",
               height: '50px',
               backgroundColor: "#202225",
               alignItems: "center"
             }}>
             <div style={{
                 fontSize: "13px",
                 width: "100%",
                 minWidth: "80px",
                 paddingLeft: "10px"}}>
               {parseDate(transaction.created_at)}
             </div>
             <div style={{
                 fontSize: "13px",
                 width: "100%",
                 minWidth: "100px"}}>
               {transaction.product.name}
             </div>
             <div style={{
                 fontSize: "13px",
                 width: "100%",
                 float:"right",
                 textAlign: "right",
                 paddingRight: "10px"}}>
               {(transaction.amount/100).toFixed(2)}
             </div>
           </div>
         ))}
      </div>
    )
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {this.renderSubscriptions()}
            </Paper>
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {this.renderMemberships()}
            </Paper>
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {this.renderPaymentMethod()}
            </Paper>
            <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
              {this.renderTransactions()}
            </Paper>
          </div>
        </div>
      </div>
    )
  }
}

function excludeSubscribedToProducts(products, subscriptions){
  let filteredProducts = []
  if(subscriptions.length > 0){
    for(let i = 0; i < products.length; ++i){
      let product = products[i]
      let found = false
      for(let j = 0; j < products.length; ++j){
        let subscription = subscriptions[j]
        if(product._id == subscription.product._id){
          found = true
          break
        }
      }
      if(!found){filteredProducts.push(product)}
    }
  } else {return products}
  return filteredProducts
}

function mapStateToProps(state) {
  return {
    cancelOpen: state.subscriptions.cancelOpen,
    transactions: state.auth.user.transactions || [],
    subscriptions: state.auth.user.subscriptions || [],
    products: excludeSubscribedToProducts(state.products.docs, (state.auth.user.subscriptions || [])) || [],
    auth: state.auth
  }
}

export default {
  component: connect(mapStateToProps, {
    getProducts,
    cancelSubscription,
    toggleCancelSubscriptionOpen,
    clearCancelSubscription,
    resumeSubscription,
    toggleResumeSubscriptionOpen,
    clearResumeSubscription
   })(withStyles(dashboardStyle)(Billing))
}
