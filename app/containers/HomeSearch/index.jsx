/**
 *
 * HomeSearch
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { path } from 'routers/path';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { gotoSearchResultPage, filterToQueryString } from 'utils/searchHelper';
import { useSearchConfig } from 'utils/hooks';

import { SearchTab, BookingSearch } from './views';

import { getSearchHintsRequest } from './actions';
import { makeSelectSearchHints, makeSelectHintLoadding } from './selectors';
import { CONTEXT } from './constants';

import reducer from './reducer';
import saga from './saga';

export function HomeSearch(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const history = useHistory();

  const {
    bookingSearch,
    searchHints,
    getSearchHints,
    hintsLoading,
    onSearch,
    enableCollapse,
    hideTitle,
    scrollCollapse,
  } = props;

  const { searchConfig } = useSearchConfig();

  const handleSearch = (params, isBooking = false) => {
    if (onSearch) {
      onSearch(params);
    } else if (isBooking) {
      history.push(path.bookingSearch + filterToQueryString(params));
    } else {
      gotoSearchResultPage(history, params);
    }
  };

  const handleSearchHints = debounce((keyword, province) => {
    getSearchHints({ keyword, province });
  }, 1000);

  return (
    <>
      {bookingSearch && (
        <BookingSearch
          title={hideTitle ? '' : 'Tìm kiếm và đặt lịch làm đẹp'}
          categories={searchConfig.cats}
          searchHints={searchHints}
          onSearch={handleSearch}
          height={hideTitle ? 210 : 315}
          onSearchHints={handleSearchHints}
          hintsLoading={hintsLoading}
          enableCollapse={enableCollapse}
          dense={hideTitle}
          scrollCollapse={scrollCollapse}
        />
      )}
      {!bookingSearch && (
        <SearchTab
          services={searchConfig.cats}
          onSearch={handleSearch}
          searchHints={searchHints}
          onSearchHints={handleSearchHints}
          hintsLoading={hintsLoading}
        />
      )}
    </>
  );
}

HomeSearch.propTypes = {
  bookingSearch: PropTypes.bool,
  hintsLoading: PropTypes.bool,
  searchHints: PropTypes.array,
  getSearchHints: PropTypes.func,
  onSearch: PropTypes.func,
  enableCollapse: PropTypes.bool,
  hideTitle: PropTypes.bool,
  scrollCollapse: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  searchHints: makeSelectSearchHints(),
  hintsLoading: makeSelectHintLoadding(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getSearchHints: payload => dispatch(getSearchHintsRequest(payload)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomeSearch);
