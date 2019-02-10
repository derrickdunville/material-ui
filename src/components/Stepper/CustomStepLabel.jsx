import React from 'react';
import PropTypes from 'prop-types';
import StepLabel from '@material-ui/core/StepLabel';
import stepperStyle from 'assets/jss/components/stepperStyle.jsx'
import { withStyles } from '@material-ui/core/styles';

function CustomStepLabel({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <StepLabel
      classes={{
        root: classes.labelRoot,
        active: classes.labelActive,
        completed: classes.labelCompleted,
        disabled: classes.labelDisabled,
        label: classes.labelLabelRoot
      }}
      StepIconProps={{
        classes: {
          root: classes.stepIconRoot,
          completed: classes.stepIconCompleted,
          active: classes.stepIconActive
        }
      }}
      {...rest}
      >
      {children}
    </StepLabel>
  );
}

CustomStepLabel.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(stepperStyle)(CustomStepLabel);
