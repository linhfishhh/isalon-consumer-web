/**
 *
 * BookingHistoryPage
 *
 */

import React, { memo, useState, useEffect, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { format } from 'date-fns';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import BookingHistoryDetailPage from 'containers/BookingHistoryDetailPage';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import Tabs from 'components/Tabs';
import DocumentHead from 'components/DocumentHead';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { bookingStatus } from 'utils/enums';
import { useQueryString } from 'utils/hooks';

import CancelBooking from 'components/CancelBooking';

import {
  makeSelectBookingHistory,
  makeSelectShowBookingLoading,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import { getBookingHistoryRequest, cancelBookingOrderRequest } from './actions';

import HistoryBrowser from './views/HistoryBrowser';
import HistoryMobile from './views/HistoryMobile';

const transactionTypes = bookingStatus.types;

function BookingHistoryPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [currentTransactionType, setCurrentTransactionType] = useState(
    transactionTypes[0],
  );
  const [bookingOrder, setBookingOrder] = useState();
  const [openBookingDetail, setOpenBookingDetail] = useState(false);
  const [openCancelBooking, setOpenCancelBooking] = useState(false);

  const {
    loading,
    bookingHistory,
    getBookingHistory,
    cancelBookingOrder,
  } = props;

  const { isLast } = bookingHistory;

  const { queryString } = useQueryString();

  useEffect(() => {
    if (!isEmpty(queryString)) {
      const { id } = queryString;
      if (!isEmpty(id)) {
        setOpenBookingDetail(true);
      }
      setBookingOrder(queryString);
    }
  }, [queryString]);

  useEffect(() => {
    getBookingHistory(getSearchOptions());
  }, [currentPage]);

  const onLoadMore = useCallback(() => {
    setCurrentPage(currentPage + 1);
  }, [currentPage]);

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const didSelectTransactionType = (event, type) => {
    if (type) {
      setCurrentTransactionType(type);
    }
  };

  const getSearchOptions = () => {
    const options = { page: currentPage };
    if (selectedStartDate) {
      options.start_date = format(selectedStartDate, 'yyyy-MM-dd');
    }
    if (selectedEndDate) {
      options.end_date = format(selectedEndDate, 'yyyy-MM-dd');
    }
    if (currentTransactionType) {
      options.status = currentTransactionType.status;
    }
    return options;
  };

  const onSearch = () => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getBookingHistory(getSearchOptions());
    }
  };

  const onShowBookingHistoryDetail = useCallback(data => {
    setBookingOrder(data);
    setOpenBookingDetail(true);
  }, []);

  const onCloseBookingHistoryDetail = useCallback(() => {
    setBookingOrder();
    setOpenBookingDetail(false);
  }, []);

  const onChangeBookingStatus = type => {
    setCurrentTransactionType(type);
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      getBookingHistory({ page: 1, status: type.status });
    }
  };

  const showCancelBookingOrder = useCallback(data => {
    setBookingOrder(data);
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
    <BasePageView
      header={
        <>
          <Navigation title="Lịch sử đặt chỗ" color="primary" />
          <Tabs
            items={transactionTypes}
            renderLabel={item => item.name}
            onChanged={onChangeBookingStatus}
          />
        </>
      }
      contentProps={{
        onLoadMore,
        dataLength: bookingHistory.items.length,
        hasMore: !isLast,
        cornerRadiusColor: 'primary',
      }}
    >
      <DocumentHead title="Lịch sử đặt chỗ" description="Lịch sử đặt chỗ" />

      {isMobileOnly ? (
        <HistoryMobile
          loading={loading}
          items={bookingHistory.items}
          onShowBookingDetail={onShowBookingHistoryDetail}
        />
      ) : (
        <HistoryBrowser
          transactionTypes={transactionTypes}
          bookingHistory={bookingHistory}
          onShowBookingHistoryDetail={onShowBookingHistoryDetail}
          selectedStartDate={selectedStartDate}
          setSelectedStartDate={handleStartDateChange}
          selectedEndDate={selectedEndDate}
          setSelectedEndDate={handleEndDateChange}
          currentTransactionType={currentTransactionType}
          setCurrentTransactionType={didSelectTransactionType}
          onLoadMore={onLoadMore}
          onSearch={onSearch}
          onCancelOrder={showCancelBookingOrder}
        />
      )}
      <BookingHistoryDetailPage
        open={openBookingDetail}
        onClose={onCloseBookingHistoryDetail}
        bookingId={get(bookingOrder, 'id')}
      />
      <CancelBooking
        order={bookingOrder}
        open={openCancelBooking}
        onClose={onCloseCancelBooking}
        onConfirmCancel={onCancelOrder}
      />
    </BasePageView>
  );
}

BookingHistoryPage.propTypes = {
  loading: PropTypes.bool,
  bookingHistory: PropTypes.object,
  getBookingHistory: PropTypes.func,
  cancelBookingOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectShowBookingLoading(),
  bookingHistory: makeSelectBookingHistory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBookingHistory: payload => dispatch(getBookingHistoryRequest(payload)),
    cancelBookingOrder: params => dispatch(cancelBookingOrderRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BookingHistoryPage);
