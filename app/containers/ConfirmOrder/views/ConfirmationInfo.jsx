import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Button, Checkbox, Divider } from '@material-ui/core';
import LocationIcon from '@material-ui/icons/LocationOn';

import Shipper from 'assets/svgIcon/shipper.svg';
import { currencyFormat, coinFormat } from 'utils/stringFormat';

import DiscountCode from 'containers/DiscountCode';
import WarningMessage from 'components/WarningMessage';
import SelectAddress from './SelectAddress';

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
    padding: theme.spacing(4),
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
  addressWrapper: {
    display: 'flex',
  },
  textChange: {
    color: '#00A99D',
    cursor: 'pointer',
    marginLeft: 'auto',
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
    fontFamily: theme.typography.fontMedium,
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
  checkbox: {
    marginLeft: theme.spacing(-3),
  },
  checkboxLabel: {
    cursor: 'pointer',
  },
  amountCoin: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
    fontSize: 16,
  },
  coin: {
    color: theme.palette.textColor[9],
  },
}));

const ConfirmationInfo = props => {
  const classes = useStyles();
  const {
    order,
    address,
    addresses,
    onSelectAddress,
    onApplyGiftCode,
    onPay,
    giftCode,
    onApplyUseCoin,
    spendMaxCoin,
    wallet,
    getMyAddresses,
  } = props;

  const [openSelectAddress, setOpenSelectAddress] = useState(false);
  const [openAddAddress, setOpenAddAddress] = useState(false);
  const errorMessages = order.errors.map(e => e.message);

  const handleApplyUseCoin = useCallback(event => {
    onApplyUseCoin(event.target.checked);
  });

  const handleOpenSelect = useCallback(() => {
    if (isEmpty(addresses)) {
      setOpenAddAddress(true);
    } else {
      setOpenSelectAddress(true);
    }
  }, [addresses]);

  const handleCloseSelect = useCallback(() => {
    setOpenSelectAddress(false);
  }, []);

  const handleOpenAddAddress = useCallback(() => {
    setOpenAddAddress(true);
  }, []);

  const handleCloseAddAddress = useCallback(() => {
    setOpenAddAddress(false);
  }, []);

  useEffect(() => {
    if (order.errors) {
      const errorTypes = order.errors.map(e => e.type);
      if (errorTypes.includes('address')) {
        if (isEmpty(addresses)) {
          setOpenAddAddress(true);
        } else {
          setOpenSelectAddress(true);
        }
      }
    }
  }, [order]);

  const handlePayOrder = useCallback(() => {
    if (isEmpty(address)) {
      if (isEmpty(addresses)) {
        setOpenAddAddress(true);
      } else {
        setOpenSelectAddress(true);
      }
    } else {
      onPay();
    }
  }, [address, addresses, spendMaxCoin, giftCode]);

  return (
    <div className={classes.root}>
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item className={classes.addressWrapper}>
          <img src={Shipper} alt="shipper" className={classes.imgShipper} />
          <span>Địa điểm giao hàng</span>
          <Typography
            className={classes.textChange}
            display="inline"
            onClick={handleOpenSelect}
          >
            {(address && 'THAY ĐỔI') || 'TẠO'}
          </Typography>
        </Grid>
        <Grid item container className={classes.currentLocationWrapper}>
          <LocationIcon color="primary" />
          <Grid item xs>
            {(address && (
              <div className={classes.currentLocation}>
                <Typography>{address.name}</Typography>
                <Typography>{address.phone}</Typography>
                <Typography>{address.addressDetail}</Typography>
              </div>
            )) || (
              <Typography>
                Chưa có địa chỉ, vui lòng tạo địa chỉ giao hàng
              </Typography>
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.separator} />
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item>
          <span>Thông tin đơn hàng</span>
        </Grid>
        <Grid item container>
          <Grid item xs className={classes.textGray}>
            Tạm tính ({get(order, 'items', []).length} sản phẩm)
          </Grid>
          <Grid item className={classes.textGray}>
            {currencyFormat(order.subTotal)}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs className={classes.textGray}>
            Phí giao hàng
          </Grid>
          <Grid item className={classes.textGray}>
            {(order.shippingFee > 0 &&
              `${currencyFormat(order.shippingFee)}`) ||
              currencyFormat(0)}
          </Grid>
        </Grid>
        <Grid item container direction="row" spacing={4}>
          <Grid item className={classes.giftCodeTitle}>
            Mã giảm giá
          </Grid>
          <Grid item xs>
            <DiscountCode
              display="text-field"
              onApply={onApplyGiftCode}
              initialValue={giftCode}
            />
          </Grid>
        </Grid>
        {wallet.amountCoin > 0 && (
          <Grid item container alignItems="center">
            <Grid item>
              <Checkbox
                id="useCoin"
                className={classes.checkbox}
                checked={spendMaxCoin}
                onChange={handleApplyUseCoin}
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
                  {coinFormat(order.amountCoin)}
                </span>
                {` (ứng với `}
                <span className={classes.exchange}>
                  {currencyFormat(order.amountCoin * order.exchangeRate)}
                </span>
                {`) để thanh toán.`}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Grid>
      <div className={classes.separator} />
      <Grid container direction="column" spacing={2} className={classes.header}>
        <Grid item container>
          <Grid item xs className={classes.textGray}>
            Giảm giá
          </Grid>
          <Grid item className={classes.textGray}>
            {(order.discount > 0 && `-${currencyFormat(order.discount)}`) ||
              currencyFormat(0)}
          </Grid>
        </Grid>
        <Grid item container>
          <Grid item xs className={classes.textBigger}>
            Tạm tính
          </Grid>
          <Grid item className={`${classes.textMain} ${classes.textBigger}`}>
            {currencyFormat(order.total)}
          </Grid>
        </Grid>
        <Grid className={classes.vat}>Đã bao gồm thuế VAT (nếu có)</Grid>
        <Grid item>
          <Divider />
        </Grid>
        {spendMaxCoin && order.amountCoin && (
          <Grid item container>
            <Grid item xs className={classes.textBigger}>
              Thanh toán bằng xu
            </Grid>
            <Grid
              item
              className={`${classes.textMain} ${classes.textBigger} ${
                classes.coin
              }`}
            >
              {coinFormat(order.amountCoin)}
            </Grid>
          </Grid>
        )}
        <Grid item container>
          <Grid item xs className={classes.textBigger}>
            Tổng cộng
          </Grid>
          <Grid item className={`${classes.textMain} ${classes.textBigger}`}>
            {currencyFormat(
              spendMaxCoin && order.amountCoin > 0
                ? order.amountMoney
                : order.total,
            )}
          </Grid>
        </Grid>
      </Grid>
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.confirmButton}
          color="primary"
          variant="contained"
          onClick={handlePayOrder}
          disableElevation
        >
          THANH TOÁN
        </Button>
        {order.errors && order.errors.length > 0 && (
          <WarningMessage
            className={classes.warning}
            messages={errorMessages}
          />
        )}
      </div>
      <SelectAddress
        open={openSelectAddress}
        addresses={addresses}
        onSelect={onSelectAddress}
        onClose={handleCloseSelect}
        getMyAddresses={getMyAddresses}
        openAddAddress={openAddAddress}
        onOpenAddAddress={handleOpenAddAddress}
        onCloseAddAddress={handleCloseAddAddress}
      />
    </div>
  );
};

ConfirmationInfo.propTypes = {
  order: PropTypes.object,
  address: PropTypes.object,
  addresses: PropTypes.array,
  onSelectAddress: PropTypes.func,
  onApplyGiftCode: PropTypes.func,
  onPay: PropTypes.func,
  giftCode: PropTypes.string,
  onApplyUseCoin: PropTypes.func,
  spendMaxCoin: PropTypes.bool,
  wallet: PropTypes.object,
  getMyAddresses: PropTypes.func,
};

export default memo(ConfirmationInfo);
