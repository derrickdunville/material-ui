import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import snackbarContentStyle from "assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx";

class CustomSnackbar extends React.Component {
  constructor(props){
    super(props)
  }
  handleClose = (event, reason) => {
    this.props.onClose()
  }
  render(){
    const { classes, message, color, close, icon, place, open } = this.props;
    var action = [];
    const messageClasses = classNames({
      [classes.iconMessage]: icon !== undefined
    });
    if (close !== undefined) {
      action = [
        <IconButton
          className={classes.iconButton}
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={() => this.handleClose()}
        >
          <Close className={classes.close} />
        </IconButton>
      ];
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: place.indexOf("t") === -1 ? "bottom" : "top",
          horizontal:
            place.indexOf("l") !== -1
              ? "left"
              : place.indexOf("c") !== -1 ? "center" : "right"
        }}
        open={open}
        onClose={this.handleClose}
        autoHideDuration={6000}
        message={
          <div>
            {icon !== undefined ? <this.props.icon className={classes.icon} /> : null}
            <span className={messageClasses}>{message}</span>
          </div>
        }
        action={action}
        ContentProps={{
          classes: {
            root: classes.root + " " + classes[color],
            message: classes.message
          }
        }}
      />
    )
  }
}

CustomSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.func,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool
};

export default withStyles(snackbarContentStyle)(CustomSnackbar);
