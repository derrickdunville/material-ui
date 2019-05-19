import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import CustomFormControl from "components/FormFields/FormControl.jsx"

import withStyles from "@material-ui/core/styles/withStyles";
import customTextFieldStyle from "assets/jss/material-dashboard-react/components/customTextFieldStyle.jsx";

const FormTextField = ({
  label,
  type,
  input,
  meta: { touched, invalid, error },
  classes,
  ...custom
}) => (
    <TextField
      style={{width: "100%"}}
      InputProps={{
        classes: {
          root: classes.cssOutlinedInput,
          notchedOutline: classes.notchedOutline,
          focused: classes.cssFocused,
          disabled: classes.disabled
        },
        className: classes.input
      }}
      InputLabelProps={{
        classes: {
          root: classes.cssLabel,
          shrink: classes.shrink
        },
        className: classes.input
      }}
      label={label}
      margin="normal"
      variant="outlined"
      {...input}
      helperText={touched ? error : ""}
      error={invalid && touched}
      type={type}
      {...custom}
    />
)

export default withStyles(customTextFieldStyle)(FormTextField)
