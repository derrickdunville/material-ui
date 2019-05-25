import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  putSubscription,
  deleteSubscription,
  clearPutSubscription,
  clearDeleteSubscription
} from 'actions/subscriptionActions'
import { Field, reduxForm, formValueSelector  } from 'redux-form'
import * as regex from 'utils/regex'

import AlertDialog from "components/Dialog/AlertDialog.jsx"

import Button from '@material-ui/core/Button'
import FormTextField from 'components/FormFields/FormTextField.jsx'
import FormSelect from 'components/FormFields/FormSelect.jsx'
import UserSelect from 'components/FormFields/UserSelect.jsx'
import ProductSelect from 'components/FormFields/ProductSelect.jsx'
import SubscriptionSelect from 'components/FormFields/SubscriptionSelect.jsx'
import FormDatePicker from 'components/FormFields/FormDatePicker.jsx'

const selector = formValueSelector('subscription')

class SubscriptionReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false,
      cancelOpen: false,
      stopOpen: false,
    }
  }

  openCancel = () => {
    this.setState({cancelOpen: true})
  }
  closeCancel = () => {
    this.setState({cancelOpen: false})
  }
  handleCancel = () =>{
    console.log("handle cancel")
    this.props.putSubscription(
      {
        _id: this.props.subscription._id,
        cancel: true
      })
  }
  openStop = () => {
    this.setState({stopOpen: true})
  }
  closeStop = () => {
    this.setState({stopOpen: false})
  }
  handleStop = () => {
    console.log("handle stop")
    this.props.putSubscription(
      {
        _id: this.props.subscription._id,
        cancel_at_period_end: true
      })
  }
  openDelete = () => {
    this.setState({deleteOpen: true})
  }
  closeDelete = () => {
    this.setState({deleteOpen: false})
  }
  handleDelete = () => {
    this.props.deleteSubscription(this.props.history, this.props.subscription._id)
  }

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()
    console.log("submitting subscription")
  }

  render(){
    const { classes, invalid, pristine, editing} = this.props;
    console.dir(this.props)
    return(
      <form onSubmit={this.openCreate}>
        <Field name="_id"
          disabled={true}
          label="ID"
          component={FormTextField}
          type="text"/>
        <Field name="subscription_id"
          disabled={true}
          label="Subscription ID"
          component={FormTextField}
          type="text"/>
        <Field name="user"
          disabled={true}
          label="User"
          component={UserSelect}
          type="text"
          placeholder="The user this subscription is for"/>
        <Field name="product"
          disabled={true}
          label="Product"
          component={ProductSelect}
          type="text"
          placeholder="The product this subscription is for"/>
        <Field name="price"
          disabled={true}
          label="Amount"
          component={FormTextField}
          type="number"
          placeholder="Amount in cents"/>
        <Field name="status"
          disabled={true}
          label="Status"
          id="status-select"
          labelWidth={32}
          component={FormSelect}
          items={["trialing", "active", "past-due", "canceled"]}/>
        <Field name="gateway"
          disabled={true}
          label="Gateway"
          id="gateway-select"
          labelWidth={32}
          component={FormSelect}
          items={['manual', 'stripe']}/>
        <Field name="created_at"
          disabled={true}
          label="Created"
          component={FormDatePicker}
          disableFuture={true}
          type="text"/>
        <Field name="canceled_at"
          disabled={true}
          label="Canceled"
          component={FormDatePicker}
          minDate={this.props.created_at}
          type="text"/>
        <Field name="current_period_start"
          disabled={true}
          label="Current Period Start"
          component={FormDatePicker}
          minDate={this.props.current_period_start}
          type="text"/>
        <Field name="current_period_end"
          disabled={true}
          label="Current Period End"
          component={FormDatePicker}
          minDate={this.props.current_period_start}
          type="text"/>
        <AlertDialog
          buttonProps={{
            style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
          }}
          buttonText="Delete"
          buttonColor="secondary"
          loading={this.props.deletingSubscription}
          loadingMessage={"Deleting Subscription..."}
          successMessage={this.props.deleteSubscriptionSuccessMessage}
          errorMessage={this.props.deleteSubscriptionErrorMessage}
          open={this.state.deleteOpen}
          title={`Delete ${this.props.subscription.subscription_id}?`}
          text="Are you sure you would like to delete this subscription? This will result in this subscription being end-dated. It will not actually be deleted permenantly but it will be masked and all associated records will also be end-dated. This action cannot be undone."
          leftAction={this.closeDelete}
          leftActionText="Nevermind"
          leftActionColor="default"
          rightAction={this.handleDelete}
          rightActionText="Delete"
          rightActionColor="secondary"
          onClick={this.openDelete}
          onClose={this.closeDelete}
          />
        <AlertDialog
          buttonProps={{
            style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
          }}
          buttonText={this.props.subscription.status == 'canceled' ? "Canceled" : "Cancel"}
          buttonColor="default"
          disabled={this.props.subscription.status == "canceled" ? true : false}
          loading={this.props.puttingSubscription}
          loadingMessage={"Canceling Subscription..."}
          successMessage={this.props.putSubscriptionSuccessMessage}
          errorMessage={this.props.putSubscriptionErrorMessage}
          open={this.state.cancelOpen}
          title={`Cancel ${this.props.subscription.subscription_id}?`}
          text="Are you sure you would like to cancel this subscription? This will result in this subscription being canceled immediatly. The user will no longer be billed and access will be revoked."
          leftAction={this.closeCancel}
          leftActionText="Nevermind"
          leftActionColor="default"
          rightAction={this.handleCancel}
          rightActionText="Cancel"
          rightActionColor="secondary"
          onClick={this.openCancel}
          onClose={this.closeCancel}
          />
        <AlertDialog
          buttonProps={{
            style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
          }}
          buttonText={this.props.subscription.cancel_at_period_end ? "Stopped" : "Stop"}
          buttonColor="default"
          disabled={this.props.subscription.cancel_at_period_end ? true : false}
          loading={this.props.puttingSubscription}
          loadingMessage={"Deleting Subscription..."}
          successMessage={this.props.putSubscriptionSuccessMessage}
          errorMessage={this.props.putSubscriptionErrorMessage}
          open={this.state.stopOpen}
          title={`Stop ${this.props.subscription.subscription_id}?`}
          text="Are you sure you would like to stop this subscription? This will stop future billing of this subscription. The user will still have access until the current period end."
          leftAction={this.closeStop}
          leftActionText="Nevermind"
          leftActionColor="default"
          rightAction={this.handleStop}
          rightActionText="Stop"
          rightActionColor="secondary"
          onClick={this.openStop}
          onClose={this.closeStop}
          />
      </form>
    )
  }
}

