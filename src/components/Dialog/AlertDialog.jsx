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
    const {
      hidden,
      disabled,
      successMessage,
      errorMessage,
      loading,
      loadingMessage,
      name,
      style,
      open,
      onClick,
      onClose,
      buttonColor,
      buttonText,
      title,
      text,
      leftAction,
      leftActionText,
      leftActionColor,
      rightAction,
      rightActionText,
      rightActionColor,
      buttonProps,
    } = this.props
    let buttonStyle= { width: "100%"}
    if(hidden) buttonStyle.display = "none"
    console.dir(buttonProps)
    return (
      <div>
        <Button name={name} disabled={disabled} variant="outlined" color={buttonColor || "primary"} onClick={onClick} {...buttonProps}>
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
            {(!successMessage && !errorMessage) ? (
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
              {successMessage && (
                <div>
                  <DialogTitle id="alert-dialog-title">Success</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {successMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={leftAction} color={leftActionColor || "primary"}>
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
                    <Button onClick={leftAction} color={leftActionColor || "primary"}>
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

export default AlertDialog;
