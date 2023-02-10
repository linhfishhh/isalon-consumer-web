/**
 *
 * ShoppingHistoryPage
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
import OrderDetail from 'containers/OrderDetail';
import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import Tabs from 'components/Tabs';
import DocumentHead from 'components/DocumentHead';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { shoppingStatus } from 'utils/enums';
import { useQueryString } from 'utils/hooks';
import { cancelOrderRequest } from 'containers/OrderDetail/actions';
import orderDetailSaga from 'containers/OrderDetail/saga';
import { CONTEXT as ORDER_DETAIL_CONTEXT } from 'containers/OrderDetail/constants';

import { getShoppingHistoryRequest } from './actions';
import { CONTEXT } from './constants';
import {
  makeSelectShoppingHistory,
  makeSelectShoppingHistoryLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import HistoryBrowser from './views/HistoryBrowser';
import HistoryMobile from './views/HistoryMobile';

const transactionTypes = shoppingStatus.tabs;

function ShoppingHistoryPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectSaga({ key: ORDER_DETAIL_CONTEXT, saga: orderDetailSaga });

  const [currentPage, setCurrentPage] = useState(0);
  const [currentTransactionType, setCurrentTransactionType] = useState(
    transactionTypes[0],
  );
  const [openOrderDetail, setOpenOrderDetail] = useState(false);
  const [orderDetail, setOrderDetail] = useState();

  const { queryString } = useQueryString();

  useEffect(() => {
    if (!isEmpty(queryString)) {
      const { id } = queryString;
      if (!isEmpty(id)) {
        setOpenOrderDetail(true);
      }
      setOrderDetail({ orderId: id });
    }
  }, [queryString]);

  const { loading, shoppingHistory, getShoppingHistory, dispatch } = props;

  useEffect(() => {
    getShoppingHistory(getSearchOptions(currentPage, currentTransactionType));
  }, [currentPage, currentTransactionType]);

  const onLoadMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const didSelectTransactionType = (event, type) => {
    if (type) {
      setCurrentTransactionType(type);
    }
  };

  const getSearchOptions = (page, transactionType) => {
    const options = { page };
    if (transactionType && transactionType.orderStatus) {
      options.orderStatus = transactionType.orderStatus;
    }
    return options;
  };

  const onSearch = () => {
    if (currentPage !== 0) {
      setCurrentPage(0);
    } else {
      getShoppingHistory(getSearchOptions(currentPage, currentTransactionType));
    }
  };

  const onShowShoppingHistoryDetail = data => {
    setOrderDetail(data);
    setOpenOrderDetail(true);
  };

  const onCloseOrderDetail = () => {
    setOrderDetail(undefined);
    setOpenOrderDetail(false);
  };

  const onChangeShopingStatus = type => {
    setCurrentTransactionType(type);
    if (currentPage !== 0) {
      setCurrentPage(0);
    } else {
      getShoppingHistory({ page: 0, orderStatus: type.orderStatus });
    }
  };

  const onCancelOrder = useCallback((order, reason) => {
    dispatch(cancelOrderRequest({ orderId: order.orderId, note: reason }));
  }, []);

  return (
    <BasePageView
      header={
        <>
          <Navigation title="Lịch sử mua hàng" color="primary" />
          <Tabs
            items={transactionTypes}
            renderLabel={item => item.name}
            onChanged={onChangeShopingStatus}
          />
        </>
      }
      contentProps={{
        onLoadMore,
        dataLength: shoppingHistory.content.length,
        hasMore: !shoppingHistory.isLast,
        cornerRadiusColor: 'primary',
      }}
    >
      {isMobileOnly ? (
        <HistoryMobile
          loading={loading}
          orderStatus={currentTransactionType.key}
          items={shoppingHistory.content}
          onShowShoppingDetail={onShowShoppingHistoryDetail}
          onCancelOrder={onCancelOrder}
        />
      ) : (
        <>
          <DocumentHead
            title="Lịch sử mua hàng"
            description="Lịch sử mua hàng"
          />
          <HistoryBrowser
            transactionTypes={transactionTypes}
            shoppingHistory={shoppingHistory}
            onShowShoppingHistoryDetail={onShowShoppingHistoryDetail}
            currentTransactionType={currentTransactionType}
            setCurrentTransactionType={didSelectTransactionType}
            onLoadMore={onLoadMore}
            onSearch={onSearch}
          />
        </>
      )}
      <OrderDetail
        open={openOrderDetail}
        orderId={get(orderDetail, 'orderId')}
        onClose={onCloseOrderDetail}
      />
    </BasePageView>
  );
}

ShoppingHistoryPage.propTypes = {
  loading: PropTypes.bool,
  shoppingHistory: PropTypes.object,
  getShoppingHistory: PropTypes.func,
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  shoppingHistory: makeSelectShoppingHistory(),
  loading: makeSelectShoppingHistoryLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getShoppingHistory: payload => dispatch(getShoppingHistoryRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ShoppingHistoryPage);
