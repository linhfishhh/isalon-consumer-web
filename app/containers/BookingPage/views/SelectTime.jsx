/**
 *
 * SelectTime
 *
 */
import React, { memo, useState, useMemo, useEffect, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import viLocale from 'date-fns/locale/vi';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { getISODay } from 'date-fns';

import { filterOpenTimeList, getHolidays } from 'utils/dateTime';

import TimeList from './TimeList';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
  },
  timeWrapper: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  timeItem: {
    // paddingLeft: theme.spacing(5),
  },
  emptyWrapper: {
    padding: isMobileOnly ? theme.spacing(0, 0, 4, 0) : theme.spacing(0, 10),
  },
  emptyIcon: {
    fontSize: 80,
    color: theme.palette.textColor[2],
  },
  emptyText: {
    whiteSpace: 'pre-wrap',
    textAlign: 'center',
  },
}));

function SelectTime(props) {
  const { openTime, onSelected, bookingDate, bookingTime } = props;
  const classes = useStyle();

  const [times, setTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(bookingDate);
  const [selectedTime, setSelectedTime] = useState(bookingTime);

  const holidays = useMemo(() => getHolidays(openTime), [openTime]);

  const disableDate = useCallback(
    date => {
      const day = getISODay(date);
      return holidays.includes(`${day}`);
    },
    [openTime],
  );

  useEffect(() => {
    updateTimeList();
  }, []);

  useEffect(() => {
    updateTimeList();
  }, [selectedDate, openTime]);

  const updateTimeList = useCallback(() => {
    const day = getISODay(Date.parse(selectedDate));
    const timeList = openTime[day];
    if (!isEmpty(timeList)) {
      const timesResult = filterOpenTimeList(
        Date.parse(selectedDate),
        timeList,
      );
      setTimes(timesResult);
      if (!timesResult.includes(selectedTime)) {
        setSelectedTime(timesResult[0]);
      }
    }
  }, [selectedDate, openTime]);

  const handleDateChange = useCallback(date => {
    setSelectedDate(date.toISOString());
  }, []);

  const handleTimeChange = useCallback(time => {
    setSelectedTime(time);
  }, []);

  useEffect(() => {
    onSelected({ date: selectedDate, time: selectedTime });
  }, [selectedDate, selectedTime]);

  return (
    <Grid
      container
      className={classes.wrapper}
      direction="column"
      justify="space-between"
    >
      <Grid item xs>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={viLocale}>
          <DatePicker
            autoOk
            orientation="landscape"
            variant="static"
            openTo="date"
            disablePast
            value={Date.parse(selectedDate)}
            onChange={handleDateChange}
            shouldDisableDate={disableDate}
            disableToolbar={isMobileOnly}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs>
        <TimeList
          times={times}
          selectedTime={selectedTime}
          onSelectTime={handleTimeChange}
        />
      </Grid>
    </Grid>
  );
}

SelectTime.propTypes = {
  openTime: PropTypes.object,
  onSelected: PropTypes.func,
  bookingDate: PropTypes.any,
  bookingTime: PropTypes.string,
};

export default memo(SelectTime);
