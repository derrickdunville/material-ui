import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton';

import FormControl from '@material-ui/core/FormControl';
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText';

import { connect } from 'react-redux'

import {
  getFormValues,
  getFormInitialValues,
  getFormSyncErrors,
  getFormMeta,
  getFormAsyncErrors,
  getFormSyncWarnings,
  getFormSubmitErrors,
  getFormError,
  getFormNames,
  isDirty,
  isPristine,
  isValid,
  isInvalid,
  isSubmitting,
  hasSubmitSucceeded,
  hasSubmitFailed
} from 'redux-form'

class FileInput extends Component {
  constructor(props){
    super(props);
    this.state = {
        file: '',
        image_url: '',
        touched: this.props.meta.touched,
        invalid: this.props.meta.invalid,
        error: this.props.meta.error
    }
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleFileSelect = this.handleFileSelect.bind(this)
    this.handleCancel = this.handleCancel.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  buildFileSelector(){
    // console.dir(this.props.extensions)
    const fileSelector = document.createElement('input')
    fileSelector.setAttribute('type', 'file')
    fileSelector.setAttribute('accept', this.props.extensions)
    fileSelector.addEventListener('change', this.handleFileChange)
    return fileSelector
  }
  componentDidMount(){
    this.fileSelector = this.buildFileSelector()
    // console.dir(this.fileSelector)
  }

  handleFileSelect(event){
    event.preventDefault()
    this.fileSelector.click()
  }
  handleFileChange(event){
    console.log("handleFileChange")
    const imageTypes = ["image/jpg", "image/jpeg", "image/png"]
    // console.log(event.target.files[0].type)
    if(imageTypes.includes(event.target.files[0].type)){
      this.setState({
        file: event.target.files[0].name,
        image_url: URL.createObjectURL(event.target.files[0])
      })
    } else {
      this.setState({
        file: event.target.files[0].name,
      })
    }
    this.props.input.onChange(event.target.files[0])
  }
  handleCancel(event){
    // console.dir(this.props)
    this.fileSelector = this.buildFileSelector()
    this.setState({
      file: '',
      image_url: ''
    })
    this.props.input.onChange(null)
  }
  handleKeyPress(event){
    if(this.state.file == ''){
      this.fileSelector.click()
    } else {
      this.setState({
        file: '',
        image_url: ''
      })
      this.props.input.onChange('')
    }
  }
  render(){

    console.log("Render FormFileInput")
    return (
      <div>
        <FormControl
          variant="outlined"
          margin="normal"
          style={{width: "100%", backgroundColor: "#202225", borderRadius: "4px"}}
          {...this.props.formControlProps}>
          <InputLabel disabled={this.props.disabled} style={{color: "white"}}>
            {this.props.label}
          </InputLabel>
          <CustomOutlinedInput
            disabled={this.props.disabled}
            style={{color: "white", outline: "none"}}
            type="text"
            inputProps={{
              style: {
                display: "block",
                outline: "0 !important",
                cursor: "pointer",
                color: "transparent",
                textShadow: "0 0 0 #FFF"
              },
              onClick: this.handleFileSelect,
              onKeyPress: this.handleKeyPress,
              className: "noselect",
              disabled: this.props.disabled
            }}
            labelWidth={this.props.labelWidth}
            error={this.state.touched && this.state.invalid}
            value={this.state.file}
            endAdornment={
              <InputAdornment>
                {this.state.file == '' ? (
                  <div>
                  {this.props.disabled ? (
                    <Add style={{cursor: "pointer"}}/>
                  ):(
                    <Add style={{cursor: "pointer"}} onClick={this.handleFileSelect}/>
                  )}
                </div>
                ):(
                  <div>
                  {this.props.disabled ? (
                    <Close style={{cursor: "pointer"}}/>
                  ):(
                    <Close style={{cursor: "pointer"}} onClick={this.handleCancel}/>
                  )}
                  </div>
                )}
              </InputAdornment>
            }/>
          {(this.state.touched && this.state.invalid) &&
              <FormHelperText error={true}>{this.state.error}</FormHelperText>
            }
        </FormControl>
        {this.state.image_url != '' && (
          <div>
            <img style={{width: "200px", height: "200px"}} src={this.state.image_url}/>
          </div>
        )}
      </div>
    )
  }
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.number.isRequired,
  extensions: PropTypes.string.isRequired,
};


export default connect(
  mapStateToProps,
  {}
)(FileInput)
