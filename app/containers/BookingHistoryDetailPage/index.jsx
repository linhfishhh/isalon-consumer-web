/**
 *
 * BookingHistoryDetailPage
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import {
  Dialog,
  DialogContent,
  Grid,
  Typography,
  Divider,
  IconButton,
  Button,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import DateIcon from '@material-ui/icons/DateRange';
import TimeIcon from '@material-ui/icons/Schedule';
import LocationIcon from '@material-ui/icons/LocationOn';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

import AreaSafe from 'components/AreaSafe';
import Transition from 'components/Transition';
import CancelBooking from 'components/CancelBooking';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { currencyFormat, coinFormat } from 'utils/stringFormat';
import { bookingStatus } from 'utils/enums';
import { useInjectLoading } from 'utils/injectLoading';

import { makeSelectBookingHistoryDetailPage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { useStyles } from './styles';
import { CONTEXT, LOADING_ACTIONS } from './constants';
import {
  getBookingHistoryDetailRequest,
  clearBookingHistoryDetailAction,
  cancelBookingRequest,
} from './actions';

function Service(props) {
  const classes = useStyles();

  const { service = {} } = props;
  const { name = '', qty = 0, sum = 0 } = service;

  return (
    <Grid item xs>
      <Grid container direction="row">
        <Grid item xs>
          <Grid container direction="column">
            <Grid item>
              <Typography
                className={`${classes.normal_text} ${classes.bold_text}`}
              >
                {name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.detail_text}>
                {`Số lượng: ${qty}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Typography className={classes.price}>
            {currencyFormat(sum)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

Service.propTypes = {
  service: PropTypes.object,
};

function BookingHistoryDetailPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading(LOADING_ACTIONS);

  const classes = useStyles();

  const {
    open,
    onClose,
    getHistoryDetail,
    detail,
    bookingId,
    clearHistoryDetail,
    cancelBookingOrder,
  } = props;

  const { date, time, salon, services = [], sum = 0, payment, status } = detail;
  const [openCancelBooking, setOpenCancelBooking] = useState(false);

  const itemStatus = bookingStatus.typeOfValue(status);

  useEffect(() => {
    if (open) {
      getHistoryDetail({ bookingId });
    } else if (!isEmpty(detail)) {
      clearHistoryDetail();
    }
  }, [open]);

  const showCancelBookingOrder = useCallback(() => {
    setOpenCancelBooking(true);
  }, []);

  const onCloseCancelBooking = useCallback(() => {
    setOpenCancelBooking(false);
  }, []);

  const onCancelOrder = useCallback(order => {
    const { id } = order;
    cancelBookingOrder({ id });
    setOpenCancelBooking(false);
  }, []);

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
          <Grid item>
            <IconButton onClick={onClose} className={classes.btnClose}>
              <CloseIcon />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="h6" align="center">
              Chi tiết đặt chỗ của bạn
            </Typography>
          </Grid>
          <Grid item style={{ width: 48 }} />
        </Grid>
        <DialogContent className={classes.background}>
          <div className={classes.wrapper}>
            <Grid container direction="column" className={classes.body}>
              <Grid item xs className={classes.headerSticky}>
                <Typography className={classes.title} display="inline">
                  Mã đặt chỗ:
                  <span className={classes.booking_code}>
                    {` #${bookingId}`}
                  </span>
                </Typography>
                {itemStatus && (
                  <Typography
                    className={classes.bookingStatus}
                    style={{
                      color: itemStatus.color,
                    }}
                  >
                    {itemStatus.name}
                  </Typography>
                )}
              </Grid>
              <Grid item xs>
                <Grid container direction="column">
                  <Grid item xs>
                    <Grid container direction="row" className={classes.row}>
                      <Grid item>
                        <DateIcon className={classes.icon} />
                      </Grid>
                      <Grid item>
                        {date ? (
                          <Typography className={classes.normal_text}>
                            {date}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container direction="row" className={classes.row}>
                      <Grid item>
                        <TimeIcon className={classes.icon} />
                      </Grid>
                      <Grid item>
                        {time ? (
                          <Typography className={classes.normal_text}>
                            {time}
                          </Typography>
                        ) : null}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid
                      container
                      direction="row"
                      className={classes.row}
                      alignItems="center"
                    >
                      <Grid item>
                        <LocationIcon className={classes.icon} />
                      </Grid>
                      <Grid item xs>
                        <Typography
                          className={`${classes.normal_text} ${classes.bold_text}`}
                        >
                          {get(salon, 'name', '')}
                        </Typography>
                        <Typography className={classes.detail_text}>
                          {get(salon, 'address', '')}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              {payment && (
                <Grid item xs>
                  <Grid
                    container
                    direction="row"
                    className={classes.row}
                    alignItems="center"
                  >
                    <Grid item>
                      <AttachMoneyIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      <Typography>Hình thức thanh toán</Typography>
                      <Typography className={classes.detail_text}>
                        {payment}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              )}
              <Grid item xs>
                <Divider />
              </Grid>
              <Grid item xs>
                <Grid container direction="row">
                  <Grid item>
                    <Typography
                      className={`${classes.detail_text} ${classes.bold_text}`}
                    >
                      Dịch vụ
                    </Typography>
                  </Grid>
                  <Grid item xs />
                  <Grid item>
                    <Typography
                      className={`${classes.detail_text} ${classes.bold_text}`}
                    >
                      Thành tiền
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {services.map((item, index) => (
                <Service service={item} key={item.id || index} />
              ))}
              <Grid item xs className={classes.bottomSticky}>
                <Grid container>
                  <Grid item xs>
                    <Typography
                      className={`${classes.detail_text} ${classes.bold_text}`}
                    >
                      Tạm tính
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.price}>
                      {currencyFormat(sum)}
                    </Typography>
                  </Grid>
                </Grid>
                {detail.amount_coin > 0 && (
                  <Grid container>
                    <Grid item xs>
                      <Typography
                        className={`${classes.detail_text} ${classes.bold_text}`}
                      >
                        Thanh toán bằng xu
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        className={`${classes.price} ${classes.coin}`}
                      >
                        {coinFormat(detail.amount_coin)}
                      </Typography>
                    </Grid>
                  </Grid>
                )}
                <Grid container>
                  <Grid item xs>
                    <Typography
                      className={`${classes.detail_text} ${classes.bold_text}`}
                    >
                      Tổng cộng
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography className={classes.price}>
                      {currencyFormat(
                        detail.amount_money > 0 ? detail.amount_money : sum,
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              {detail.can_cancel && (
                <Grid
                  container
                  justify="center"
                  className={classes.actionsWrapper}
                >
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      disableElevation
                      onClick={showCancelBookingOrder}
                    >
                      HỦY ĐẶT CHỖ
                    </Button>
                  </Grid>
                </Grid>
              )}
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
      <CancelBooking
        order={detail}
        open={openCancelBooking}
        onClose={onCloseCancelBooking}
        onConfirmCancel={onCancelOrder}
      />
    </>
  );
}

BookingHistoryDetailPage.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  getHistoryDetail: PropTypes.func,
  detail: PropTypes.object,
  bookingId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  clearHistoryDetail: PropTypes.func,
  cancelBookingOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  detail: makeSelectBookingHistoryDetailPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getHistoryDetail: params =>
      dispatch(getBookingHistoryDetailRequest(params)),
    clearHistoryDetail: () => dispatch(clearBookingHistoryDetailAction()),
    cancelBookingOrder: payload => dispatch(cancelBookingRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BookingHistoryDetailPage);
