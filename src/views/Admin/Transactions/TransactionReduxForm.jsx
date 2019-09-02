import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import {
  postTransaction,
  putTransaction,
  deleteTransaction,
  clearPostTransaction,
  clearPutTransaction,
  clearDeleteTransaction
} from 'actions/transactionActions'
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

const selector = formValueSelector('transaction')

const validate = (values, props) => {
  const errors = {}
  if(!values.user){
    errors.user = "Required"
  }
  if(!values.product){
    errors.product = "Required"
  }
  if(!values.amount){
    errors.amount = "Required"
  }
  if(!values.status){
    errors.status = "Required"
  }
  if(!values.gateway){
    errors.gateway = "Required"
  }
  if(!values.created_at){
    errors.created_at = "Required"
  }
  return errors
}

class TransactionReduxForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteOpen: false,
      editOpen: false,
      refundOpen: false,
      createOpen: false
    }
  }

  openRefund = () => {
    this.setState({refundOpen: true})
  }
  closeRefund = () => {
    this.setState({refundOpen: false})
    let this2 = this
    setTimeout(function () {
      this2.props.clearPutTransaction()
    }, 200);
  }
  handleRefund = () => {
    console.log("handle refund")
    this.props.putTransaction(
      {
        _id: this.props.transaction._id,
        status: "refunded"
      })
  }
  openDelete = () => {
    this.setState({deleteOpen: true})
  }
  closeDelete = () => {
    this.setState({deleteOpen: false})
  }
  handleDelete = () => {
    this.props.deleteTransaction(this.props.history, this.props.transaction._id)
  }
  openCreate = () => {
    this.setState({createOpen: true})
  }
  closeCreate = () => {
    this.setState({createOpen: false})
    let this2 = this
    setTimeout(function () {
      this2.props.clearPostTransaction()
    }, 200);
  }
  openEdit = () => {
    this.setState({editOpen: true})
  }
  closeEdit = () => {
    this.setState({editOpen: false})
    let this2 = this
    setTimeout(function () {
      this2.props.clearPutTransaction()
    }, 200);
  }

  handleSubmit = (event) => {
    event.persist()
    event.preventDefault()
    console.log("submitting transaction")

    let transaction = {
      trans_num: this.props.trans_num,
      user: this.props.user.value,
      product: this.props.product.value,
      amount: this.props.amount,
      status: this.props.status,
      gateway: this.props.gateway,
      subscription: this.props.subscription || null,
      created_at: this.props.created_at,
      expires_at: this.props.expires_at || null
    }
    if(this.props.editing){
      transaction._id = this.props.transaction._id
      this.props.putTransaction(transaction)
    } else {
      this.props.postTransaction(this.props.history, transaction)
    }
  }

  render(){
    const { classes, invalid, pristine, editing} = this.props;
    console.dir(this.props)
    return(
      <form onSubmit={this.openCreate}>
        <Field name="trans_num"
          label="Transaction Number"
          component={FormTextField}
          type="text"
          placeholder="possibly the stripe charge id, leave blank to generate a new one"/>
        <Field name="user"
          label="User"
          component={UserSelect}
          type="text"
          placeholder="The user this transaction is for"/>
        <Field name="product"
          label="Product"
          component={ProductSelect}
          type="text"
          placeholder="The product this transaction is for"/>
        <Field name="amount"
          label="Amount"
          component={FormTextField}
          type="number"
          placeholder="Amount in cents"/>
        <Field name="status"
          label="Status"
          id="status-select"
          labelWidth={32}
          component={FormSelect}
          items={['succeeded', 'pending', 'failed', 'refunded']}/>
        <Field name="gateway"
          label="Gateway"
          id="gateway-select"
          labelWidth={32}
          component={FormSelect}
          items={['manual', 'stripe']}/>
        <Field name="subscription"
          label="Subscription"
          component={SubscriptionSelect}
          type="text"
          placeholder="optional subscription to associate"/>
        <Field name="created_at"
          label="Created"
          component={FormDatePicker}
          disableFuture={true}
          type="text"/>
        <Field name="expires_at"
          label="Expires"
          component={FormDatePicker}
          minDate={this.props.created_at}
          type="text"/>
        {!editing ?
          (
            <AlertDialog
              buttonProps={{
                style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
              }}
              disabled={invalid || pristine}
              buttonText="Create"
              buttonColor="primary"
              loading={this.props.postingTransaction}
              loadingMessage={"Creating Transaction..."}
              successMessage={this.props.postTransactionSuccessMessage}
              errorMessage={this.props.postTransactionErrorMessage}
              open={this.state.createOpen}
              title="Create New Transaction?"
              text="Are you sure you would like to create this new transaction?"
              leftAction={this.closeCreate}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleSubmit}
              rightActionText="Create"
              rightActionColor="primary"
              onClick={this.openCreate}
              onClose={this.closeCreate}
              />
          ):(
            <AlertDialog
              buttonProps={{
                style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
              }}
              disabled={invalid || pristine}
              buttonText="Save"
              buttonColor="primary"
              loading={this.props.puttingTransaction}
              loadingMessage={"Saving Transaction..."}
              successMessage={this.props.putTransactionSuccessMessage}
              errorMessage={this.props.putTransactionErrorMessage}
              open={this.state.editOpen}
              title="Save Transaction?"
              text="Are you sure you would like to save the changes for this transaction?"
              leftAction={this.closeEdit}
              leftActionText="Cancel"
              leftActionColor="default"
              rightAction={this.handleSubmit}
              rightActionText="Save"
              rightActionColor="primary"
              onClick={this.openEdit}
              onClose={this.closeEdit}
              />
          )
        }
        {editing &&
          <AlertDialog
            buttonProps={{
              style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
            }}
            buttonText="Delete"
            buttonColor="secondary"
            loading={this.props.deletingTransaction}
            loadingMessage={"Deleting Transaction..."}
            successMessage={this.props.deleteTransactionSuccessMessage}
            errorMessage={this.props.deleteTransactionErrorMessage}
            open={this.state.deleteOpen}
            title={`Delete ${this.props.transaction.name}?`}
            text="Are you sure you would like to delete this transaction? This will result in this transaction being end-dated. It will not actually be deleted permenantly but it will be masked and all associated records will also be end-dated. This action cannot be undone."
            leftAction={this.closeDelete}
            leftActionText="Nevermind"
            leftActionColor="default"
            rightAction={this.handleDelete}
            rightActionText="Delete"
            rightActionColor="secondary"
            onClick={this.openDelete}
            onClose={this.closeDelete}
            />
        }
        {editing &&
          <AlertDialog
            buttonProps={{
              style: {width: '100px', margin: "0 0 0 10px", height: '56px', float: "right"},
            }}
            buttonText={this.props.transaction.status == 'refunded' ? "Refunded" : "Refund"}
            buttonColor="default"
            disabled={this.props.transaction.status == 'refunded' ? true : false}
            loading={this.props.puttingTransaction}
            loadingMessage={"Refunding Transaction..."}
            successMessage={this.props.putTransactionSuccessMessage}
            errorMessage={this.props.putTransactionErrorMessage}
            open={this.state.refundOpen}
            title={`Refund ${this.props.transaction.name}?`}
            text="Are you sure you would like to refund this transaction? The user will be notified by email of the refund."
            leftAction={this.closeRefund}
            leftActionText="Nevermind"
            leftActionColor="default"
            rightAction={this.handleRefund}
            rightActionText="Refund"
            rightActionColor="secondary"
            onClick={this.openRefund}
            onClose={this.closeRefund}
            />
        }
      </form>
    )
  }
}

