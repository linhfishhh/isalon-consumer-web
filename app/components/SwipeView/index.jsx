import React, { memo, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import MobileStepper from '@material-ui/core/MobileStepper';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  stepper: {
    position: 'absolute',
    backgroundColor: 'transparent',
    color: 'white',
  },
  TL: {
    top: 0,
    left: 0,
  },
  TR: {
    top: 0,
    right: 0,
  },
  BL: {
    bottom: 0,
    left: 0,
  },
  BR: {
    bottom: 0,
    right: 0,
  },
  BC: {
    left: '50%',
    bottom: 0,
    transform: 'translate(-50%, 0%)',
  },
}));

const pagingDefaultProps = {
  show: true,
  variant: 'text',
  position: 'BR',
  arrow: false,
};

const SwipeView = props => {
  const { items, renderItem, auto, enableMouseEvents, paging } = props;
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const pagingProps = { ...pagingDefaultProps, ...paging };

  const maxSteps = items.length - 1;

  const handleIndexChange = useCallback(index => {
    setActiveStep(index);
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }, []);

  const contents = useMemo(
    () => items.map((item, index) => renderItem(item, index)),
    [items],
  );

  const nextButton = useMemo(
    () =>
      pagingProps.arrow && (
        <IconButton
          size="small"
          onClick={handleNext}
          disabled={activeStep === maxSteps}
        >
          <KeyboardArrowRight />
        </IconButton>
      ),
    [activeStep],
  );

  const backButton = useMemo(
    () =>
      pagingProps.arrow && (
        <IconButton
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          <KeyboardArrowLeft />
        </IconButton>
      ),
    [activeStep],
  );

  return (
    <div className={classes.root}>
      {auto ? (
        <AutoPlaySwipeableViews
          index={activeStep}
          onChangeIndex={handleIndexChange}
          enableMouseEvents={enableMouseEvents}
          resistance
        >
          {contents}
        </AutoPlaySwipeableViews>
      ) : (
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleIndexChange}
          enableMouseEvents={enableMouseEvents}
          resistance
        >
          {contents}
        </SwipeableViews>
      )}
      {pagingProps.show && (
        <MobileStepper
          variant={pagingProps.variant}
          steps={items.length}
          position="static"
          activeStep={activeStep}
          className={`${classes.stepper} ${classes[pagingProps.position]}`}
          nextButton={nextButton}
          backButton={backButton}
        />
      )}
    </div>
  );
};

SwipeView.defaultProps = {
  items: [],
  auto: false,
  enableMouseEvents: false,
  paging: pagingDefaultProps,
};

SwipeView.propTypes = {
  items: PropTypes.array,
  auto: PropTypes.bool,
  renderItem: PropTypes.func,
  enableMouseEvents: PropTypes.bool,
  paging: PropTypes.exact({
    show: PropTypes.bool,
    variant: PropTypes.oneOf(['text', 'dots', 'progress']),
    position: PropTypes.oneOf(['TL', 'TR', 'BL', 'BR', 'BC']),
    arrow: PropTypes.bool,
  }),
};

export default memo(SwipeView);
