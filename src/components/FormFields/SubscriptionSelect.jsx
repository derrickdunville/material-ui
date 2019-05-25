import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Select from 'react-select'
import { autocompleteSubscription, clearAutocomleteSubscription } from 'actions/autocompleteActions'
import autoCompleteStyle from "assets/jss/material-dashboard-react/components/autoCompleteStyle.jsx"

import TextField from '@material-ui/core/TextField'
import FormControl from 'components/FormFields/FormControl.jsx'
import FormHelperText from '@material-ui/core/FormHelperText';

import withStyles from "@material-ui/core/styles/withStyles";
import customTextFieldStyle from "assets/jss/material-dashboard-react/components/customTextFieldStyle.jsx";

const textFieldStyle = {
  cssFocused: {},
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderStyle: "solid",
      borderWidth: "1px 0 1px 1px",
      borderColor: "#07C16E",
    },
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderTopRightRadius: "0px !important",
    borderBottomRightRadius: "0px !important",
    WebkitAutofill: {
      backgroundColor: "#565656"
    }
  },
  notchedOutline: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: "1px 0 1px 1px",
    borderTopLeftRadius: "4px",
    borderBottomLeftRadius: "4px",
    borderTopRightRadius: "0px",
    borderBottomRightRadius: "0px",
  },
  disabled: {
    color: "#a1a1a1",
    "&:before": {
      backgroundColor: "transparent !important"
    }
  },
  input: {
    color: "white"
  },
  shrink: {
    zIndex: "2",
    backgroundColor: "transparent !important"
  },
  cssLabel: {
    '&$cssFocused': {
      color: "#07C16E",
    },
    color: '#ffffff !important',
    zIndex: "1"
  }
}
let StyledTextField = ({classes, InputLabelProps, ...rest}) => (
  <TextField
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
      className: classes.input,
      ...InputLabelProps
    }}
    {...rest}
    />
)
StyledTextField = withStyles(textFieldStyle)(StyledTextField)

let FormTextField = ({selectProps, value, onFocus, onBlur , onChange, type}) => {
  let isShrunk = false
  // console.dir(selectProps)
  if(selectProps.value || selectProps.isFocused || value){
    isShrunk = true
  }
  return (
    <StyledTextField
      fullWidth
      onFocus={e => {
        onFocus()
        selectProps.onFocus()
      }}
      onBlur={e => {
        onBlur()
        selectProps.onMenuClose()
        selectProps.onBlur()
      }}
      InputLabelProps={{
        shrink: isShrunk
      }}
      label={selectProps.label}
      variant="outlined"
      type={type}
      value={value}
      onChange={onChange}
      error={selectProps.meta.touched && selectProps.meta.invalid}
      placeholder={!selectProps.value ? selectProps.inputPlaceholder : ""}
    />
  )
}

class SubscriptionSelect extends Component {
  constructor(props){
    super(props);
    this.state = {
        searchInput: '',
        selectedValue: this.props.value,
        isFocused: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }
  componentDidMount(){
    this.props.clearAutocomleteSubscription()
  }
  handleInputChange(newInput){
    this.setState({searchInput: newInput}, () => {
      if(this.state.searchInput !== ''){
        this.props.autocompleteSubscription(this.state.searchInput)
      } else {
        this.props.clearAutocomleteSubscription()
      }
    })
  }
  handleFocus = () => {this.setState({isFocused: true})}
  handleBlur = () => {this.setState({isFocused: false})}
  handleChange(newValue){
    this.setState({ selectedValue: newValue }, () => {
      this.props.input.onChange(newValue)
    })
  }
  render(){
    const { rest } = this.props
    let options = []
    // console.dir(this.props)
    this.props.subscriptions.map(subscription => {
      options.push({value: subscription._id, label: subscription.subscription_id})
    })
    return (
      <FormControl margin="normal">
        <Select
          instanceId={1}
          label="Subscription"
          value={this.props.input.value}
          onFocus={e => {
            this.handleFocus()
            this.props.input.onFocus()
          }}
          onBlur={e => {
            this.handleBlur()
            this.props.input.onBlur()
          }}
          className="select"
          classNamePrefix="select"
          options={options}
          components={{
            Input: FormTextField
          }}
          styles={autoCompleteStyle}
          isFocused={this.state.isFocused}
          isError={this.props.meta.touched && this.props.meta.invalid}
          isDisabled={this.props.disabled}
          isSearchable={true}
          isClearable={true}
          onChange={this.handleChange}
          onInputChange={this.handleInputChange}
          placeholder=""
          input={this.props.input}
          meta={this.props.meta}
          inputPlaceholder={this.props.placeholder}/>
        {(this.props.meta.touched && this.props.meta.error) &&
          <FormHelperText
            style={{margin: "8px 12px 0"}}
            error={true}
            id="component-helper-text">
            {this.props.meta.error}
          </FormHelperText>
        }
      </FormControl>
    )
  }
}

function mapStateToProps(state) {
  return {
    subscriptions: state.autocomplete.subscriptions
  }
}

export default connect(
  mapStateToProps,
  {
    autocompleteSubscription,
    clearAutocomleteSubscription
  })(SubscriptionSelect)
