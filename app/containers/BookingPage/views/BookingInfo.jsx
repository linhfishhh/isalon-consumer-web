/**
 *
 * BookingInfo
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import CalendarIcon from '@material-ui/icons/EventAvailable';
import format from 'date-fns/format';

import TimeIcon from '@material-ui/icons/Schedule';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import SalonInfo from './SalonInfo';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(4),
  },
  address: {
    color: theme.palette.textColor[2],
  },
  label: {
    display: 'inline',
    fontFamily: theme.typography.fontMedium,
  },
  icon: {
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    color: theme.palette.grey[600],
  },
}));

function BookingInfo(props) {
  const { salonInfo, bookingInfo, showPayment } = props;
  const { date, time, payment } = bookingInfo;
  const classes = useStyle();
  const dateBooking = format(Date.parse(date), 'dd-MM-yyyy');

  return (
    <Grid container className={classes.wrapper} spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          Thông tin đặt chỗ
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item container xs={12}>
        <Grid item xs>
          <CalendarIcon className={classes.icon} />
          <Typography className={classes.label}>{dateBooking}</Typography>
        </Grid>
        <Grid item xs={!isMobileOnly}>
          <TimeIcon className={classes.icon} />
          <Typography className={classes.label}>{time}</Typography>
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <SalonInfo salonInfo={salonInfo} showIcon />
      </Grid>
      {showPayment && payment && (
        <Grid item container xs={12}>
          <Grid item>
            <AttachMoneyIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="h6">Hình thức thanh toán</Typography>
            <Typography className={classes.payment}>{payment.title}</Typography>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

BookingInfo.propTypes = {
  salonInfo: PropTypes.object,
  bookingInfo: PropTypes.object,
  showPayment: PropTypes.bool,
};

export default memo(BookingInfo);
