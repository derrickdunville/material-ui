import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import {
  putTransaction,
  clearUpdateTransaction
} from 'actions/transactionActions'

class RefundDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refundAmount: ""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleRefund = this.handleRefund.bind(this)
    this.handleRefundAndCancel = this.handleRefundAndCancel.bind(this)
  }
  handleClose = (ev) => {
    this.props.onClose(ev)
  }
  handleChange(event) {
    if(/^\d*$/.test(event.target.value)){
      if(parseInt(event.target.value) > this.props.amount){
        this.setState({refundAmount: this.props.amount})
      } else {
        this.setState({refundAmount: event.target.value})
      }
    }
  }
  handleRefund(){
    console.log("handle refund")
    this.props.putTransaction(
      {
        _id: this.props.transaction._id,
        status: "refunded"
      })
  }
  handleRefundAndCancel(){
    console.log("handle refund and expire")
    this.props.putTransaction(
      {
        _id: this.props.transaction._id,
        status: "refunded",
        cancel: true
      })
  }

  renderSuccess(){
    const { successMessage } = this.props
    return (
      <div>
        <DialogTitle id="alert-dialog-title">Success</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {successMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </div>
    )
  }
  renderError(){
    const { errorMessage } = this.props
    return (
      <div>
        <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </div>
    )
  }
  renderLoading(){
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div>
          <CircularProgress />
        </div>
        <div>
          <DialogTitle id="alert-dialog-title">Refunding...</DialogTitle>
        </div>
      </div>
    )
  }
  // <TextField
  //   autoFocus
  //   id="refund_amount"
  //   label="Refund Amount"
  //   type="text"
  //   placeholder={this.props.transaction.amount.toString()}
  //   fullWidth
  //   onChange={this.handleChange}
  //   value={this.state.refundAmount}
  //   />
  renderDialog(){
    return (
      <div>
        <DialogTitle id="alert-dialog-title">Refund</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to refund this transaction? The user will be sent an email about the refund.
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            Enter in the amount to be refunded. Leaving it blank will result in a full-refund.
            {this.props.transaction.subscription && "This transaction has an associated subscription. Refund & Cancel will also stop the subscription."}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleRefund} color="secondary" autoFocus>
            Refund
          </Button>
          {this.props.transaction.subscription && (
            <Button onClick={this.handleRefundAndCancel} color="secondary">
              Refund & Cancel
            </Button>
          )}
        </DialogActions>
      </div>
    )
  }
  render() {
    const { loading, successMessage, errorMessage, style, open } = this.props
    return (
      <div style={{...style}}>
        <Dialog open={open} onClose={this.handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
        {loading ? (this.renderLoading()):(
          <div>
            {(!successMessage && !errorMessage) ? (this.renderDialog()):(
              <div>
              {successMessage && this.renderSuccess()}
              {errorMessage && this.renderError()}
              </div>
            )}
          </div>
        )}
        </Dialog>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    errorMessage: state.transactions.putTransactionErrorMessage,
    successMessage: state.transactions.putTransactionSuccessMessage,
    loading: state.transactions.puttingTransaction
  }
}
RefundDialog.propTypes = {
  transaction: PropTypes.object.required,
  onClose: PropTypes.func.required,
  open: PropTypes.bool.required
};

export default connect(mapStateToProps, { putTransaction, clearUpdateTransaction })(RefundDialog)
