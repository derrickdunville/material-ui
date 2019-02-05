import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaymentMethod from 'components/Stripe/PaymentMethod.jsx'
import {injectStripe} from 'react-stripe-elements';

class SubscribeDialog extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(token) {
    console.log("SubscribeDialog handleSubmit")
    ev.preventDefault();
    console.log('Received Stripe token in SubscribeDialog:', token);
  }
  render() {
    const { name, style, open, onClick, onClose, buttonColor, buttonText, title, text, leftAction, leftActionText, leftActionColor, rightAction, rightActionText, rightActionColor} = this.props
    return (
      <div name={name} style={{...style}}>
        <Button name={name} style={{width: "100%"}} variant="outlined" color={buttonColor || "primary"} onClick={onClick}>
          {buttonText}
        </Button>
        <Dialog
          PaperProps={{
            style: {
              minWidth: "280px"
            }
          }}
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
          <DialogContent style={{paddingBottom: "8px"}}>
            <DialogContentText id="alert-dialog-description">
              {text}
            </DialogContentText>
          </DialogContent>
          <div style={{marginTop: "20px"}}>
            <PaymentMethod product={this.props.product} onClose={this.props.onClose}/>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SubscribeDialog;
