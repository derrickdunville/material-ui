import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from
"@material-ui/core/TextField"
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customTextFieldStyle from "assets/jss/material-dashboard-react/components/customTextFieldStyle.jsx";

function CustomTextField({ ...props }) {
  const {
    classes,
    formControlProps,
    labelText,
    inputType,
    inputRef,
    id,
    labelProps,
    inputProps,
    error,
    helperText,
    success,
    textFieldProps,
    ...custom
  } = props;

  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className + " " + classes.formControl}
    >
      <TextField
        InputProps={{
          classes: {
            root: classes.cssOutlinedInput,
            notchedOutline: classes.notchedOutline,
            focused: classes.cssFocused,
            disabled: classes.disabled
          },
          className: classes.input,
          ...inputProps,
        }}
        inputRef={inputRef}
        InputLabelProps={{
          classes: {
            root: classes.cssLabel,
            shrink: classes.shrink
          },
          className: classes.input
        }}
        id={id}
        label={labelText}
        type={inputType}
        autoComplete="current-password"
        variant="outlined"
        {...textFieldProps}
      />
    </FormControl>
  );
}

CustomTextField.propTypes = {
  classes: PropTypes.object.isRequired,
  labelText: PropTypes.node.isRequired,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  inputType: PropTypes.string.isRequired,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};

export default withStyles(customTextFieldStyle)(CustomTextField);