function mapStateToProps(state, props) {

  let initialValues = {}
  if(props.subscription){
    initialValues = {
      ...props.subscription,
      user: {value: props.subscription.user._id, label: props.subscription.user.username},
      product: {value: props.subscription.product._id, label: props.subscription.product.name}
    }
  }
  return {
    initialValues: initialValues,
    trans_num: selector(state, 'trans_num'),
    user: selector(state, 'user'),
    product: selector(state, 'product'),
    interval: selector(state, 'interval'),
    price: selector(state, 'price'),
    status: selector(state, 'status'),
    gateway: selector(state, 'gateway'),
    created_at: selector(state, 'created_at'),
    canceled_at: selector(state, 'canceled_at'),
    current_period_start: selector(state, 'current_period_start'),
    current_period_end: selector(state, 'current_period_end'),

    puttingSubscription: state.subscriptions.puttingSubscription,
    putSubscriptionSuccessMessage: state.subscriptions.putSubscriptionSuccessMessage,
    putSubscriptionErrorMessage: state.subscriptions.putSubscriptionErrorMessage,

    deletingSubscription: state.subscriptions.deletingSubscription,
    deleteSubscriptionSuccessMessage: state.subscriptions.deleteSubscriptionSuccessMessage,
    deleteSubscriptionErrorMessage: state.subscriptions.deleteSubscriptionErrorMessage
  }
}

SubscriptionReduxForm = reduxForm({
  form: 'subscription',
  enableReinitialize: true
})(withRouter(SubscriptionReduxForm))

export default connect(
  mapStateToProps,
  {
    putSubscription,
    clearPutSubscription,
    deleteSubscription,
    clearDeleteSubscription
  }
)(SubscriptionReduxForm)
