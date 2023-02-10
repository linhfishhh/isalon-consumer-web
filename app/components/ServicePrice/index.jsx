/**
 *
 * ServicePrice
 *
 */

import React, { memo } from 'react';
import { isMobileOnly, isNative } from 'utils/platform';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Button } from '@material-ui/core';

import { FlashIcon } from 'assets/svgIcon';

import AreaSafe from 'components/AreaSafe';

import { currencyFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapper: {
    flexShrink: 0,
    backgroundColor: theme.palette.primary.main,
    background: isMobileOnly
      ? 'none'
      : `linear-gradient(90deg, rgba(${theme.hexToRgb(
          theme.palette.primary.main,
        )}, 1) 0%, rgba(${theme.hexToRgb(
          theme.palette.backgroundColor[5],
        )}, 1) 100%)`,
    padding: isMobileOnly ? theme.spacing(2, 4) : theme.spacing(0, 4),
    height: isMobileOnly ? 'auto' : 96,
    paddingBottom: isMobileOnly
      ? `calc(${theme.spacing(2)}px + env(safe-area-inset-bottom))`
      : 0,
  },
  price: {
    fontSize: isMobileOnly ? 16 : 24,
    color: theme.palette.textColor[6],
    fontWeight: theme.typography.fontWeightMedium,
    display: 'inline',
  },
  oldPrice: {
    paddingRight: theme.spacing(2),
    color: theme.palette.textColor[6],
    textDecoration: 'line-through',
  },
  discount: {
    backgroundColor: theme.palette.backgroundColor[1],
    borderRadius: theme.shape.borderRadius,
    display: 'inline',
    padding: isMobileOnly ? theme.spacing(0.5, 1) : theme.spacing(1, 2),
    color: theme.palette.primary.main,
  },
  flash: {
    width: 8,
    margin: theme.spacing(0, 1),
  },
  booking: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: isMobileOnly ? 16 : 24,
    textTransform: 'uppercase',
    padding: theme.spacing(1, 5),
    borderRadius: isMobileOnly ? 18 : theme.spacing(1.5),
    '&:hover': {
      color: isMobileOnly
        ? theme.palette.primary.main
        : theme.palette.textColor[6],
      backgroundColor: isMobileOnly ? 'white' : theme.palette.primary.main,
    },
  },
  selected: {
    color: theme.palette.textColor[6],
    backgroundColor: isMobileOnly
      ? theme.palette.warning.main
      : theme.palette.primary.main,
  },
  separator: {
    width: isMobileOnly ? theme.spacing(2) : theme.spacing(20),
  },
}));

function ServicePrice(props) {
  const {
    bookingNow,
    isBooking,
    price,
    oldPrice,
    salePercent,
    onBooking,
  } = props;
  const classes = useStyle();

  const bookingLabel = bookingNow ? 'Đặt ngay' : 'Đặt chỗ';

  return (
    <Grid
      container
      className={classes.wrapper}
      alignItems="center"
      justify={isMobileOnly ? 'space-between' : 'flex-start'}
    >
      <Grid
        item
        xs
        container
        justify={isMobileOnly ? 'flex-start' : 'flex-end'}
      >
        <Grid item>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-end"
          >
            <Grid item>
              <Typography className={classes.price}>
                {price !== oldPrice && (
                  <Typography
                    component="span"
                    className={classes.oldPrice}
                    align="right"
                  >
                    {currencyFormat(oldPrice)}
                  </Typography>
                )}
                {currencyFormat(price)}
              </Typography>
            </Grid>
            {salePercent !== 0 && (
              <Grid item>
                <Typography className={classes.discount}>
                  <FlashIcon className={classes.flash} />
                  {`- ${salePercent}%`}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.separator} />
      <Grid
        item
        xs
        container
        justify={isMobileOnly ? 'flex-end' : 'flex-start'}
      >
        <Button
          className={`${classes.booking} ${isBooking && classes.selected}`}
          onClick={onBooking}
        >
          {isBooking ? 'Đã chọn' : bookingLabel}
        </Button>
      </Grid>
      {isNative && (
        <Grid item xs={12}>
          <AreaSafe edge="bottom" />
        </Grid>
      )}
    </Grid>
  );
}

ServicePrice.defaultProps = {
  bookingNow: false,
  isBooking: false,
  price: 0,
  oldPrice: 0,
  salePercent: 0,
};

ServicePrice.propTypes = {
  bookingNow: PropTypes.bool,
  isBooking: PropTypes.bool,
  price: PropTypes.number,
  oldPrice: PropTypes.number,
  salePercent: PropTypes.number,
  onBooking: PropTypes.func,
};

export default memo(ServicePrice);
