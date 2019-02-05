import React, { Component } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';

const datePickerTheme = createMuiTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: "#565656",
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        color: 'white',
      },
      transitionContainer: {
        color: 'white'
      },
      iconButton: {
        backgroundColor: "#454545 !important",
        color: "white",
        "&>*":{
          color: 'white !important',
          backgroundColor: "#454545 !important"
        }
      },
      dayLabel: {
        color: 'white'
      }
    },
    MuiPickersSlideTransition: {
      transitionContainer: {
        "&>*":{
          color: 'white ',
        }
      }
    },
    MuiPickersDay: {
      day: {
        color: "white",
        "&$selected": {
          "backgroundColor": "#676767",
          "&:hover": {
            "backgroundColor": "#676767"
          }
        }
      },
      current: {
        color: "#0fed8a",
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: "white",
      },
      dialogRoot: {
        backgroundColor: "#454545"
      }
    },
    MuiFormControl: {
      root: {
        borderRadius: "4px",
        marginBottom: "14px",
        width: "100%",
      }
    },
    MuiOutlinedInput: {
      root:{
        '&$focused $notchedOutline': {
          borderWidth: "1px",
          borderColor: "#07C16E",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
        },
        '&:focus-within $notchedOutline': {
          borderWidth: "1px",
          borderColor: "#07C16E !important",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
        },
        borderRadius: "4px",
      },
      input: {
        color: "white"
      }
    },
    MuiInputBase: {
      root: {
        backgroundColor: "#202225",
        '&:focus-within $notchedOutline': {
          borderWidth: "1px",
          borderColor: "#07C16E",
          boxShadow: "inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102,175,233,.6)"
        },
        '&disabled' : {
          color: "#a1a1a1 !important"
        }
      }
    },
    MuiFormLabel: {
      root: {
        color: "white !important",
        '&disabled' : {
          color: "#a1a1a1 !important"
        }
      }
    },
    MuiIconButton: {
      root: {
        color: "white"
      }
    },
    MuiInputLabel: {
      shrink: {
        color: "white !important"
      }
    }
  },
});

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
