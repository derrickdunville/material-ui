import React, { Component } from 'react'
import { DatePicker } from 'material-ui-pickers'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import datePickerTheme from 'assets/jss/components/datePickerStyle.jsx';
import CustomFormControl from "components/FormFields/FormControl.jsx"
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import FormHelperText from '@material-ui/core/FormHelperText';

const FormDatePicker = ({
  input,
  label,
  meta: {touched, error, invalid},
  ...custom
}) => {
  console.dir(custom)
  let shrink = false
  if(input.value != ""){
    shrink = true
  }
  return (
    <MuiThemeProvider theme={datePickerTheme}>
        <DatePicker
          margin="normal"
          label={label}
          error={touched && invalid}
          helperText={touched && error}
          style={{width: "100%"}}
          format="MM/dd/yyyy"
          variant="outlined"
          InputProps={{
            onFocus: input.onFocus,
            onBlur: input.onBlur
          }}
          InputLabelProps={{
            shrink: shrink
          }}
          onChange={val => input.onChange(val)}
          onFocus={e => input.onFocus()}
          onBlur={e => input.onBlur()}
          onOpen={e => input.onFocus()}
          onClose={e => input.onBlur()}
          value={input.value == "" ? null : input.value}
          clearable
          {...custom}
          />
    </MuiThemeProvider>
  )
}
export default FormDatePicker
