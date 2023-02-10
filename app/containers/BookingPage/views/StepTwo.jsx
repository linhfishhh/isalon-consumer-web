/**
 *
 * StepTwo
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, Divider } from '@material-ui/core';

import BookingInfo from './BookingInfo';
import PaymentMethods from './PaymentMethods';
import ServiceBooking from './ServiceBooking';
import PaymentCoin from './PaymentCoin';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  leftColumn: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? theme.spacing(7) : 0,
  },
  rightColumn: {
    backgroundColor: theme.palette.background.paper,
    marginTop: isMobileOnly ? theme.spacing(4) : 0,
    marginLeft: isMobileOnly ? 0 : theme.spacing(4),
    borderRadius: isMobileOnly ? theme.spacing(7) : 0,
  },
  serviceWrapper: {
    minHeight: isMobileOnly ? 0 : 400,
    overflow: 'auto',
    paddingTop: isMobileOnly ? theme.spacing(4) : 0,
  },
  bottomView: {
    padding: theme.spacing(4),
  },
  prevButton: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.secondary.main,
    textTransform: 'uppercase',
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.secondary.main,
    )}, 0.2)`,
    fontSize: 18,
    borderRadius: isMobileOnly ? theme.spacing(6) : 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.secondary.main,
      )}, 0.7)`,
    },
  },
  nextButton: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 0.2)`,
    fontSize: 18,
    borderRadius: isMobileOnly ? theme.spacing(6) : 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.primary.main,
      )}, 0.7)`,
    },
  },
}));

function StepTwo(props) {
  const {
    salonInfo,
    bookingInfo,
    bookingItems,
    wallet,
    onSelectPaymentMethod,
    onNextStep,
    onBackStep,
    spendMaxCoin,
    onApplyUseCoin,
    bookingCoin,
  } = props;
  const classes = useStyle();

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12} sm lg={5} className={classes.leftColumn}>
        <BookingInfo bookingInfo={bookingInfo} salonInfo={salonInfo} />
        <Divider />
        <PaymentMethods
          salonInfo={salonInfo}
          onChange={onSelectPaymentMethod}
        />
        <Divider />
        <PaymentCoin
          spendMaxCoin={spendMaxCoin}
          onApplyUseCoin={onApplyUseCoin}
          bookingCoin={bookingCoin}
          wallet={wallet}
        />
      </Grid>
      <Grid item xs={12} sm lg className={classes.rightColumn}>
        <Grid container>
          <Grid item xs={12} className={classes.serviceWrapper}>
            <ServiceBooking
              title="Dịch vụ"
              height={isMobileOnly ? 0 : 350}
              isModify={false}
              services={bookingItems.items}
              bookingCoin={bookingCoin}
              spendMaxCoin={spendMaxCoin}
            />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} className={classes.bottomView}>
            <Grid container alignItems="center" spacing={5}>
              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.prevButton}
                  onClick={onBackStep}
                >
                  Quay lại
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  fullWidth
                  variant="contained"
                  className={classes.nextButton}
                  onClick={onNextStep}
                >
                  Đặt chỗ
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

StepTwo.propTypes = {
  salonInfo: PropTypes.object,
  bookingInfo: PropTypes.object,
  bookingItems: PropTypes.object,
  bookingCoin: PropTypes.object,
  wallet: PropTypes.object,
  spendMaxCoin: PropTypes.bool,
  onSelectPaymentMethod: PropTypes.func,
  onNextStep: PropTypes.func,
  onBackStep: PropTypes.func,
  onApplyUseCoin: PropTypes.func,
};

export default memo(StepTwo);