function mapStateToProps(state, props) {

  let initialValues = {}
  if(props.transaction){
    initialValues = {
      ...props.transaction,
      user: {value: props.transaction.user._id, label: props.transaction.user.username},
      product: {value: props.transaction.product._id, label: props.transaction.product.name}
    }
  }
  return {
    initialValues: initialValues,
    trans_num: selector(state, 'trans_num'),
    user: selector(state, 'user'),
    product: selector(state, 'product'),
    amount: selector(state, 'amount'),
    status: selector(state, 'status'),
    gateway: selector(state, 'gateway'),
    subscription: selector(state, 'subscription'),
    created_at: selector(state, 'created_at'),
    expires_at: selector(state, 'expires_at'),

    postingTransaction: state.transactions.postingTransaction,
    postTransactionSuccessMessage: state.transactions.postTransactionSuccessMessage,
    postTransactionErrorMessage: state.transactions.postTransactionErrorMessage,

    puttingTransaction: state.transactions.puttingTransaction,
    putTransactionSuccessMessage: state.transactions.putTransactionSuccessMessage,
    putTransactionErrorMessage: state.transactions.putTransactionErrorMessage,

    deletingTransaction: state.transactions.deletingTransaction,
    deleteTransactionSuccessMessage: state.transactions.deleteTransactionSuccessMessage,
    deleteTransactionErrorMessage: state.transactions.deleteTransactionErrorMessage
  }
}

TransactionReduxForm = reduxForm({
  form: 'transaction',
  validate,
  enableReinitialize: true
})(withRouter(TransactionReduxForm))

export default connect(
  mapStateToProps,
  {
    postTransaction,
    clearPostTransaction,
    putTransaction,
    clearPutTransaction,
    deleteTransaction,
    clearDeleteTransaction
  }
)(TransactionReduxForm)
