import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { toDate } from 'date-fns-tz';
import Unit from './Unit';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  unit: {
    marginLeft: 4,
  },
  dot: {
    margin: theme.spacing(0, 0.5),
  },
}));

function FlipClock(props) {
  const { className, expiredAt } = props;
  const [day, setDay] = useState(0);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const classes = useStyles();

  const timerRef = useRef();

  useEffect(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const updateTimer = setInterval(() => {
      calculateDisplayTime();
    }, 1000);
    timerRef.current = updateTimer;
  }, [expiredAt]);

  useEffect(
    () => () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    },
    [],
  );

  const calculateRemainTime = () => {
    if (expiredAt) {
      const now = new Date();
      const expiredAtDate = toDate(expiredAt, { timeZone: 'UTC' });

      let countDownTime = Math.round((expiredAtDate - now) / 1000);
      if (countDownTime < 0) {
        countDownTime = 0;
      }
      return countDownTime;
    }
    return 0;
  };

  const calculateDisplayTime = () => {
    const remainTime = calculateRemainTime();
    if (remainTime >= 0) {
      const d = Math.floor(remainTime / 86400);
      const timeRemain = remainTime - d * 86400;
      const h = Math.floor(timeRemain / 3600);
      const m = Math.floor((timeRemain - h * 3600) / 60);
      const s = timeRemain - h * 3600 - m * 60;
      if (d !== day) {
        setDay(d);
      }
      if (h !== hour) {
        setHour(h);
      }
      if (m !== minute) {
        setMinute(m);
      }
      if (s !== second) {
        setSecond(s);
      }
    }
  };

  return (
    <div className={`${className} ${classes.root}`}>
      <Unit value={day} className={classes.unit} />
      <span className={classes.dot}>:</span>
      <Unit value={hour} className={classes.unit} />
      <span className={classes.dot}>:</span>
      <Unit value={minute} className={classes.unit} />
      <span className={classes.dot}>:</span>
      <Unit value={second} className={classes.unit} />
    </div>
  );
}

FlipClock.propTypes = {
  className: PropTypes.string,
  expiredAt: PropTypes.string,
};

export default memo(FlipClock);
