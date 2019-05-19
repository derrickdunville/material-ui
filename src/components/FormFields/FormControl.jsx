import React from "react";
import FormControl from "@material-ui/core/FormControl"
import withStyles from "@material-ui/core/styles/withStyles"
import formControlStyle from "assets/jss/components/formControlStyle.jsx"

const CustomFormControl = ({
  classes,
  ...rest
}) => (
  <FormControl classes={{
        root: classes.root
    }}
    {...rest}
    />
)

export default withStyles(formControlStyle)(CustomFormControl)
