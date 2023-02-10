/**
 *
 * BookingItem
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Typography, Grid, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { bookingStatus } from 'utils/enums';
import { currencyFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapperItem: {
    padding: 0,
    paddingTop: theme.spacing(2),
    marginBottom: 20,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: 25,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 25px 25px -20px rgba(0, 0, 0, 0.3)`,
    cursor: 'pointer',
  },
  container: {
    borderRadius: 24,
    backgroundColor: '#fff',
    height: 112,
    padding: theme.spacing(0, 3),
  },
  time: {
    color: theme.palette.primary.main,
    fontSize: 23,
  },
  date: {
    fontSize: 13,
    whiteSpace: 'nowrap',
  },
  noDate: {
    fontSize: 13,
  },
  dividerVertical: {
    height: 80,
  },
  serviceName: {
    fontSize: 17,
  },
  minute: {
    color: theme.palette.textColor[2],
    display: 'inline',
  },
  salon: {
    fontSize: 15,
    display: 'inline',
  },
  address: {
    fontSize: 11,
    color: theme.palette.textColor[2],
  },
  label: {
    display: 'inline',
    fontSize: 13,
    color: theme.palette.textColor[2],
  },
  status: {
    display: 'inline',
    color: theme.palette.primary.main,
  },
  price: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    fontFamily: theme.typography.fontMedium,
  },
}));

function BookingItem(props) {
  const { data, onClick } = props;
  const { service, salon, time, date, price, status } = data;

  const classes = useStyle();

  const itemStatus = bookingStatus.typeOfValue(status);

  const onClickItem = useCallback(() => {
    if (onClick) {
      onClick(data);
    }
  }, [data]);

  return (
    <ListItem
      alignItems="flex-start"
      className={classes.wrapperItem}
      component="div"
      onClick={onClickItem}
    >
      <Grid container className={classes.container} alignItems="center">
        <Grid item xs={3}>
          {date ? (
            <>
              <Typography className={classes.time} align="center">
                {time}
              </Typography>
              <Divider />
              <Typography className={classes.date} align="center">
                {date}
              </Typography>
            </>
          ) : (
            <Typography className={classes.noDate} align="center">
              Chưa chọn thời gian
            </Typography>
          )}
        </Grid>
        <Grid item xs={1} container justify="center">
          <Divider orientation="vertical" className={classes.dividerVertical} />
        </Grid>
        <Grid item xs={8} zeroMinWidth>
          <Typography noWrap className={classes.serviceName}>
            {service}
          </Typography>
          {price && (
            <Typography noWrap className={classes.price}>
              {currencyFormat(price)}
            </Typography>
          )}
          <Typography noWrap component="div">
            {data.service_times ? (
              <>
                <div className={classes.minute}>{`${
                  data.service_times
                } phút`}</div>
                {' . tại '}
              </>
            ) : (
              <div className={classes.label}>Tại: </div>
            )}
            <div className={classes.salon}>{salon.name}</div>
          </Typography>
          {salon.address && (
            <Typography noWrap className={classes.address}>
              {salon.address}
            </Typography>
          )}
          <Typography noWrap component="div">
            <div className={classes.label}>Tình trạng: </div>
            <div className={classes.status} style={{ color: itemStatus.color }}>
              {itemStatus.name}
            </div>
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

BookingItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(BookingItem);
