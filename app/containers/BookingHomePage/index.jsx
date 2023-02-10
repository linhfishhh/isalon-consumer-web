/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import take from 'lodash/take';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';

import styles from 'assets/styles';
import TopSalons from 'containers/TopSalons';
import CustomSalons from 'containers/CustomSalons';
import BasePageView from 'components/BasePageView';
import SalonList from 'components/SalonList';
import DocumentHead from 'components/DocumentHead';
import HomeSearch from 'containers/HomeSearch';
import AreaSafe from 'components/AreaSafe';

import { path } from 'routers/path';
import { TABBAR_BOTTOM_HEIGHT } from 'utils/constants';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  useAuthentication,
  useCurrentLocation,
  useSearchConfig,
} from 'utils/hooks';
import { viewTypes, unitSearch } from 'utils/enums';
import { filterToQueryString } from 'utils/searchHelper';
import { RecentSearch, CategoryService, TopCity, Search } from './views';

import {
  makeSelectFetched,
  makeSelectBanners,
  makeSelectSalonsNew,
  makeSelectTopCities,
  makeSelectSearchHistories,
} from './selectors';
import {
  getBannersRequest,
  getSalonsNewRequest,
  getTopCitiesRequest,
  getSearchHistoryRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import { CONTEXT } from './constants';

const useStyle = makeStyles(theme => ({
  mainContent: {
    backgroundColor: theme.palette.backgroundColor[0],
    paddingBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(6),
  },
  searchBox: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(3, 4),
  },
  areaSafe: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export function BookingHomePage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  const { authenticated } = useAuthentication();
  const history = useHistory();

  const {
    fetched,
    salonsNew,
    getSalonsNew,
    topCities,
    getTopCities,
    banners,
    getBanners,
    searchHistories,
    getSearchHistory,
  } = props;

  const { currentLocation } = useCurrentLocation();
  const { searchConfig } = useSearchConfig();
  const { province } = currentLocation;
  const serviceCategories = useMemo(() => searchConfig.cats, [searchConfig]);

  const fetchData = useCallback(() => {
    getSalonsNew(province.provinceId);
    getTopCities();
    getBanners();
    if (authenticated) {
      getSearchHistory();
    }
  }, [authenticated, province]);

  useEffect(() => {
    fetchData();
  }, [authenticated]);

  useEffect(() => {
    if (!fetched || !isMobileOnly) {
      fetchData();
    }
  }, []);

  const globalStyle = styles();
  const classes = useStyle();

  const handleViewAll = React.useCallback(() => {
    const params = {
      unit: unitSearch.types[0],
      viewType: viewTypes.types[1],
    };
    history.push(path.bookingSearch + filterToQueryString(params), {
      animated: false,
    });
  }, []);

  const header = React.useMemo(
    () => (
      <>
        <AreaSafe className={classes.areaSafe} />
        <div className={classes.searchBox}>
          <HomeSearch bookingSearch />
        </div>
      </>
    ),
    [],
  );

  const contentProps = React.useMemo(
    () => ({
      onRefresh: fetchData,
      paddingBottom: TABBAR_BOTTOM_HEIGHT,
    }),
    [fetchData],
  );

  const recentSearchHistories = React.useMemo(() => take(searchHistories, 15), [
    searchHistories,
  ]);

  const childContent = React.useMemo(
    () => (
      <>
        <DocumentHead />
        <Search banners={banners} />
        <div className={classes.mainContent}>
          <div className={globalStyle.container}>
            <CategoryService categories={serviceCategories} />
            {authenticated && !isEmpty(recentSearchHistories) && (
              <RecentSearch data={recentSearchHistories} />
            )}
            <TopSalons type="near_me" />
            <CustomSalons />
            <SalonList
              title="SALON MỚI"
              data={salonsNew}
              onViewAll={handleViewAll}
            />
            <TopCity data={topCities} />
            <TopSalons type="top_ten" />
          </div>
        </div>
      </>
    ),
    [
      serviceCategories,
      recentSearchHistories,
      topCities,
      banners,
      authenticated,
      salonsNew,
      handleViewAll,
    ],
  );

  return (
    <BasePageView contentProps={contentProps} header={header}>
      {childContent}
    </BasePageView>
  );
}

BookingHomePage.propTypes = {
  fetched: PropTypes.bool,
  salonsNew: PropTypes.array,
  getSalonsNew: PropTypes.func,
  getTopCities: PropTypes.func,
  topCities: PropTypes.array,
  banners: PropTypes.array,
  getBanners: PropTypes.func,
  searchHistories: PropTypes.array,
  getSearchHistory: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fetched: makeSelectFetched(),
  banners: makeSelectBanners(),
  salonsNew: makeSelectSalonsNew(),
  topCities: makeSelectTopCities(),
  searchHistories: makeSelectSearchHistories(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getBanners: () => dispatch(getBannersRequest()),
    getSalonsNew: provinceId => dispatch(getSalonsNewRequest({ provinceId })),
    getTopCities: () => dispatch(getTopCitiesRequest()),
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
)(BookingHomePage);
