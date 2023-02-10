import React, { memo } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormat } from 'utils/stringFormat';
import { datetimeISOFormat } from 'utils/dateTime';
import { shoppingStatus } from 'utils/enums';

import HistoryProductItem from 'components/HistoryProductItem';
import Img from 'components/Img';

const useStyles = makeStyles(theme => ({
  wrapper: {
    borderBottom: `solid ${theme.spacing(1)}px ${theme.palette.grey[300]}`,
  },
  item: {
    padding: theme.spacing(4, 5),
  },
  orderIdLabel: {
    display: 'inline',
    color: theme.palette.grey[900],
    fontSize: 19,
    marginRight: 5,
  },
  orderIdText: {
    display: 'inline',
    color: theme.palette.primary.main,
    fontSize: 19,
  },
  dateText: {
    color: theme.palette.grey[500],
    fontSize: 13,
  },
  orderStatusText: {
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(2),
    fontSize: 12,
    overflow: 'hidden',
  },
  shippingStatus: {
    marginBottom: 5,
  },
  shippingStatusIcon: {
    width: 'auto',
    height: theme.spacing(3),
    marginRight: 5,
  },
  shippingStatusText: {
    fontSize: 11,
    display: 'inline',
  },
  totalQuantity: {
    display: 'inline',
    color: theme.palette.grey[900],
  },
  totalPrice: {
    display: 'inline',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
  },
  cancel: {
    paddingTop: theme.spacing(2),
  },
  buttonCancel: {
    padding: theme.spacing(1, 2),
    color: 'red',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detail: {
    color: theme.palette.secondary.main,
    display: 'inline',
    fontSize: 12,
  },
}));

function HistoryOrderItem(props) {
  const { data, onCancel, onOpenDetail } = props;

  const classes = useStyles();
  const orderStatus = shoppingStatus.orderStatus(data.status);
  const shippingStatus = shoppingStatus.shippingStatus(data.status);

  const totalQuantity = data.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const allowCancelOrder =
    data.status === 'UNCONFIRMED' || data.status === 'CONFIRMED';

  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs className={classes.item}>
        <Grid container direction="column">
          <Grid item className={classes.header}>
            <Typography className={classes.orderIdLabel}>
              Mã đơn hàng:
              <Typography
                component="span"
                className={classes.orderIdText}
                onClick={onOpenDetail}
              >{` #${data.orderId}`}</Typography>
            </Typography>
            <Typography className={classes.detail} onClick={onOpenDetail}>
              Chi tiết
            </Typography>
          </Grid>
          <Grid item container>
            <Grid item xs>
              <Typography className={classes.dateText}>
                {`Ngày đặt hàng: ${datetimeISOFormat(data.createdAt)}`}
              </Typography>
              {data.shippedAt && (
                <Typography className={classes.dateText}>
                  {`Đã thanh toán: ${datetimeISOFormat(data.shippedAt)}`}
                </Typography>
              )}
            </Grid>
            <Grid item>
              <Typography
                className={classes.orderStatusText}
                style={{
                  color: orderStatus.color,
                  backgroundColor: orderStatus.background,
                }}
              >
                {orderStatus.text}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            {data.items.map(item => (
              <HistoryProductItem data={item} key={shortid.generate()} />
            ))}
          </Grid>
          <Grid item container alignItems="flex-end">
            {allowCancelOrder && (
              <Grid item xs={2}>
                <Button
                  className={classes.buttonCancel}
                  variant="outlined"
                  onClick={() => onCancel(data)}
                >
                  Huỷ
                </Button>
              </Grid>
            )}
            <Grid item xs>
              <Grid container direction="column" alignItems="flex-end">
                {shippingStatus.icon && (
                  <Grid item>
                    <Img
                      src={shippingStatus.icon}
                      className={classes.shippingStatusIcon}
                    />
                    <Typography
                      className={classes.shippingStatusText}
                      style={{ color: shippingStatus.color }}
                    >
                      {shippingStatus.text}
                    </Typography>
                  </Grid>
                )}
                <Grid item>
                  <Typography className={classes.totalQuantity}>
                    {`${totalQuantity} sản phẩm, tổng cộng: `}
                  </Typography>
                  <Typography className={classes.totalPrice}>
                    {currencyFormat(data.total)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

HistoryOrderItem.propTypes = {
  data: PropTypes.object,
  onCancel: PropTypes.func,
  onOpenDetail: PropTypes.func,
};

export default memo(HistoryOrderItem);
