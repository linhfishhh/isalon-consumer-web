/**
 *
 * PaymentCoin
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';

import { currencyFormat, coinFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(4),
  },
  checkboxLabel: {
    cursor: 'pointer',
  },
  amountCoin: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  exchange: {
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
  },
}));

function PaymentCoin(props) {
  const { spendMaxCoin, bookingCoin, onApplyUseCoin, wallet } = props;

  const classes = useStyle();

  const handerApplyUseCoin = event => {
    const { checked } = event.target;
    onApplyUseCoin(checked);
  };

  return wallet.amountCoin > 0 ? (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Typography variant="h4" color="secondary">
          Thanh toán bằng xu
        </Typography>
      </Grid>
      <Grid item xs={12} container alignItems="center">
        <Grid item>
          <Checkbox
            id="useCoin"
            checked={spendMaxCoin}
            onChange={handerApplyUseCoin}
          />
        </Grid>
        <Grid item xs>
          <Typography
            component="label"
            htmlFor="useCoin"
            className={classes.checkboxLabel}
          >
            {`Sử dụng `}
            <span className={classes.amountCoin}>
              {coinFormat(bookingCoin.amountCoin)}
            </span>
            {` (ứng với `}
            <span className={classes.exchange}>
              {currencyFormat(
                bookingCoin.amountCoin * bookingCoin.exchangeRate,
              )}
            </span>
            {`) để thanh toán.`}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
}

PaymentCoin.propTypes = {
  spendMaxCoin: PropTypes.bool,
  bookingCoin: PropTypes.object,
  wallet: PropTypes.object,
  onApplyUseCoin: PropTypes.func,
};

export default memo(PaymentCoin);
