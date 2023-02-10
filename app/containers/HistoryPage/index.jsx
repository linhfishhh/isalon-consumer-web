/**
 *
 * History
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import BookingHistoryDetailPage from 'containers/BookingHistoryDetailPage';
import OrderDetail from 'containers/OrderDetail';
import BasePageView from 'components/BasePageView';
import AreaSafe from 'components/AreaSafe';
import DocumentHead from 'components/DocumentHead';

import { TABBAR_BOTTOM_HEIGHT } from 'utils/constants';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication } from 'utils/hooks';

import {
  getBookingWaitingRequest,
  getShoppingWaitingRequest,
  cleanDataAction,
  changeTypeActiveAction,
} from './actions';
import { CONTEXT } from './constants';
import {
  makeSelectWaitingBooking,
  makeSelectWaitingShopping,
  makeSelectBookingLoading,
  makeSelectShoppingLoading,
  makeSelectTypeActive,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import Welcome from './views/Welcome';
import Types from './views/Types';
import BookingWaiting from './views/BookingWaiting';
import ShoppingWaitting from './views/ShoppingWaiting';

const types = [
  {
    id: 'booking',
    name: 'Đặt chỗ',
  },
  {
    id: 'shoping',
    name: 'Mua hàng',
  },
];

const useStyles = makeStyles(theme => ({
  wrapper: {},
  content: {
    borderTopLeftRadius: theme.spacing(7),
    borderTopRightRadius: theme.spacing(7),
  },
  areaSafe: {
    backgroundColor: theme.palette.primary.main,
  },
}));

export function HistoryPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    bookingLoading,
    bookingWaiting,
    shoppingLoading,
    shoppingWaiting,
    getBookingWaiting,
    getShoppingWaiting,
    cleanData,
    typeActive,
    changeTypeActive,
  } = props;

  const classes = useStyles();

  const { authenticated, showSignInDialog } = useAuthentication();
  const [orderId, setOrderId] = useState();
  const [showBookingDetail, setShowBookingDetail] = useState(false);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const fetchData = () => {
    if (authenticated) {
      getBookingWaiting();
      getShoppingWaiting({
        orderStatus: 'WAIT_FOR_SHIPPING',
      });
    }
  };

  const handleCloseDetail = useCallback(() => {
    setShowOrderDetail(false);
    setShowBookingDetail(false);
  }, []);

  const handleShowDetail = useCallback((id, type) => {
    setOrderId(id);
    if (type === 'booking') {
      setShowBookingDetail(true);
    } else {
      setShowOrderDetail(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    } else {
      cleanData();
    }
  }, [authenticated]);

  return (
    <BasePageView
      className={classes.wrapper}
      contentProps={{
        onRefresh: fetchData,
        cornerRadiusColor: 'primary',
        paddingBottom: TABBAR_BOTTOM_HEIGHT,
      }}
      header={
        <>
          <AreaSafe className={classes.areaSafe} />
          <Types
            types={types}
            active={typeActive}
            onChange={changeTypeActive}
          />
        </>
      }
    >
      <DocumentHead title="Lịch sử" description="Lịch sử" />
      <Grid container direction="column">
        <Grid item xs>
          {authenticated ? (
            <>
              {typeActive === 0 ? (
                <BookingWaiting
                  loading={bookingLoading}
                  data={bookingWaiting.orders}
                  onClick={handleShowDetail}
                />
              ) : (
                <ShoppingWaitting
                  loading={shoppingLoading}
                  data={shoppingWaiting.content}
                  onClick={handleShowDetail}
                />
              )}
            </>
          ) : (
            <Welcome typeActive={typeActive} signIn={showSignInDialog} />
          )}
        </Grid>
      </Grid>
      <BookingHistoryDetailPage
        open={showBookingDetail}
        onClose={handleCloseDetail}
        bookingId={orderId}
      />
      <OrderDetail
        open={showOrderDetail}
        orderId={orderId}
        onClose={handleCloseDetail}
      />
    </BasePageView>
  );
}

HistoryPage.propTypes = {
  bookingLoading: PropTypes.bool,
  bookingWaiting: PropTypes.object,
  shoppingLoading: PropTypes.bool,
  shoppingWaiting: PropTypes.object,
  getBookingWaiting: PropTypes.func,
  getShoppingWaiting: PropTypes.func,
  cleanData: PropTypes.func,
  typeActive: PropTypes.number,
  changeTypeActive: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  bookingLoading: makeSelectBookingLoading(),
  bookingWaiting: makeSelectWaitingBooking(),
  shoppingLoading: makeSelectShoppingLoading(),
  shoppingWaiting: makeSelectWaitingShopping(),
  typeActive: makeSelectTypeActive(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBookingWaiting: () => dispatch(getBookingWaitingRequest()),
    getShoppingWaiting: payload => dispatch(getShoppingWaitingRequest(payload)),
    cleanData: payload => dispatch(cleanDataAction(payload)),
    changeTypeActive: typeActive =>
      dispatch(changeTypeActiveAction({ typeActive })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HistoryPage);
