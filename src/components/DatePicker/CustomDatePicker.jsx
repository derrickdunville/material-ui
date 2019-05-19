import React, { Component } from 'react'
import { MuiThemeProvider } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';

import datePickerTheme from 'assets/jss/components/datePickerStyle.jsx';

class CustomDatePicker extends Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <MuiThemeProvider theme={datePickerTheme}>
        <DatePicker
          {...this.props}
        />
      </MuiThemeProvider>
    )
  }
}

export default CustomDatePicker
