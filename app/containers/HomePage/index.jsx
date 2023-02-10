/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isEmpty from 'lodash/isEmpty';
import take from 'lodash/take';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';

import styles from 'assets/styles';

import { isMobileOnly, isNative } from 'utils/platform';
import { TABBAR_BOTTOM_HEIGHT } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { useAuthentication, useAffiliate, usePopup } from 'utils/hooks';
import { setAffiliateToken } from 'utils/localStorage/affiliate';
import { isAuthenticated } from 'utils/auth';

import RecentSearch from 'containers/BookingHomePage/views/RecentSearch';
import BgGradientMobile from 'components/BgGradientMobile';
import ProductBestSelling from 'containers/ProductBestSelling';
import BasePageView from 'components/BasePageView';
import DocumentHead from 'components/DocumentHead';

import { Header, FeatureBar, Endow, Brand, NewPosts, Search } from './views';

import {
  makeSelectFetched,
  makeSelectBanners,
  makeSelectTopDeals,
  makeSelectTopBrands,
  makeSelectLatestPosts,
  makeSelectSearchHistories,
} from './selectors';
import {
  getBannersRequest,
  getTopDealsRequest,
  getTopBrandsRequest,
  getLatestBLogsRequest,
  getSearchHistoryRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import { CONTEXT } from './constants';
import TopSalons from '../TopSalons';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: isMobileOnly ? 'transparent' : '#fff',
  },
  mainContent: {
    backgroundColor: isMobileOnly
      ? '#eceff3'
      : theme.palette.backgroundColor[1],
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(6, 0),
  },
}));

export function HomePage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  const globalStyle = styles();
  const classes = useStyle();
  const { showAffiliateDialog, affiliateSettings } = useAffiliate();
  const { showPopup } = usePopup();
  const { authenticated } = useAuthentication();

  const {
    location,
    fetched,
    banners,
    getBanners,
    topDeals,
    getTopDeals,
    topBrands,
    getTopBrands,
    latestBlogs,
    getLatestBLogs,
    searchHistories,
    getSearchHistory,
  } = props;

  const fetchData = () => {
    getBanners();
    getTopDeals();
    getTopBrands();
    getLatestBLogs();
  };

  useEffect(() => {
    if (authenticated) {
      getSearchHistory();
    }
  }, [authenticated]);

  useEffect(() => {
    if (!fetched || !isMobileOnly) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (!isEmpty(affiliateSettings)) {
      if (affiliateSettings.affiliateEnabled) {
        const { at } = queryString.parse(location.search);
        if (at && !isAuthenticated()) {
          setAffiliateToken(at);
          showAffiliateDialog();
        } else {
          showPopup();
        }
      } else {
        showPopup();
      }
    }
  }, [affiliateSettings]);

  const searchView = useMemo(() => <Search banners={banners} />, [banners]);
  const endowView = useMemo(() => <Endow data={topDeals} />, [topDeals]);
  const brandView = useMemo(() => <Brand data={topBrands} />, [topBrands]);
  const newPostsView = useMemo(() => <NewPosts latestBlogs={latestBlogs} />, [
    latestBlogs,
  ]);

  const viewAllStyle = useMemo(
    () =>
      isMobileOnly
        ? {
            backgroundColor: '#fff',
          }
        : {},
    [],
  );

  const recentSearchHistories = React.useMemo(() => take(searchHistories, 15), [
    searchHistories,
  ]);

  return (
    <BasePageView
      contentProps={{
        onRefresh: fetchData,
        paddingBottom: TABBAR_BOTTOM_HEIGHT,
      }}
      header={<Header />}
      slotFixed={<BgGradientMobile isMobile isBooking />}
    >
      <DocumentHead />
      <div className={classes.wrapper}>
        {searchView}
        <div className={classes.mainContent}>
          <div className={globalStyle.container}>
            {!isNative && <FeatureBar />}
            {authenticated && !isEmpty(recentSearchHistories) && (
              <RecentSearch data={recentSearchHistories} />
            )}
            {endowView}
            <TopSalons type="near_me" viewAllStyle={viewAllStyle} />
            <TopSalons type="top_ten" viewAllStyle={viewAllStyle} />
            <ProductBestSelling />
            {brandView}
            {newPostsView}
          </div>
        </div>
      </div>
    </BasePageView>
  );
}

HomePage.propTypes = {
  location: PropTypes.any,
  fetched: PropTypes.bool,
  banners: PropTypes.array,
  getBanners: PropTypes.func,
  topDeals: PropTypes.array,
  getTopDeals: PropTypes.func,
  topBrands: PropTypes.array,
  getTopBrands: PropTypes.func,
  latestBlogs: PropTypes.array,
  getLatestBLogs: PropTypes.func,
  searchHistories: PropTypes.array,
  getSearchHistory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fetched: makeSelectFetched(),
  banners: makeSelectBanners(),
  topDeals: makeSelectTopDeals(),
  topBrands: makeSelectTopBrands(),
  latestBlogs: makeSelectLatestPosts(),
  searchHistories: makeSelectSearchHistories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBanners: () => dispatch(getBannersRequest()),
    getTopDeals: () => dispatch(getTopDealsRequest()),
    getTopBrands: () => dispatch(getTopBrandsRequest()),
    getLatestBLogs: () => dispatch(getLatestBLogsRequest()),
    getSearchHistory: () => dispatch(getSearchHistoryRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
