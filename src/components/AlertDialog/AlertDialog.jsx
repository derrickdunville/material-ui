import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AlertDialog extends React.Component {
  render() {
    const { style, open, onClick, onClose, buttonColor, buttonText, title, text, leftAction, leftActionText, leftActionColor, rightAction, rightActionText, rightActionColor} = this.props
    return (
      <div style={{...style}}>
        <Button style={{width: "100%"}} variant="outlined" color={buttonColor || "primary"} onClick={onClick}>
          {buttonText}
        </Button>
        <Dialog
          open={open}
          onClose={onClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
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
        </Dialog>
      </div>
    );
  }
}

export default AlertDialog;
