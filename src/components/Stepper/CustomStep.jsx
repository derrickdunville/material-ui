import React from 'react';
import PropTypes from 'prop-types';
import Step from '@material-ui/core/Step';
import stepperStyle from 'assets/jss/components/stepperStyle.jsx'
import { withStyles } from '@material-ui/core/styles';

function CustomStep({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Step {...rest}>
      {children}
    </Step>
  );
}

CustomStep.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stepperStyle)(CustomStep);
