import React from "react";
import FormControlLabel from "components/FormFields/FormControlLabel.jsx"
import Checkbox from "@material-ui/core/Checkbox"
import withStyles from "@material-ui/core/styles/withStyles"

const formCheckboxStyle = {
  checked: {
    color: "white",
    '&$checked': {
      color: "#0FED8A"
    }
  },
  colorPrimary: {
    color: "white"
  }
}

const CustomCheckbox = ({ input, label, classes }) => (
  <FormControlLabel
    control={
      <Checkbox
        classes={{
          checked: classes.checked,
          colorPrimary: classes.colorPrimary
        }}
        checked={input.value ? true : false}
        onChange={input.onChange}
        color="primary"
      />}
    label={label}
  />
)

export default withStyles(formCheckboxStyle)(CustomCheckbox)
