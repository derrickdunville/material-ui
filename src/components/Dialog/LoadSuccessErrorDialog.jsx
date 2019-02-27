import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadSuccessErrorDialog extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    const {open, handleClose, loading, loadingMessage, successMessage, errorMessage} = this.props
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
        {loading || (!successMessage && !errorMessage) ? (
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
              {successMessage && (
                <div>
                  <DialogTitle id="alert-dialog-title">Success</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {successMessage}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color={"primary"}>
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
                    <Button onClick={handleClose} color={"primary"}>
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

export default LoadSuccessErrorDialog;
