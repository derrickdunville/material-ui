import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import withStyles from '@material-ui/core/styles/withStyles'
import dashboardStyle from 'assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx'
import Paper from '@material-ui/core/Paper'
import { parseDate } from 'utils/DateUtils'
import { getActiveMemberships } from 'utils/UserUtils'
import { loadMemberships } from 'actions'
import {
  toggleCreateSubscriptionOpen,
  clearCreateSubscription,
  cancelSubscription,
  toggleCancelSubscriptionOpen,
  clearCancelSubscription,
  resumeSubscription,
  toggleResumeSubscriptionOpen,
  clearResumeSubscription,
  toggleCreateTransactionOpen,
  clearCreateTransaction
} from 'actions/authActions'
import defaultPic from 'assets/img/faces/marc.jpg'
import AlertDialog from 'components/Dialog/AlertDialog.jsx'
import SubscribeDialog from 'components/Dialog/SubscribeDialog.jsx'
import TransactionDialog from 'components/Dialog/TransactionDialog.jsx'

import { Elements } from 'react-stripe-elements'
import Button from '@material-ui/core/Button'
import PaymentMethod from 'components/Stripe/PaymentMethod.jsx'

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMembership: {},
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

    this.openTransaction = this.openTransaction.bind(this)
    this.closeTransaction = this.closeTransaction.bind(this)
    this.handleTransaction = this.handleTransaction.bind(this)

    this.getOpenProduct = this.getOpenProduct.bind(this)
  }
  componentDidMount() {
     this.setState(state => ({ checked: !state.checked }));
     this.props.loadMemberships()
  }
  componentWillUnmount() {
    this.setState(state => ({ checked: !state.checked }));
  }
  openTransaction(event) {
    this.setState({ openMembership: this.getOpenProduct(event.target.name)}, () =>
    this.props.toggleCreateTransactionOpen())
  }
  closeTransaction() {
    this.props.toggleCreateTransactionOpen()
    let this2 = this
    setTimeout(function () {
      this2.props.clearCreateTransaction()
    }, 200);
  }
  closeSubscribe() {
    this.props.toggleCreateSubscriptionOpen()
    let this2 = this
    setTimeout(function () {
      this2.props.clearCreateSubscription()
    }, 200);
  }
  openSubscribe(event) {
    this.setState({ openMembership: this.getOpenProduct(event.target.name)}, () =>
    this.props.toggleCreateSubscriptionOpen())
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
  handleTransaction(){
    console.log("handle transaction")
  }
  head(){
    return (
      <Helmet>
        <title>{`Billing`}</title>
        <meta property="og:title" content="Billing"/>
      </Helmet>
    )
  }
  getOpenProduct(id){
    for(let i = 0; i < this.props.products.length; ++i){
      if(this.props.products[i]._id == id){
        return this.props.products[i]
      }
    }
    return {}
  }
  renderActiveMemberships(){
    return (
      <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
        {(this.props.activeMemberships.length == 0 && this.props.subscriptions.length == 0) && (
          <div>No Active Memberships</div>
        )}
        {this.props.subscriptions.map(subscription => (
          <div key={subscription._id}
            style={{
              display: "flex",
              alignItems: "center"
            }}>
            <div style={{ borderRadius:"4px", height: "70px", minWidth:"70px", width: "60px", backgroundColor: "#202225", marginRight: "10px"}}></div>
            <div style={{ width: "100%", paddingRight: "10px" }}>
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
        {this.props.activeMemberships.map(transaction => (
          <div key={transaction._id}>
            {transaction.product.interval == "one-time" && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center"
                }}>
                <div style={{ borderRadius:"4px", height: "70px", minWidth:"70px", width: "60px", backgroundColor: "#202225", marginRight: "10px"}}></div>
                <div style={{ width: "100%", paddingRight: "10px" }}>
                  <div style={{fontSize: "18px", fontWeight: '1'}}>{transaction.product.name}</div>
                  {transaction.expires_at ? (
                    <div style={{fontSize: "14px", fontWeight: '1'}}>Expires on {parseDate(transaction.expires_at)}</div>
                  ):(
                    <div style={{fontSize: "14px", fontWeight: '1'}}>We are stuck together, forever!</div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </Paper>
    )
  }
  renderMemberships(){
    return (
      <div>
      {this.props.products.length != 0 && !hasMembershipWithNoExpiration(this.props.activeMemberships) ? (
        <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
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
                {(product.interval == 'month' || product.interval == 'year') ? (
                  <Button variant="outlined" name={product._id} color="primary" onClick={this.openSubscribe}>Subscribe</Button>
                ):(
                  <div>
                    {product.amount == 0 ? (
                      <Button variant="outlined" name={product._id} color="primary" onClick={this.openTransaction}>Use</Button>
                    ):(
                      <Button variant="outlined" name={product._id} color="primary" onClick={this.openTransaction}>Buy</Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </Paper>
      ):(<div></div>)}
      </div>
    )
  }
  renderPaymentMethod(){
    return(
      <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
        <div style={{marginBottom: "10px"}}>Payment Method</div>
        <div>
          <PaymentMethod
            action="update"
            />
        </div>
      </Paper>

    )
  }
  renderTransactions(){
    return (
      <Paper style={{backgroundColor: "#383838", padding: "10px", marginBottom: "10px"}}>
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
          <div style={{fontSize: "13px", width: "90px", minWidth: "80px", paddingLeft: "10px"}}>DATE</div>
          <div style={{fontSize: "13px", width: "100%", minWidth: "100px"}}>PRODUCT</div>
          <div style={{fontSize: "13px", width: "100px", float:"right", textAlign: "right", paddingRight: "10px"}}>AMOUNT</div>
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
                 width: "90px",
                 minWidth: "80px",
                 paddingLeft: "10px"}}>
               {parseDate(transaction.created_at)}
             </div>
             <div style={{
                 fontSize: "13px",
                 width: "100%",
                 minWidth: "100px"}}>
               {transaction.product.name} - {transaction.status}
             </div>
             <div style={{
                 fontSize: "13px",
                 width: "100px",
                 float:"right",
                 textAlign: "right",
                 paddingRight: "10px"}}>
               ${(transaction.amount/100).toFixed(2)}
             </div>
           </div>
         ))}
      </Paper>
    )
  }
  render(){
    const { classes, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        {this.head()}
        <div className={classes.route} ref="mainPanel">
          <div className={classes.content}>
            {this.renderActiveMemberships()}
            {this.renderMemberships()}
            {this.renderPaymentMethod()}
            {this.renderTransactions()}
            <SubscribeDialog
              loading={this.props.auth.creatingSubscription}
              loadingMessage="Subscribing"
              successMessage={this.props.auth.createSubscriptionSuccessMessage}
              errorMessage={this.props.auth.createSubscriptionFailMessage}
              product={this.state.openMembership}
              style={{width: "100%"}}
              buttonText="Subscribe"
              buttonColor="primary"
              open={this.props.auth.createSubscriptionOpen}
              title={`Subscribe to ${this.state.openMembership.name}`}
              text={`Thank you for subscribing to ${this.state.openMembership.name}. You will not be charged until you click "Pay".`}
              leftAction={this.closeSubscribe}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleSubscribe}
              rightActionText="Pay"
              rightActionColor="primary"
              onClick={this.openSubscribe}
              onClose={this.closeSubscribe}
              />
            <TransactionDialog
                loading={this.props.auth.creatingTransaction}
                loadingMessage="Processing..."
                successMessage={this.props.auth.createTransactionSuccessMessage}
                errorMessage={this.props.auth.createTransactionErrorMessage}
                product={this.state.openMembership}
                style={{width: "100%"}}
                buttonText="Subscribe"
                buttonColor="primary"
                open={this.props.auth.createTransactionOpen}
                title={`Purchase ${this.state.openMembership.name}`}
                text={`Thank you for purchasing ${this.state.openMembership.name}. You will not be charged until you click "Pay".`}
                leftAction={this.closeTransaction}
                leftActionText="Cancel"
                leftActionColor="default"
                rightAction={this.handleTransaction}
                rightActionText="Pay"
                rightActionColor="primary"
                onClick={this.openTransaction}
                onClose={this.closeTransaction}
                />
          </div>
        </div>
      </div>
    )
  }
}


function excludeActiveProducts(products, transactions){
  let filteredProducts = []
  if(transactions.length > 0){
    for(let i = 0; i < products.length; ++i){
      let product = products[i]
      let found = false
      for(let j = 0; j < transactions.length; ++j){
        let transaction = transactions[j]
        if(transaction.product.category == "membership" && (product._id == transaction.product._id || transaction.product.membership_level > product.membership_level)){
          found = true
          break
        }
      }
      if(!found){filteredProducts.push(product)}
    }
  } else {
    return products
  }
  return filteredProducts
}
function hasMembershipWithNoExpiration(activeMemberships){
  for(let i = 0; i < activeMemberships.length; ++i){
    if(activeMemberships[i].expires_at == null && activeMemberships[i].product.category == "membership"){
      return true
    }
  }
  return false
}
function mapStateToProps(state) {
  return {
    activeMemberships: getActiveMemberships(state.auth.user.transactions),
    cancelOpen: state.subscriptions.cancelOpen,
    transactions: state.auth.user.transactions || [],
    subscriptions: state.auth.user.subscriptions || [],
    products: excludeActiveProducts(state.app.memberships.docs || [], (state.auth.user.transactions || [])) || [],
    auth: state.auth
  }
}

export default {
  component: connect(mapStateToProps, {
    loadMemberships,
    toggleCreateSubscriptionOpen,
    clearCreateSubscription,
    cancelSubscription,
    toggleCancelSubscriptionOpen,
    clearCancelSubscription,
    resumeSubscription,
    toggleResumeSubscriptionOpen,
    clearResumeSubscription,
    toggleCreateTransactionOpen,
    clearCreateTransaction
   })(withStyles(dashboardStyle)(Billing))
}
