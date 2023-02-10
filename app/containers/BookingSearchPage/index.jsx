/**
 *
 * BookingSearchPage
 *
 */

import React, { memo, useEffect, useState, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import isNumber from 'lodash/isNumber';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useHistory, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';

import styles from 'assets/styles';
import { path } from 'routers/path';

import { isMobileOnly, isNative } from 'utils/platform';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectLoading } from 'utils/injectLoading';
import {
  queryStringToFilter,
  filterToParams,
  filterToQueryString,
  defaultFilters,
} from 'utils/searchHelper';
import {
  useAuthentication,
  useCurrentLocation,
  useSearchConfig,
} from 'utils/hooks';
import { unitSearch } from 'utils/enums';

import SalonServiceDetail from 'containers/SalonServiceDetail';
import BasePageView from 'components/BasePageView';
import DocumentHead from 'components/DocumentHead';

import {
  Header,
  SearchResult,
  SearchView,
  FilterView,
  SearchResultMap,
  SearchResultHeader,
} from './views';

import {
  searchRequest,
  getDistrictRequest,
  addSearchHistoryRequest,
  cleanDataResultAction,
  cleanDataAction,
} from './actions';
import {
  makeSelectLoading,
  makeSelectBookingSearchResult,
  makeSelectBookingDistricts,
} from './selectors';
import { CONTEXT, SEARCH } from './constants';
import reducer from './reducer';
import saga from './saga';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: isMobileOnly ? '#fff' : '#f4f7f9',
    paddingTop: isMobileOnly ? 0 : theme.spacing(8),
    paddingBottom: isMobileOnly ? 0 : theme.spacing(8),
  },
  leftColumn: {
    backgroundColor: theme.palette.background.paper,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(4),
  },
  rightColumn: {},
}));

