import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PaymentMethod from 'components/Stripe/PaymentMethod.jsx'
import {injectStripe} from 'react-stripe-elements';
import CircularProgress from '@material-ui/core/CircularProgress';

class SubscribeDialog extends React.Component {
  constructor(props){
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit(token) {
    console.log("SubscribeDialog handleSubmit")
    ev.preventDefault();
  }
  render() {
    const { loading, loadingMessage, successMessage, errorMessage, name, style, open, onClick, onClose, buttonColor, buttonText, title, text} = this.props
    return (
      <div name={name} style={{...style}}>
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
        {loading ? (
          <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}>
            <div>
              <CircularProgress />
            </div>
            <div>
              <DialogTitle id="alert-dialog-title">{loadingMessage}</DialogTitle>
            </div>
          </div>
        ):(
          <div>
            {(!successMessage && !errorMessage) ? (
              <div>
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent style={{paddingBottom: "8px"}}>
                  <DialogContentText id="alert-dialog-description">
                    {text}
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    <div style={{paddingTop: "10px", fontSize: "36px", fontWeight: "1", width: "100%", textAlign:"center"}}>
                      ${(this.props.product.amount/100).toFixed(2)}
                    </div>
                  </DialogContentText>
                </DialogContent>
                <div style={{paddingBottom: "8px", paddingRight: "8px",paddingLeft:"24px"}}>
                  <div style={{color: "black"}}>
                    Pay with
                  </div>
                  <PaymentMethod action={"subscription"} product={this.props.product} onClose={this.props.onClose}/>
                </div>
              </div>
            ):(
              <div>
                {successMessage && (
                  <div>
                    <DialogTitle id="alert-dialog-title">Success!</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {successMessage}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={onClose} color="primary">
                        OK
                      </Button>
                    </DialogActions>
                  </div>
                )}
                {errorMessage && (
                  <div>
                    <DialogTitle id="alert-dialog-title">Error!</DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        {errorMessage}
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={onClose} color="primary">
                        OK
                      </Button>
                    </DialogActions>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
        </Dialog>
      </div>
    );
  }
}

export default SubscribeDialog;
