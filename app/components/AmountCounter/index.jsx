/**
 *
 * CartItem
 *
 */

import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Button from 'components/Button';

const useStyle = makeStyles(theme => ({
  container: {
    display: 'inline',
  },
  button: {
    padding: theme.spacing(1) / 2,
    border: 'solid 1px #ccc',
    marginLeft: props => (props.align === 'center' ? 0 : theme.spacing(1)),
  },
  amount: {
    fontSize: 16,
    display: 'inline-block',
    marginLeft: props => (props.align === 'center' ? 0 : theme.spacing(1)),
    minWidth: 30,
    textAlign: 'center',
  },
}));

function AmountCounter(props) {
  const { className, minValue, initialValue, step, align, onChange } = props;

  const [amount, setAmount] = useState(initialValue);
  const classes = useStyle(props);
  useEffect(() => {
    setAmount(initialValue);
  }, [initialValue]);

  const onDecrementClick = () => {
    let a = amount - step;
    if (a < minValue) {
      a = minValue;
    }
    setAmount(a);
    if (onChange) {
      onChange({
        count: a,
        amount: -step,
      });
    }
  };
  const onIncrementClick = () => {
    const a = amount + step;
    setAmount(a);
    if (onChange) {
      onChange({
        count: a,
        amount: step,
      });
    }
  };

  return (
    <div className={`${classes.container} ${className}`}>
      {align === 'left' ? (
        <Typography component="div" className={`${classes.amount} `}>
          {amount}
        </Typography>
      ) : null}
      <Button
        icon="decrement"
        type="iconButton"
        fontSize="small"
        className={classes.button}
        onClick={onDecrementClick}
      />
      {align === 'center' ? (
        <Typography component="div" className={classes.amount}>
          {amount}
        </Typography>
      ) : null}
      <Button
        icon="increment"
        type="iconButton"
        fontSize="small"
        className={classes.button}
        onClick={onIncrementClick}
      />
      {align === 'right' ? (
        <Typography component="div" className={classes.amount}>
          {amount}
        </Typography>
      ) : null}
    </div>
  );
}

AmountCounter.defaultProps = {
  className: '',
  minValue: 1,
  initialValue: 1,
  align: 'left',
  step: 1,
};

AmountCounter.propTypes = {
  minValue: PropTypes.number,
  initialValue: PropTypes.number,
  step: PropTypes.number,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  onChange: PropTypes.func,
  className: PropTypes.string,
};

export default memo(AmountCounter);
