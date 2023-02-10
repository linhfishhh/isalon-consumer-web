/**
 *
 * Booking
 *
 */
import React, { memo, useEffect, useRef } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Grid, Button, Badge, IconButton, Typography } from '@material-ui/core';
import { BookingIcon } from 'assets/svgIcon';

import { currencyFormat } from 'utils/stringFormat';

const useStyle = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(5),
    zIndex: 2,
    height: 98,
  },
  wrapperMobile: {
    marginTop: 0,
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
  },
  wrapperContent: {
    padding: isMobileOnly ? theme.spacing(2) : theme.spacing(6),
    backgroundColor: isMobileOnly
      ? theme.palette.primary.main
      : theme.palette.background.paper,
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: isMobileOnly ? 0 : 6,
    zIndex: 2,
  },
  sticky: {
    position: 'fixed',
    bottom: 0,
    paddingBottom: isMobileOnly
      ? `calc(${theme.spacing(2)}px + env(safe-area-inset-bottom))`
      : theme.spacing(6),
  },
  button: {
    color: isMobileOnly ? 'inherit' : theme.palette.textColor[6],
    backgroundColor: isMobileOnly
      ? theme.palette.background.paper
      : theme.palette.primary.main,
    textTransform: 'uppercase',
    boxShadow: `0 8px 5px rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 0.2)`,
    fontSize: isMobileOnly ? 14 : 18,
    padding: isMobileOnly ? theme.spacing(2, 4) : theme.spacing(2, 10),
    borderRadius: 6,
    '&:hover': {
      backgroundColor: `rgba(${theme.hexToRgb(
        theme.palette.primary.main,
      )}, 0.7)`,
    },
  },
  buttonIcon: {
    backgroundColor: isMobileOnly
      ? 'transparent'
      : theme.palette.backgroundColor[3],
  },
  price: {
    color: isMobileOnly
      ? theme.palette.textColor[6]
      : theme.palette.primary.main,
    fontSize: isMobileOnly ? 18 : 32,
    fontWeight: 'bold',
    marginLeft: theme.spacing(5),
  },
  label: {
    marginLeft: theme.spacing(5),
  },
  caption: {
    fontSize: 10,
  },
  areaSafe: {
    backgroundColor: theme.palette.primary.main,
  },
}));

const MyBadge = withStyles(theme => ({
  badge: {
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.badgeColor,
    right: -10,
    border: `2px solid ${theme.palette.borderColor[2]}`,
    padding: '0 4px',
  },
}))(Badge);

function Booking(props) {
  const { booking, onNext } = props;
  const classes = useStyle();
  const total = booking.reduce(
    (acc, item) =>
      !isEmpty(item.option)
        ? acc + item.option.final_price * item.qty
        : acc + item.price * item.qty,
    0,
  );

  const count = booking.reduce((acc, item) => acc + item.qty, 0);

  const wrapper = useRef();
  const wrapperContent = useRef();

  const stickyView = show => {
    const elementWrapper = wrapper.current;
    const elementContent = wrapperContent.current;
    if (elementWrapper && elementContent) {
      if (show) {
        elementContent.classList.add(classes.sticky);
        elementContent.style.width = `${elementWrapper.offsetWidth}px`;
      } else {
        elementContent.classList.remove(classes.sticky);
        elementContent.style.removeProperty('width');
      }
    }
  };

  const handleScroll = () => {
    const elementWrapper = wrapper.current;
    const elementContent = wrapperContent.current;
    if (elementContent && elementWrapper) {
      const show =
        window.pageYOffset + window.innerHeight - elementContent.offsetHeight >
        elementWrapper.offsetTop;
      stickyView(!show);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    stickyView(!isEmpty(booking));
  }, [booking]);

  return (
    <div
      ref={wrapper}
      className={isMobileOnly ? classes.wrapperMobile : classes.wrapper}
    >
      <Grid
        container
        ref={wrapperContent}
        className={classes.wrapperContent}
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Grid container alignItems="center">
            <IconButton
              className={classes.buttonIcon}
              size={isMobileOnly ? 'small' : 'medium'}
            >
              <MyBadge badgeContent={count}>
                <BookingIcon color="#fff" />
              </MyBadge>
            </IconButton>
            <Typography display="inline" className={classes.price}>
              {currencyFormat(total)}
            </Typography>
            {!isMobileOnly && (
              <Typography
                component="div"
                display="inline"
                className={classes.label}
              >
                <Typography>{`${booking.length} dịch vụ được thêm`}</Typography>
                <Typography className={classes.caption}>
                  Bạn có thể thêm hoặc tiếp tục
                </Typography>
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Button className={classes.button} onClick={onNext}>
            Chọn thời gian
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

Booking.propTypes = {
  booking: PropTypes.array,
  onNext: PropTypes.func,
};

export default memo(Booking);
