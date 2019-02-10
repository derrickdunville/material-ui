import React from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import stepperStyle from 'assets/jss/components/stepperStyle.jsx'
import { withStyles } from '@material-ui/core/styles';

function CustomStepper({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Stepper
      classes={{
        root: classes.root
      }}
      {...rest}
      >
      {children}
    </Stepper>
  );
}

CustomStepper.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stepperStyle)(CustomStepper);
