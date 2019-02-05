import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

class AlertDialog extends React.Component {
  handleClose = (ev) => {
    this.props.onClose(ev)
  }
  render() {
    const { hidden, message, loading, loadingMessage, name, style, open, onClick, onClose, buttonColor, buttonText, title, text, leftAction, leftActionText, leftActionColor, rightAction, rightActionText, rightActionColor} = this.props
    let buttonStyle= { width: "100%"}
    if(hidden) buttonStyle.display = "none"
    return (
      <div style={{...style}}>
        <Button name={name} style={buttonStyle} variant="outlined" color={buttonColor || "primary"} onClick={onClick}>
          {buttonText}
        </Button>
        <Dialog
          open={open}
          onClose={this.handleClose}
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
            {!message ? (
              <div>
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {text}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={leftAction} color={leftActionColor || "primary"}>
                    {leftActionText}
                  </Button>
                  <Button onClick={rightAction} color={rightActionColor || "primary"} autoFocus>
                    {rightActionText}
                  </Button>
                </DialogActions>
              </div>
            ):(
              <div>
                <DialogTitle id="alert-dialog-title">Success</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    {message}
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={leftAction} color={leftActionColor || "primary"}>
                    OK
                  </Button>
                </DialogActions>
              </div>
            )}
          </div>

        )}

        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
