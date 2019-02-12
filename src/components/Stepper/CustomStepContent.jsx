import React from 'react';
import PropTypes from 'prop-types';
import StepContent from '@material-ui/core/StepContent';
import stepperStyle from 'assets/jss/components/stepperStyle.jsx'
import { withStyles } from '@material-ui/core/styles';

function CustomStepContent({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <StepContent
      classes={{
        root: classes.contentRoot
      }}
      {...rest}
      >
      {children}
    </StepContent>
  );
}

CustomStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stepperStyle)(CustomStepContent);
