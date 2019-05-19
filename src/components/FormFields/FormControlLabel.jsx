import React from "react";
import FormControlLabel from "@material-ui/core/FormControlLabel"
import withStyles from "@material-ui/core/styles/withStyles"

const formControlLabelStyle = {
  root: {
    color: "white"
  },
  label: {
    color: "white"
  }
}

const CustomFormControlLabel = ({
  classes,
  ...rest
}) => (
  <FormControlLabel classes={{
        root: classes.root,
        label: classes.label
    }}
    {...rest}
    />
)

export default withStyles(formControlLabelStyle)(CustomFormControlLabel)
