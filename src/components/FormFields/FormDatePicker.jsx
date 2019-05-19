import React, { Component } from 'react'
import { DatePicker } from 'material-ui-pickers'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import datePickerTheme from 'assets/jss/components/datePickerStyle.jsx';
import CustomFormControl from "components/FormFields/FormControl.jsx"

const FormDatePicker = ({
  input,
  label,
  meta: {touched, error, invalid},
  ...custom
}) => (
    <MuiThemeProvider theme={datePickerTheme}>
      <DatePicker
        margin="normal"
        label={label}
        style={{width: "100%"}}
        format="MM/dd/yyyy"
        variant="outlined"
        mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
        error={touched}
        helperText={error}
        onChange={val => input.onChange(val)}
        value={input.value}
        clearable
        keyboard
        {...custom}
        />
    </MuiThemeProvider>
)

export default FormDatePicker
