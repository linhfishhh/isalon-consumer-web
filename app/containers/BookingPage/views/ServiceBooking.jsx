/**
 *
 * ServiceBooking
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddCircle';

import Link from 'components/Link';
import ServiceBookingItem from 'components/ServiceBookingItem';

import { isMobileOnly } from 'utils/platform';
import { currencyFormat, coinFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapper: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  title: {
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(4, 0),
  },
  totalWrapper: {
    padding: theme.spacing(1, 0),
  },
  totalLabel: {
    fontFamily: theme.typography.fontMedium,
    padding: isMobileOnly ? theme.spacing(1, 0) : theme.spacing(1, 3),
  },
  totalNumber: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
    fontSize: isMobileOnly ? 18 : 20,
    textAlign: 'right',
  },
  coin: {
    color: theme.palette.textColor[9],
  },
  servicelist: {
    minHeight: props => props.height || 0,
    overflow: 'auto',
  },
  addService: {
    color: theme.palette.secondary.main,
    margin: isMobileOnly ? theme.spacing(0, 0, 4, 0) : 0,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

function ServiceBooking(props) {
  const {
    isModify,
    title,
    height,
    services,
    spendMaxCoin,
    bookingCoin,
    onChangeQuantity,
    onRemoveService,
    url,
  } = props;
  const classes = useStyle(props);

  const total = services.reduce(
    (acc, item) =>
      !isEmpty(item.option)
        ? acc + item.option.final_price * item.qty
        : acc + item.price * item.qty,
    0,
  );

  return (
    <Grid container className={classes.wrapper} direction="column">
      <Grid item>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              variant="h4"
              className={classes.title}
              color="secondary"
            >
              {title}
            </Typography>
          </Grid>
          {url && (
            <Grid item>
              <Link to={url} className={classes.addService}>
                <AddIcon />
                {isMobileOnly
                  ? `Thêm dịch vụ khác`
                  : `Thêm dịch vụ khác từ salon này`}
              </Link>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid item className={height ? classes.servicelist : ''}>
        <Grid container direction="column">
          {services.map((item, index) => (
            <Grid item key={item.id || index}>
              <ServiceBookingItem
                isModify={isModify}
                data={item}
                onChange={onChangeQuantity}
                onRemove={onRemoveService}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
      {total !== 0 && (
        <>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item container className={classes.totalWrapper}>
            <Grid container>
              <Grid item xs>
                <Typography className={classes.totalLabel}>Tạm tính</Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.totalNumber}>
                  {currencyFormat(total)}
                </Typography>
              </Grid>
            </Grid>
            {spendMaxCoin && bookingCoin.amountCoin > 0 && (
              <Grid container>
                <Grid item xs>
                  <Typography className={classes.totalLabel}>
                    Thanh toán bằng xu
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    className={`${classes.totalNumber} ${classes.coin}`}
                  >
                    {coinFormat(bookingCoin.amountCoin)}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid container>
              <Grid item xs>
                <Typography className={classes.totalLabel}>
                  Tổng cộng
                </Typography>
              </Grid>
              <Grid item>
                <Typography className={classes.totalNumber}>
                  {currencyFormat(
                    spendMaxCoin && bookingCoin.amountCoin > 0
                      ? bookingCoin.amountMoney
                      : total,
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </Grid>
  );
}

ServiceBooking.defaultProps = {
  isModify: true,
  services: [],
  bookingCoin: {},
  spendMaxCoin: false,
};

ServiceBooking.propTypes = {
  isModify: PropTypes.bool,
  services: PropTypes.array,
  title: PropTypes.string,
  height: PropTypes.number,
  spendMaxCoin: PropTypes.bool,
  bookingCoin: PropTypes.object,
  url: PropTypes.string,
  onChangeQuantity: PropTypes.func,
  onRemoveService: PropTypes.func,
};

export default memo(ServiceBooking);
