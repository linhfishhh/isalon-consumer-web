/**
 *
 * Personal
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import take from 'lodash/take';
import find from 'lodash/find';
import { toDate } from 'date-fns-tz';
import parse from 'date-fns/parse';

import Img from 'components/Img';
import BookingHistoryDetailPage from 'containers/BookingHistoryDetailPage';
import OrderDetail from 'containers/OrderDetail';
import DocumentHead from 'components/DocumentHead';

import VerifiedAccountIcon from 'assets/images/ic_verified_account.png';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useWallet } from 'utils/hooks';

import { getShoppingHistoryRequest } from 'containers/ShoppingHistoryPage/actions';
import { makeSelectShoppingHistory } from 'containers/ShoppingHistoryPage/selectors';
import { CONTEXT as SHOP_CONTEXT } from 'containers/ShoppingHistoryPage/constants';
import shopReducer from 'containers/ShoppingHistoryPage/reducer';
import shopSaga from 'containers/ShoppingHistoryPage/saga';

import {
  makeSelectProfile,
  makeSelectBookingHistory,
  makeSelectShowBookingDetail,
  makeSelectFavoriteProductCount,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getUserProfileRequest,
  getBookingHistoryRequest,
  showBookingHistoryAction,
  getFavoriteProductCountRequest,
} from './actions';
import { CONTEXT } from './constants';
import UserProfile from './views/UserProfile';
import StatisticHeader from './views/StatisticHeader';
import HistoryTable from './views/HistoryTable';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f3f3f4',
    padding: theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10),
    },
  },
  user_info_container: {
    marginTop: theme.spacing(3),
  },
  user_name_text: {
    color: theme.palette.textColor[1],
    fontWeight: 'bold',
    textAlign: 'left',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
  },
  verified_account: {
    width: 100,
    height: 20,
    marginBottom: 20,
  },
  paper_profile: {
    padding: theme.spacing(3),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
    minWidth: 300,
  },
  history_table: {
    marginTop: theme.spacing(3),
  },
}));

export function Personal(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: SHOP_CONTEXT, reducer: shopReducer });
  useInjectSaga({ key: SHOP_CONTEXT, saga: shopSaga });
  const {
    userProfile,
    getUserProfile,
    bookingHistories,
    getBookingHistory,
    showBookingDetail,
    showDetail,
    getShoppingHistory,
    shoppingHistory,
    getFavoriteProductCount,
    favoriteProductCount,
  } = props;

  const { statistic = {} } = userProfile;
  const isDesktop = useMediaQuery(theme => theme.breakpoints.up('lg'));
  const classes = useStyles();
  const { wallet } = useWallet();

  const [currentBookingData, setCurrentBookingData] = useState();
  const [histories, setHistories] = useState([]);

  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState();

  useEffect(() => {
    getUserProfile();
    getBookingHistory({ page: 0, per_page: 10 });
    getShoppingHistory({ page: 0 });
    getFavoriteProductCount();
  }, []);

  useEffect(() => {
    let list1 = [];
    if (bookingHistories) {
      list1 = filter(bookingHistories, item => !isEmpty(item.date)).map(
        item => ({
          id: item.id,
          date: parse(item.date, 'HH:mm - dd/MM/yyyy', new Date()),
          type: 'booking',
          link: '/',
        }),
      );
    }
    let list2 = [];
    if (shoppingHistory && shoppingHistory.content) {
      list2 = shoppingHistory.content.map(item => ({
        id: item.orderId,
        date: toDate(item.createdAt, { timeZone: 'UTC' }),
        type: 'shopping',
        link: '/',
      }));
    }
    const ret = concat(list1, list2);
    ret.sort((it1, it2) => it2.date - it1.date);
    setHistories(take(ret, 10));
  }, [bookingHistories, shoppingHistory]);

  const onShowBookingDetail = data => {
    if (data.type === 'booking') {
      setCurrentBookingData(data);
      showBookingDetail(true);
    } else {
      const d = find(shoppingHistory.content, it => it.orderId === data.id);
      onShowShoppingHistoryDetail(d);
    }
  };

  const onCloseBookingHistoryDetail = React.useCallback(() => {
    showBookingDetail(false);
  }, []);

  const onShowShoppingHistoryDetail = React.useCallback(data => {
    setOrderDetail(data);
    setOpenOrderDetail(true);
  }, []);

  const onCloseOrderDetail = React.useCallback(() => {
    setOrderDetail(undefined);
    setOpenOrderDetail(false);
  }, []);

  return (
    <div className={classes.root}>
      <DocumentHead title="Thông tin cá nhân" description="Thông tin cá nhân" />
      <Grid container direction="column">
        <Grid item>
          <Typography className={classes.user_name_text}>{`Xin chào: ${
            userProfile.name
          }`}</Typography>
          <Img src={VerifiedAccountIcon} className={classes.verified_account} />
        </Grid>
        <Grid container item spacing={5} direction="row">
          <Grid item xs={6} lg={4}>
            <UserProfile user={userProfile} />
          </Grid>
          {isDesktop ? (
            <Grid item xs>
              <Grid container direction="column">
                <Grid item>
                  <StatisticHeader
                    data={statistic}
                    shoppingOrderCount={shoppingHistory.total}
                    amountCoin={wallet.amountCoin}
                    favoriteProductCount={favoriteProductCount}
                  />
                </Grid>
                <Grid item className={classes.history_table}>
                  <HistoryTable
                    data={histories}
                    onClick={onShowBookingDetail}
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : (
            <>
              <Grid item xs>
                <StatisticHeader
                  data={statistic}
                  shoppingOrderCount={shoppingHistory.total}
                  amountCoin={wallet.amountCoin}
                  favoriteProductCount={favoriteProductCount}
                />
              </Grid>
              <Grid item xs={12} className={classes.history_table}>
                <HistoryTable data={histories} onClick={onShowBookingDetail} />
              </Grid>
            </>
          )}
        </Grid>
      </Grid>
      <BookingHistoryDetailPage
        open={showDetail}
        onClose={onCloseBookingHistoryDetail}
        bookingId={get(currentBookingData, 'id', -1)}
      />
      <OrderDetail
        open={openOrderDetail}
        orderId={get(orderDetail, 'orderId')}
        onClose={onCloseOrderDetail}
      />
    </div>
  );
}

Personal.propTypes = {
  userProfile: PropTypes.object,
  getUserProfile: PropTypes.func,
  bookingHistories: PropTypes.array,
  getBookingHistory: PropTypes.func,
  showBookingDetail: PropTypes.func,
  showDetail: PropTypes.bool,
  getShoppingHistory: PropTypes.func,
  shoppingHistory: PropTypes.object,
  getFavoriteProductCount: PropTypes.func,
  favoriteProductCount: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  userProfile: makeSelectProfile(),
  bookingHistories: makeSelectBookingHistory(),
  showDetail: makeSelectShowBookingDetail(),
  shoppingHistory: makeSelectShoppingHistory(),
  favoriteProductCount: makeSelectFavoriteProductCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getUserProfile: () => dispatch(getUserProfileRequest()),
    getBookingHistory: params => dispatch(getBookingHistoryRequest(params)),
    showBookingDetail: show => dispatch(showBookingHistoryAction(show)),
    getShoppingHistory: params => dispatch(getShoppingHistoryRequest(params)),
    getFavoriteProductCount: () => dispatch(getFavoriteProductCountRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Personal);
