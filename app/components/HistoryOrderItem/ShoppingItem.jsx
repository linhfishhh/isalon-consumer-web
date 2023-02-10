/**
 *
 * BookingItem
 *
 */

import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { ListItem, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { currencyFormat } from 'utils/stringFormat';
import { datetimeISOFormat } from 'utils/dateTime';
import { shoppingStatus } from 'utils/enums';

import HistoryProductItem from 'components/HistoryProductItem';
import Img from 'components/Img';

const useStyle = makeStyles(theme => ({
  wrapperItem: {
    padding: 0,
    paddingTop: theme.spacing(2),
    marginBottom: 20,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: 25,
    backgroundColor: theme.palette.primary.main,
    boxShadow: `0 25px 25px -20px rgba(0, 0, 0, 0.3)`,
  },
  container: {
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: theme.spacing(3),
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

function ShoppingItem(props) {
  const { data, onClick } = props;

  const orderStatus = shoppingStatus.orderStatus(data.status);
  const shippingStatus = shoppingStatus.shippingStatus(data.status);

  const totalQuantity = data.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const onClickItem = useCallback(() => {
    if (onClick) {
      onClick(data);
    }
  }, [data]);
  const classes = useStyle();

  return (
    <ListItem
      alignItems="flex-start"
      className={classes.wrapperItem}
      component="div"
    >
      <Grid container direction="column" className={classes.container}>
        <Grid item xs>
          <Grid container>
            <Grid item xs={12} className={classes.header}>
              <Typography className={classes.orderIdLabel}>
                Mã đơn hàng:
                <Typography
                  component="span"
                  className={classes.orderIdText}
                  onClick={onClickItem}
                >{` #${data.orderId}`}</Typography>
              </Typography>
              <Typography className={classes.detail} onClick={onClickItem}>
                Chi tiết
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography className={classes.dateText}>
                {`Ngày đặt hàng: ${datetimeISOFormat(data.createdAt)}`}
              </Typography>
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
        </Grid>
        <Grid item xs>
          {data.items.map(item => (
            <HistoryProductItem data={item} key={shortid.generate()} />
          ))}
        </Grid>
        <Grid item xs>
          <Grid item container direction="column" alignItems="flex-end">
            <Grid item>
              {shippingStatus.icon && (
                <>
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
                </>
              )}
            </Grid>
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
    </ListItem>
  );
}

ShoppingItem.propTypes = {
  data: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ShoppingItem);
