/**
 *
 * WalletPage
 *
 */

import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { isMobileOnly } from 'utils/platform';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import WalletSummary from 'components/WalletSummary';
import OrderDetail from 'containers/OrderDetail';
import BookingDetail from 'containers/BookingHistoryDetailPage';

import Transactions from './views/Transactions';

import { getTransactionsRequest, getWalletRequest } from './actions';
import { CONTEXT } from './constants';
import { makeSelectTransactions, makeSelectWallet } from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f3f3f4',
    padding: isMobileOnly ? 0 : theme.spacing(8),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(10),
    },
  },
  seperator: {
    width: theme.spacing(5),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: isMobileOnly ? theme.spacing(2) : theme.spacing(5),
    },
  },
}));

export function WalletPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { transactions, getTransactions, wallet, getWallet } = props;
  const classes = useStyles();
  const [orderId, setOrderId] = useState();
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [openBookingDetail, setOpenBookingDetail] = useState(false);

  useEffect(() => {
    getTransactions();
    getWallet();
  }, []);

  const handleLoadMore = useCallback(() => {
    const page = transactions.page + 1;
    getTransactions({ page });
  }, [transactions]);

  const handleShowDetailOrder = useCallback((id, type) => {
    setOrderId(id);
    if (type === 'booking') {
      setOpenBookingDetail(true);
    }
    if (type === 'shop') {
      setOpenOrderDetail(true);
    }
  }, []);

  return (
    <BasePageView
      header={<Navigation title="Ví iSalon" />}
      contentProps={{
        cornerRadiusColor: 'primary',
      }}
    >
      <div className={classes.root}>
        <DocumentHead title="Ví iSalon" description="Ví iSalon" />
        <Grid container>
          <Grid item xs={12} sm={6} lg={4}>
            <WalletSummary amount={wallet.amountCoin} type="vertical" />
          </Grid>
          <Grid item className={classes.seperator} />
          <Grid item xs>
            <Transactions
              data={transactions.content}
              isLast={transactions.isLast}
              onLoadMore={handleLoadMore}
              onShowOrderDetail={handleShowDetailOrder}
            />
          </Grid>
        </Grid>
      </div>
      <OrderDetail
        open={openOrderDetail}
        orderId={orderId}
        onClose={() => setOpenOrderDetail(false)}
      />
      <BookingDetail
        open={openBookingDetail}
        bookingId={orderId}
        onClose={() => setOpenBookingDetail(false)}
      />
    </BasePageView>
  );
}

WalletPage.propTypes = {
  wallet: PropTypes.object,
  getWallet: PropTypes.func,
  transactions: PropTypes.object,
  getTransactions: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  wallet: makeSelectWallet(),
  transactions: makeSelectTransactions(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getTransactions: payload => dispatch(getTransactionsRequest(payload)),
    getWallet: payload => dispatch(getWalletRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(WalletPage);
