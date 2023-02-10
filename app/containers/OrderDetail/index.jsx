import React, { memo, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { shoppingStatus } from 'utils/enums';
import { isMobileOnly } from 'utils/platform';
import { currencyFormat, coinFormat } from 'utils/stringFormat';
import { useInjectLoading } from 'utils/injectLoading';
import { addScriptRentracks, removeScriptRentracks } from 'utils/rentracks';

import Transition from 'components/Transition';
import AreaSafe from 'components/AreaSafe';
import Link from 'components/Link';
import Img from 'components/Img';
import CancelOrder from 'components/CancelOrder';
import { path } from 'routers/path';

import OrderItem from './views/OrderItem';
import reducer from './reducer';
import saga from './saga';
import {
  getOrderDetailRequest,
  clearOrderDetailRequest,
  cancelOrderRequest,
} from './actions';
import { CONTEXT, LOADING_ACTIONS } from './constants';
import { makeSelectOrderDetail } from './selectors';

const useStyle = makeStyles(theme => ({
  paperWrapper: {
    borderRadius: isMobileOnly ? 0 : theme.spacing(2),
    overflow: 'auto',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  background: {
    width: isMobileOnly ? '100%' : 600,
    height: 'auto',
    padding: 0,
    backgroundColor: isMobileOnly ? '#000000' : 'transparent',
    display: 'flex',
  },
  wrapper: {
    width: '100%',
    borderRadius: isMobileOnly ? theme.spacing(7) : theme.spacing(2),
    margin: isMobileOnly
      ? theme.spacing(0, 3, 10, 3)
      : theme.spacing(0, 10, 10, 10),
    border: isMobileOnly ? 'none' : `1px solid ${theme.palette.borderColor[0]}`,
    overflow: 'auto',
    backgroundColor: '#ffffff',
    zIndex: 3,
    '& h4': {
      margin: theme.spacing(1.5, 0),
      fontWeight: 'bold',
    },
  },
  header: {
    padding: isMobileOnly ? 0 : theme.spacing(0, 2),
    backgroundColor: isMobileOnly ? '#000000' : '#ffffff',
    color: isMobileOnly ? '#ffffff' : '#000000',
    flexShrink: 0,
    minHeight: 50,
  },
  headerSticky: {
    position: 'sticky',
    backgroundColor: '#ffffff',
    borderBottom: `1px solid ${theme.palette.borderColor[0]}`,
    top: 0,
    padding: theme.spacing(2, 0),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  bottomSticky: {
    position: 'sticky',
    backgroundColor: '#ffffff',
    borderTop: `1px solid ${theme.palette.borderColor[0]}`,
    bottom: 0,
    padding: theme.spacing(2, 0),
  },
  body: {
    padding: isMobileOnly ? theme.spacing(0, 4) : theme.spacing(0, 6),
  },
  btnClose: {
    color: isMobileOnly ? '#ffffff' : theme.palette.grey[500],
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
  },
  order_code: {
    fontWeight: 'bold',
    color: theme.palette.primary.main,
    fontSize: 16,
    paddingLeft: theme.spacing(2),
  },
  divider: {
    color: '#f0f0f0',
    marginTop: theme.spacing(2),
  },
  columnWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  bold: {
    fontWeight: 'bold',
  },
  freeText: {
    background: '#00A99D',
    color: 'white',
    borderRadius: 8,
    padding: '4px 8px 4px 8px',
  },
  grayText: {
    color: '#8E8E93',
  },
  dialogActions: {
    justifyContent: 'center',
    paddingBottom: theme.spacing(4),
    paddingTop: theme.spacing(2),
  },
  total: {
    color: theme.palette.primary.main,
    textAlign: 'right',
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
  },
  coin: {
    color: theme.palette.textColor[9],
  },
  taxVAT: {
    fontSize: isMobileOnly ? 10 : 12,
    color: theme.palette.grey[500],
  },
  shadowView: {
    height: theme.spacing(7),
    borderBottomLeftRadius: theme.spacing(5),
    borderBottomRightRadius: theme.spacing(5),
    position: 'absolute',
  },
  shadow1: {
    backgroundColor: '#cacaca',
    bottom: theme.spacing(7),
    left: theme.spacing(5),
    right: theme.spacing(5),
    zIndex: 2,
  },
  shadow2: {
    backgroundColor: '#808080',
    bottom: theme.spacing(5),
    left: theme.spacing(6),
    right: theme.spacing(6),
    zIndex: 1,
  },
  orderStatusText: {
    padding: theme.spacing(0, 1),
    borderRadius: theme.spacing(2),
    fontSize: 12,
    display: 'inline',
    alignSelf: 'right',
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
  productList: {
    paddingBottom: theme.spacing(2),
  },
  actionWrapper: {
    margin: theme.spacing(1, 0),
  },
}));

const stateSelector = createStructuredSelector({
  orderDetail: makeSelectOrderDetail(),
});

function OrderDetail(props) {
  const classes = useStyle();
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTIONS);

  const dispatch = useDispatch();
  const { orderDetail } = useSelector(stateSelector);

  const { orderId, open, onClose, orderSuccess } = props;
  const [openConfirmCancel, setOpenConfirmCancel] = useState(false);

  useEffect(() => {
    if (open) {
      dispatch(getOrderDetailRequest({ orderId }));
    } else if (!isEmpty(orderDetail)) {
      dispatch(clearOrderDetailRequest());
    }
  }, [open]);

  useEffect(
    () => () => {
      if (orderSuccess) {
        removeScriptRentracks();
      }
    },
    [],
  );

  useEffect(() => {
    if (orderSuccess && !isEmpty(orderDetail)) {
      addScriptRentracks(orderDetail);
    }
  }, [orderDetail]);

  const onCancelOrder = () => {
    setOpenConfirmCancel(true);
  };

  const allowCancelOrder = useMemo(() => {
    const status = get(orderDetail, 'status');
    return (
      (status === 'UNCONFIRMED' || status === 'CONFIRMED') &&
      typeof onClose !== 'undefined'
    );
  }, [orderDetail]);

  const onConfirmCancelOrder = (order, reason) => {
    dispatch(cancelOrderRequest({ orderId: order.orderId, note: reason }));
    setOpenConfirmCancel(false);
  };

  const onCloseConfirmCancel = () => {
    setOpenConfirmCancel(false);
  };

  const orderStatus = shoppingStatus.orderStatus(orderDetail.status);
  const shippingStatus = shoppingStatus.shippingStatus(orderDetail.status);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullScreen={isMobileOnly}
        PaperProps={{
          className: classes.paperWrapper,
        }}
      >
        <Grid
          container
          className={classes.header}
          alignItems="center"
          direction={isMobileOnly ? 'row' : 'row-reverse'}
        >
          <AreaSafe />
          {!orderSuccess && (
            <Grid item>
              <IconButton onClick={onClose} className={classes.btnClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          )}
          <Grid item xs>
            <Typography variant="h6" align="center">
              {orderSuccess
                ? 'Đặt hàng thành công'
                : 'Chi tiết đơn hàng của bạn'}
            </Typography>
          </Grid>
          {!orderSuccess && <Grid item style={{ width: 48 }} />}
        </Grid>
        <DialogContent className={classes.background}>
          <div className={classes.wrapper}>
            <Grid container direction="column" className={classes.body}>
              <Grid item xs className={classes.headerSticky}>
                <Typography className={classes.label} display="inline">
                  Mã đơn hàng:
                  <span className={classes.order_code}>{` #${orderId}`}</span>
                </Typography>
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
              <Grid item xs>
                <div className={classes.columnWrapper}>
                  <div className={classes.title}>
                    <h4>Thông tin giao hàng</h4>
                    {shippingStatus.icon && (
                      <div className={classes.shippingStatus}>
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
                      </div>
                    )}
                  </div>
                  <span className={classes.bold}>
                    {orderDetail.receiverName}
                  </span>
                  <span className={classes.grayText}>
                    {orderDetail.receiverPhone}
                  </span>
                  <span className={classes.grayText}>
                    {orderDetail.receiverAddress}
                  </span>
                </div>
                <Divider className={classes.divider} />
                <h4>Hình thức giao hàng</h4>
                <div>
                  <span className={classes.freeText}>Miễn phí</span> Giao hàng
                  tiêu chuẩn
                </div>
                <Divider className={classes.divider} />
                <h4>Hình thức thanh toán</h4>
                <span className={classes.grayText}>
                  Thanh toán bằng tiền mặt khi nhận hàng (COD)
                </span>
                <Divider className={classes.divider} />
                <h4>Thông tin sản phẩm</h4>
                <div className={classes.productList}>
                  {get(orderDetail, 'items', []).map(item => (
                    <OrderItem key={item.orderItemId} item={item} />
                  ))}
                </div>
              </Grid>
              <Grid item xs className={classes.bottomSticky}>
                <Grid container>
                  <Grid item xs>
                    <Typography className={classes.bold}>
                      Tạm tính
                      <span className={classes.taxVAT}>
                        {` (Đã bao gồm thuế VAT)`}
                      </span>
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.total}>
                      {currencyFormat(orderDetail.total)}
                    </Typography>
                  </Grid>
                </Grid>
                {orderDetail.amountCoin > 0 && (
                  <Grid container>
                    <Grid item xs>
                      <Typography className={classes.bold}>
                        Thanh toán bằng xu
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={`${classes.total} ${classes.coin}`}
                      >
                        {coinFormat(orderDetail.amountCoin)}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid container>
                  <Grid item xs>
                    <Typography className={classes.bold}>Tổng cộng</Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.total}>
                      {currencyFormat(orderDetail.total)}
                    </Typography>
                  </Grid>
                </Grid>
                {(orderSuccess || allowCancelOrder) && (
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={3}
                    className={classes.actionWrapper}
                  >
                    {orderSuccess && (
                      <Grid item>
                        <Link to={path.productHome}>
                          <Button
                            color="secondary"
                            variant="contained"
                            disableElevation
                            onClick={onClose}
                          >
                            TIẾP TỤC MUA SẮM
                          </Button>
                        </Link>
                      </Grid>
                    )}
                    {!orderSuccess && allowCancelOrder && (
                      <Grid item>
                        <Button
                          color="primary"
                          variant="contained"
                          disableElevation
                          onClick={onCancelOrder}
                        >
                          HỦY ĐƠN HÀNG
                        </Button>
                      </Grid>
                    )}
                  </Grid>
                )}
              </Grid>
            </Grid>
          </div>
          {isMobileOnly && (
            <>
              <div className={`${classes.shadowView} ${classes.shadow2}`} />
              <div className={`${classes.shadowView} ${classes.shadow1}`} />
            </>
          )}
        </DialogContent>
      </Dialog>
      <CancelOrder
        open={openConfirmCancel}
        order={orderDetail}
        onClose={onCloseConfirmCancel}
        onConfirmCancel={onConfirmCancelOrder}
      />
    </>
  );
}

OrderDetail.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  open: PropTypes.bool,
  onClose: PropTypes.func,
  orderSuccess: PropTypes.bool,
};

export default memo(OrderDetail);
