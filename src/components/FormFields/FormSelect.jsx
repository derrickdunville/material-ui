import React, { Component } from 'react'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'

import withStyles from "@material-ui/core/styles/withStyles"
import selectStyle from "assets/jss/components/selectStyle.jsx"
import CustomMenuItem from "components/MenuItem/CustomMenuItem.jsx"
import CustomFormControl from "components/FormFields/FormControl.jsx"
import CustomOutlinedInput from 'components/OutlinedInput/CustomOutlinedInput.jsx'
import FormHelperText from '@material-ui/core/FormHelperText';

const FormSelect = ({
  id,
  name,
  input,
  label,
  meta: { touched, error, invalid },
  items,
  classes,
  labelWidth,
  ...custom
}) => (
  <CustomFormControl variant="outlined" margin="normal">
    <InputLabel
      htmlFor={id}
      shrink={input.value ? true : false}
      style={{color: "white"}}>
      {label}
    </InputLabel>
    <Select
      classes={{
        root: classes.root,
        icon: classes.icon,
        disabled: classes.disabled
      }}
      MenuProps={{
        classes: {
          paper: classes.listRoot
        },
        MenuListProps: {
          classes: {
            root: classes.listRoot
          }
        }
      }}
      style={{width: '100%'}}
      input={
        <CustomOutlinedInput
          error={touched && invalid}
          labelWidth={labelWidth}
          name={name}
          id={id}
          {...input} />
        }
      {...custom}
      >
      {items !== undefined && (
        items.map((item) => (
          <CustomMenuItem
            key={item}
            style={{color: "white"}}
            id={item}
            value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </CustomMenuItem>
        ))
      )}
    </Select>
    {(touched && error) &&
      <FormHelperText
        error={true}
        id="component-helper-text">
        {error}
      </FormHelperText>
    }
  </CustomFormControl>
)

export default withStyles(selectStyle)(FormSelect)
