/**
 *
 * StepThree
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { Grid, Button, Divider, Typography } from '@material-ui/core';

import { path } from 'routers/path';

import BookingInfo from './BookingInfo';
import ServiceBooking from './ServiceBooking';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  leftColumn: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? theme.spacing(7) : 0,
  },
  rightColumn: {
    backgroundColor: theme.palette.background.paper,
    marginLeft: theme.spacing(4),
    display: isMobileOnly ? 'none' : 'flex',
  },
  button: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 0.2)`,
    fontSize: 16,
    borderRadius: isMobileOnly ? theme.spacing(6) : 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.primary.main,
      )}, 0.7)`,
    },
  },
  secondaryButton: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.secondary.main,
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.secondary.main,
    )}, 0.2)`,
    fontSize: 16,
    borderRadius: isMobileOnly ? theme.spacing(6) : 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.secondary.main,
      )}, 0.7)`,
    },
  },
  bottomView: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  messageWrapper: {
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    padding: theme.spacing(6),
  },
}));

function StepThree(props) {
  const {
    salonInfo,
    bookingInfo,
    bookingItems,
    bookingCoin,
    spendMaxCoin,
  } = props;
  const classes = useStyle();
  const history = useHistory();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item sm className={classes.leftColumn}>
        <BookingInfo
          bookingInfo={bookingInfo}
          salonInfo={salonInfo}
          showPayment
        />
        <ServiceBooking
          title="Dịch vụ"
          isModify={false}
          services={bookingItems.items}
          bookingCoin={bookingCoin}
          spendMaxCoin={spendMaxCoin}
        />
        <Divider />
        <Grid container justify="center" className={classes.bottomView}>
          <Grid item md={6}>
            <Button
              fullWidth
              variant="contained"
              className={classes.button}
              onClick={() => history.push(path.bookingHistory)}
            >
              Quản lý đặt chỗ
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        sm
        container
        className={classes.rightColumn}
        alignItems="center"
        justify="center"
      >
        <Grid item xs={10} md={8} className={classes.messageWrapper}>
          <Grid container direction="column" spacing={4}>
            <Grid item xs>
              <Typography variant="h2" align="center">
                Cám ơn bạn!
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography align="center">
                Bây giờ bạn muốn iSalon giúp gì
              </Typography>
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                variant="contained"
                className={classes.button}
                onClick={() => history.push(path.bookingHome)}
              >
                Đặt lịch làm đẹp
              </Button>
            </Grid>
            <Grid item xs>
              <Button
                fullWidth
                variant="contained"
                className={classes.secondaryButton}
                onClick={() => history.push(path.productHome)}
              >
                Tiếp tục mua sắm
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

StepThree.propTypes = {
  salonInfo: PropTypes.object,
  bookingInfo: PropTypes.object,
  bookingItems: PropTypes.object,
  bookingCoin: PropTypes.object,
  spendMaxCoin: PropTypes.bool,
};

export default memo(StepThree);
