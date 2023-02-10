/**
 *
 * Slider
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Slider as MuiSlider } from '@material-ui/core';

const sliderStyles = makeStyles(() => ({
  root: {
    height: 4,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -10,
    // '&:focus,&:hover,&$active': {
    //   boxShadow: 'inherit',
    // },
  },
  track: {
    height: 4,
    borderRadius: 2,
  },
  rail: {
    height: 4,
    borderRadius: 2,
  },
}));

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(0, 2),
  },
}));

function scaleValue(value, scale, isDown = true) {
  if (Array.isArray(value)) {
    return value.map(item => (isDown ? item / scale : item * scale));
  }
  return isDown ? value / scale : value * scale;
}

function Slider(props) {
  const {
    className,
    onChanged,
    renderCaption,
    initialValue,
    scaleDown,
    value,
    max,
  } = props;
  const classes = useStyles();
  const classesSlider = sliderStyles();

  const [currentValue, setCurrentValue] = useState(
    scaleValue(initialValue, scaleDown),
  );

  useEffect(() => {
    if (!value) {
      const newValue = scaleValue(value, scaleDown);
      setCurrentValue(newValue);
    }
  }, [value]);

  const handerChangeValue = newValue => {
    setCurrentValue(newValue);
    const valueScaleUp = scaleValue(newValue, scaleDown, false);
    onChanged(valueScaleUp);
  };

  return (
    <div className={classes.wrapper}>
      <MuiSlider
        classes={classesSlider}
        className={className}
        value={currentValue}
        onChange={(_, newValue) => {
          handerChangeValue(newValue);
        }}
        max={scaleValue(max, scaleDown)}
      />
      {renderCaption(scaleValue(currentValue, scaleDown, false))}
    </div>
  );
}

Slider.defaultProps = {
  initialValue: 0,
  scaleDown: 1,
};

Slider.propTypes = {
  initialValue: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  className: PropTypes.string,
  onChanged: PropTypes.func,
  scaleDown: PropTypes.number,
  renderCaption: PropTypes.func,
  max: PropTypes.number,
};

export default memo(Slider);