export function BookingSearchPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading([SEARCH]);

  const {
    loading,
    searchSalon,
    searchResult,
    districts,
    getDistricts,
    addSearchHistory,
    cleanDataResult,
    cleanData,
  } = props;

  const globalStyle = styles();
  const classes = useStyle();
  const history = useHistory();
  const location = useLocation();
  const { authenticated } = useAuthentication();
  const { searchConfig } = useSearchConfig();
  const { provinces } = useCurrentLocation();
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState();
  const [provinceId, setProvinceId] = useState();
  const [serviceId, setServiceId] = useState();
  const [openSearchMap, setOpenSearchMap] = useState({
    open: false,
    activeIndex: 0,
  });

  const unitSearchProvince = unitSearch.isProvince(
    filter && filter.unit ? filter.unit.value : false,
  );

  const HeadMeta = useMemo(
    () => <DocumentHead title="Tìm kiếm salon" description="Tìm kiếm salon" />,
    [],
  );

  const handerChangeFilter = useCallback(
    newFilter => {
      if (isNative) {
        history.replace(
          `${path.bookingSearch +
            filterToQueryString(newFilter)}&scrollTop=keep`,
        );
      } else {
        history.replace(path.bookingSearch + filterToQueryString(newFilter), {
          keepScrollLocation: true,
        });
      }
    },
    [history],
  );

  const handleLoadMore = useCallback(() => {
    const page = searchResult.page + 1;
    const newFilter = { ...filter, page };
    handerChangeFilter(newFilter);
  }, [searchResult, filter]);

  const handleShowMap = useCallback(index => {
    setOpenSearchMap({ open: true, activeIndex: isNumber(index) ? index : 0 });
  }, []);

  const handleShowServiceDetail = useCallback(service => {
    setServiceId(service.id);
  }, []);

  const fetchDistricts = useCallback(() => {
    if (filter) {
      const [province] = filter.provinces;
      if (
        province &&
        province.provinceId !== provinceId &&
        unitSearchProvince
      ) {
        setProvinceId(province.provinceId);
        getDistricts({ provinceId: province.provinceId });
      }
    }
  }, [filter]);

  const handerOnSearch = useCallback(newSearch => {
    const newFilter = { ...defaultFilters, ...newSearch };
    handerChangeFilter(newFilter);
  }, []);

  const onShowSalonDetail = useCallback(
    salonId => {
      if (authenticated) {
        addSearchHistory({ salon_id: salonId });
      }
    },
    [authenticated],
  );

  const showFilterView = useCallback(() => {
    setOpenFilter(true);
  }, []);

  const hideFilterView = useCallback(() => {
    setOpenFilter(false);
  }, []);

  const closedServiceDetail = useCallback(() => {
    setServiceId();
  }, []);

  const closeMapView = useCallback(() => {
    setOpenSearchMap({ open: false, activeIndex: 0 });
  }, []);

  useEffect(() => {
    fetchDistricts();
    return () => {
      cleanData();
    };
  }, []);

  useEffect(() => {
    if (filter) {
      const params = filterToParams(filter);
      searchSalon({
        filter: params,
      });
      fetchDistricts();
      if (filter.page === 1) {
        cleanDataResult();
      }
    }
  }, [filter]);

  useEffect(() => {
    const newFilter = queryStringToFilter(location.search);
    setFilter(newFilter);
  }, [location]);

  const header = useMemo(() => <Header onSearch={handerOnSearch} />, []);

  return (
    <BasePageView
      contentProps={{
        onLoadMore: handleLoadMore,
        dataLength: searchResult.items.length,
        hasMore: !searchResult.is_last_page,
      }}
      header={header}
    >
      {!isMobileOnly && (
        <SearchView onShowMap={handleShowMap} onSearch={handerOnSearch} />
      )}
      {HeadMeta}
      <div className={classes.wrapper}>
        <div className={globalStyle.container}>
          <Grid container alignItems="flex-start">
            <Hidden smDown>
              <Grid item className={classes.leftColumn}>
                <FilterView
                  filter={filter}
                  services={searchConfig.cats}
                  provinces={provinces}
                  districts={districts}
                  showDistrict={unitSearchProvince}
                  onChangeFilter={handerChangeFilter}
                />
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Drawer open={openFilter} onClose={hideFilterView}>
                <FilterView
                  filter={filter}
                  services={searchConfig.cats}
                  provinces={provinces}
                  districts={districts}
                  showDistrict={unitSearchProvince}
                  onChangeFilter={handerChangeFilter}
                />
              </Drawer>
            </Hidden>
            <Grid item xs zeroMinWidth className={classes.rightColumn}>
              <SearchResultHeader
                filter={filter}
                total={searchResult.total}
                onShowFilter={showFilterView}
                onChangeFilter={handerChangeFilter}
                onShowMap={handleShowMap}
              />
              <SearchResult
                loading={loading}
                searchResult={searchResult}
                onLoadMore={handleLoadMore}
                onShowMap={handleShowMap}
                onShowServiceDetail={handleShowServiceDetail}
                onShowSalonDetail={onShowSalonDetail}
              />
            </Grid>
          </Grid>
          <SalonServiceDetail
            bookingNow
            serviceId={serviceId}
            onClosed={closedServiceDetail}
          />
          <SearchResultMap
            open={openSearchMap.open}
            activeIndex={openSearchMap.activeIndex}
            onClose={closeMapView}
            searchResult={searchResult}
            onLoadMore={handleLoadMore}
            settings={searchConfig.settings}
          />
        </div>
      </div>
    </BasePageView>
  );
}

BookingSearchPage.propTypes = {
  loading: PropTypes.bool,
  districts: PropTypes.array,
  getDistricts: PropTypes.func,
  searchResult: PropTypes.object,
  searchSalon: PropTypes.func,
  addSearchHistory: PropTypes.func,
  cleanDataResult: PropTypes.func,
  cleanData: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  searchResult: makeSelectBookingSearchResult(),
  districts: makeSelectBookingDistricts(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    searchSalon: payload => dispatch(searchRequest(payload)),
    getDistricts: payload => dispatch(getDistrictRequest(payload)),
    addSearchHistory: params => dispatch(addSearchHistoryRequest(params)),
    cleanDataResult: () => dispatch(cleanDataResultAction()),
    cleanData: () => dispatch(cleanDataAction()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BookingSearchPage);
