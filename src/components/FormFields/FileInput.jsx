// import React from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
//
// const styles = theme => ({
//   button: {
//     margin: theme.spacing.unit,
//   },
//   input: {
//     display: 'none',
//   },
// });
//
// const FileInput = ({
//   label,
//   type,
//   input,
//   meta: { touched, invalid, error },
//   classes,
//   ...custom
// }) => (
//   <div>
//     <input
//       accept="image/*"
//       className={classes.input}
//       id="contained-button-file"
//       multiple
//       type="file"
//       />
//       <label htmlFor="contained-button-file">
//         <Button variant="contained" component="span" className={classes.button}>
//           Upload
//         </Button>
//       </label>
//     </div>
// )
//
// export default withStyles(styles)(FileInput)
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
import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';
import FormHelperText from '@material-ui/core/FormHelperText';
import path from 'path'
/**
 * Checks to see if a given string ends with an image file extension (.gif, .jpg, .jpeg, .png)
 * @param {string} filename String representing a filename with extension
 * @returns {boolean}
 */
function isImage (filename) {
  if((/\.(gif|jpg|jpeg|png)$/i).test(filename)){
    return true
  }
  return false
}

function getInputValue(value){
  if(value && value.name){
    return value.name
  } else if(value && value.key){
    return value.key
  } else {
    return ""
  }
}

function onChange(event, input, initial){

  if(event){
    input.onChange({file: event.target.files[0], name: event.target.files[0].name})
  } else {
    // clearing
    if(initial){
      input.onChange(initial)
    } else {
      input.onChange("")
    }
  }
  input.onBlur()
}

const FileInput = (props) => {
  let inputRef = React.createRef()
  // console.dir(props)
  const {
    label,
    type,
    input,
    labelWidth,
    meta: { touched, invalid, error, initial },
    classes,
    accept,
    ...custom
  } = props
  return(
    <div>
      <input
        accept={accept}
        id="contained-button-file"
        type="file"
        style={{display: 'none'}}
        ref={inputRef}
        onChange={e => onChange(e, input, initial)}
        />
      <FormControl
        variant="outlined"
        margin="normal"
        fullWidth
        >
        <InputLabel style={{color: "white"}}
          shrink={(input.value) ? true : false}>
          {label}
        </InputLabel>
        <CustomOutlinedInput
          style={{color: "white", outline: "none", backgroundColor: "#202225",}}
          type="text"
          inputProps={{
            style: {
              display: "block",
              outline: "0 !important",
              cursor: "pointer",
              color: "transparent",
              textShadow: "0 0 0 #FFF"
            },
            className: "noselect",
          }}
          onBlur={e => input.onBlur()}
          error={touched && invalid}
          labelWidth={input.value ? labelWidth : 0}
          value={getInputValue(input.value)}
          onClick={e => {
            e.stopPropagation();
            inputRef.current.click()
          }}
          onKeyPress={e => {
            if(input.value){
              inputRef.current.value = null
              onChange(null, input, initial)
            } else {
              e.stopPropagation();
              inputRef.current.click()
            }
          }}
          endAdornment={
            <InputAdornment>
              {(input.value && input.value.name) && (
                <Close style={{cursor: "pointer"}} onClick={e => {
                    e.stopPropagation();
                    inputRef.current.value = null
                    onChange(null, input, initial)
                    console.dir(inputRef.current)
                  }}/>
              )}
              {(input.value && initial && !input.value.name) && (
                <Edit style={{cursor: "pointer"}} onClick={e => {
                    console.dir(inputRef.current)
                    e.stopPropagation();
                    inputRef.current.click()
                  }}/>
              )}
              {(!input.value) && (
                <Add style={{cursor: "pointer"}} onClick={e => {
                    console.dir(inputRef.current)
                    e.stopPropagation();
                    inputRef.current.click()
                  }}/>
              )}
            </InputAdornment>
          }/>
        {(touched && invalid) &&
            <FormHelperText error={true}>{error}</FormHelperText>
          }
      </FormControl>
      {((input.value && input.value.name) && isImage(input.value.name)) && (
        <div>
          <img style={{width: "200px", height: "200px"}} src={URL.createObjectURL(input.value.file)}/>
        </div>
      )}
      {(input.value && input.value.bucket && isImage(input.value.key)) && (
        <div>
          <img style={{width: "200px", height: "200px"}} src={`https://s3.amazonaws.com/${input.value.bucket}/${input.value.key}`}/>
        </div>
      )}
    </div>
  )
}

FileInput.propTypes = {
  label: PropTypes.string.isRequired,
  labelWidth: PropTypes.number.isRequired,
  accept: PropTypes.string.isRequired,
};

export default FileInput
