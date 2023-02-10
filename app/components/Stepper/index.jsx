/**
 *
 * Stepper
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import MuiStepper from '@material-ui/core/Stepper';
import { makeStyles } from '@material-ui/core/styles';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  label: { color: theme.palette.grey[500] },
  caption: {},
}));

function Stepper(props) {
  const classes = useStyles();
  const { className, steps, activeStep, linear, showCaption } = props;

  return (
    <MuiStepper
      className={className}
      activeStep={activeStep.id}
      alternativeLabel={linear}
    >
      {steps.map((step, index) => {
        const stepProps = {};
        const labelProps = {};
        if (showCaption && !isEmpty(step.caption)) {
          labelProps.optional = (
            <Typography variant="caption" className={classes.caption}>
              {step.caption}
            </Typography>
          );
        }
        return (
          <Step key={step.id || index} {...stepProps}>
            <StepLabel className={classes.label} {...labelProps}>
              {step.label}
            </StepLabel>
          </Step>
        );
      })}
    </MuiStepper>
  );
}

Stepper.defaultProps = {
  className: '',
  linear: false,
  showCaption: true,
};

Stepper.propTypes = {
  className: PropTypes.string,
  steps: PropTypes.array,
  activeStep: PropTypes.object,
  linear: PropTypes.bool,
  showCaption: PropTypes.bool,
};

export default memo(Stepper);
