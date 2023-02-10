import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn';

import Shipper from 'assets/svgIcon/shipper.svg';
import { path } from 'routers/path';

import { currencyFormat } from 'utils/stringFormat';

import DiscountCode from 'containers/DiscountCode';
import WarningMessage from 'components/WarningMessage';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginTop: theme.spacing(4),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  shipHint: {
    color: '#8E8E93',
    fontSize: 12,
    alignSelf: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    padding: theme.spacing(6),
  },
  textSelect: {
    alignSelf: 'center',
    marginLeft: theme.spacing(2),
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(4),
  },
  imgShipper: {
    width: 25,
    height: 25,
    marginRight: theme.spacing(2),
  },
  textLocation: {
    color: 'black',
    fontSize: 16,
    marginLeft: theme.spacing(2),
  },
  currentLocation: {
    color: theme.palette.primary.main,
    marginLeft: theme.spacing(2),
  },
  textChange: {
    color: '#00A99D',
    cursor: 'pointer',
  },
  currentLocationWrapper: {
    marginTop: '10',
  },
  separator: {
    width: '100%',
    borderBottom: '1px solid #d2d2d2aa',
  },
  vat: {
    textAlign: 'right',
  },
  confirmButton: {
    width: '100%',
  },
  buttonWrapper: {
    padding: theme.spacing(5),
  },
  textGray: {
    color: '#8E8E93',
  },
  textMain: {
    color: theme.palette.primary.main,
  },
  textBigger: {
    fontSize: 16,
  },
  center: {
    alignItems: 'center',
  },
  giftCodeTitle: {
    marginTop: theme.spacing(1),
    alignItems: 'center',
  },
  warning: {
    marginBottom: theme.spacing(2),
  },
}));

const CartConfirm = props => {
  const classes = useStyles();
  const { address, totalSelected, price, errors, onCalculateCart } = props;
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item>
          <img src={Shipper} alt="shipper" className={classes.imgShipper} />
          <span>Địa điểm giao hàng</span>
        </Grid>
        <Grid item container className={classes.currentLocationWrapper}>
          <LocationIcon color="primary" />
          <Grid className={classes.currentLocation} item xs>
            {address && <Typography>{address.addressDetail}</Typography>}
          </Grid>
          {/* <Typography
            className={classes.textChange}
            display="inline"
            onClick={onSelectAddress}
          >
            THAY ĐỔI
          </Typography> */}
        </Grid>
      </Grid>
      <div className={classes.separator} />
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item>
          <span>Thông tin đơn hàng</span>
        </Grid>
        <Grid item container>
          <Grid item xs className={classes.textGray}>
            Tạm tính ({totalSelected} sản phẩm)
          </Grid>
          <Grid item className={classes.textGray}>
            {currencyFormat(price.product)}
          </Grid>
        </Grid>

        <Grid item container direction="row" spacing={4}>
          <Grid item className={classes.giftCodeTitle}>
            Mã giảm giá
          </Grid>
          <Grid item xs>
            <DiscountCode display="text-field" onApply={onCalculateCart} />
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.separator} />
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item container>
          <Grid item xs className={classes.textGray}>
            Giảm giá
          </Grid>
          <Grid item className={classes.textGray}>
            {(price.discount > 0 && `-${currencyFormat(price.discount)}`) ||
              currencyFormat(0)}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs className={classes.textBigger}>
            Tổng cộng
          </Grid>
          <Grid item className={`${classes.textMain} ${classes.textBigger}`}>
            {currencyFormat(price.total)}
          </Grid>
        </Grid>
        <Grid className={classes.vat}>Đã bao gồm thuế VAT (nếu có)</Grid>
      </Grid>
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.confirmButton}
          color="primary"
          variant="contained"
          onClick={() =>
            onCalculateCart(undefined, true, state => {
              history.push({
                pathname: path.confirmOrder,
                state,
              });
            })
          }
          disableElevation
        >
          XÁC NHẬN GIỎ HÀNG
        </Button>
        {errors && errors.length > 0 && (
          <WarningMessage className={classes.warning} messages={errors} />
        )}
      </div>
    </div>
  );
};

CartConfirm.propTypes = {
  address: PropTypes.object,
  totalSelected: PropTypes.number,
  price: PropTypes.object,
  errors: PropTypes.array,
  onCalculateCart: PropTypes.func,
};

export default memo(CartConfirm);
