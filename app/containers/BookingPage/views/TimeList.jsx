/**
 *
 * SelectTime
 *
 */
import React, { memo, useEffect, useRef, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Radio,
  FormControlLabel,
  Typography,
  Button,
} from '@material-ui/core';
import EventBusyIcon from '@material-ui/icons/EventBusy';

import ScrollView from 'components/ScrollView';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
  },
  timeWrapper: {
    padding: isMobileOnly ? theme.spacing(0, 4) : theme.spacing(8, 4),
  },
  timeList: {
    padding: theme.spacing(2, 4, 6, 4),
  },
  timeItem: {
    marginLeft: 0,
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
  item: {
    minWidth: 'auto',
    padding: theme.spacing(0.5, 0),
    borderRadius: theme.spacing(1.5),
    marginBottom: theme.spacing(1),
  },
}));

function SelectTime(props) {
  const { times, onSelectTime, selectedTime } = props;
  const classes = useStyle();

  const collectionRef = useRef();

  const handleTimeChange = useCallback(event => {
    onSelectTime(event.target.value);
  }, []);

  useEffect(() => {
    if (!isEmpty(times) && selectedTime) {
      const index = times.indexOf(selectedTime);
      scrollToIndex(index);
    }
  }, [selectedTime, times]);

  const scrollToIndex = useCallback(
    index => {
      if (collectionRef && collectionRef.current) {
        const items = collectionRef.current.children;
        const item = items[index];
        const parentWidth = collectionRef.current.getBoundingClientRect().width;
        const itemWidth = item.getBoundingClientRect().width;
        collectionRef.current.scrollLeft =
          item.offsetLeft - (parentWidth - itemWidth / 2) / 2;
      }
    },
    [collectionRef],
  );

  const renderItem = item => (
    <Button
      fullWidth
      key={item}
      className={classes.item}
      onClick={() => onSelectTime(item)}
      variant="contained"
      color={item === selectedTime ? 'primary' : 'default'}
    >
      {item}
    </Button>
  );

  return (
    <>
      {isEmpty(times) ? (
        <Grid
          container
          alignItems="center"
          justify="center"
          direction="column"
          className={classes.emptyWrapper}
        >
          <Grid item>
            <EventBusyIcon className={classes.emptyIcon} />
          </Grid>
          <Grid item>
            <Typography className={classes.emptyText}>
              Rất tiếc salon không phục vụ ngày này{'\n'} hoặc đã quá giờ phục
              vụ!
            </Typography>
          </Grid>
        </Grid>
      ) : (
        <>
          {isMobileOnly ? (
            <Grid container className={classes.timeList} direction="column">
              <Grid item xs>
                <Typography
                  variant="h6"
                  align="center"
                  style={{ marginBottom: 8 }}
                >
                  Chọn giờ
                </Typography>
              </Grid>
              <Grid item xs>
                <ScrollView
                  ref={collectionRef}
                  items={times}
                  cols={4.5}
                  spacing={8}
                  renderItem={renderItem}
                  classNameGrid={classes.gridList}
                />
              </Grid>
            </Grid>
          ) : (
            <Grid container className={classes.timeWrapper}>
              {times.map(item => (
                <Grid item xs={3} key={item}>
                  <FormControlLabel
                    className={classes.timeItem}
                    value={item}
                    control={<Radio checked={item === selectedTime} />}
                    label={item}
                    onChange={handleTimeChange}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </>
  );
}

SelectTime.propTypes = {
  times: PropTypes.array,
  selectedTime: PropTypes.string,
  onSelectTime: PropTypes.func,
};

export default memo(SelectTime);
