/**
 *
 * ProductSearchResult
 *
 */

import React, { memo, useCallback, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import get from 'lodash/get';
import set from 'lodash/set';
import filter from 'lodash/filter';
import find from 'lodash/find';
import unset from 'lodash/unset';
import keys from 'lodash/keys';
import isArray from 'lodash/isArray';
import join from 'lodash/join';
import isEqual from 'lodash/isEqual';
// import sortedUniq from 'lodash/sortedUniq';
import queryString from 'query-string';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import history from 'utils/history';
import { path } from 'routers/path';
import { convertToQueryString } from 'utils/stringFormat';
import { DEFAULT_PAGE_SIZE, SortTypes } from 'utils/constants';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import ProductCategories from 'containers/ProductCategories';

import styles from 'assets/styles';
import { HomeIcon } from 'assets/svgIcon';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import reducer from './reducer';
import saga from './saga';
import { CONTEXT } from './constants';
import useStyles from './styles';
import FilterView from './views/FilterView';
import SortView from './views/SortView';
import ResultView from './views/ResultView';
import { fetchSearchResultRequest, clearSearchResultRequest } from './actions';
import { makeSelectSearchResult } from './selectors';

function parseSearchQueryToOptions(search) {
  let ret = {};
  if (search) {
    const params = queryString.parse(search);
    const {
      categoryIds,
      brandIds,
      productTagIds,
      variantValueIds,
      startPrice,
      endPrice,
      rate,
      viewType,
      page,
      limit,
      ...rest
    } = params;
    if (categoryIds) {
      const ids = categoryIds.split(',').map(item => parseInt(item, 10));
      set(ret, 'categoryIds', ids);
    }
    if (brandIds) {
      const ids = brandIds.split(',').map(item => parseInt(item, 10));
      set(ret, 'brandIds', ids);
    }
    if (productTagIds) {
      const ids = productTagIds.split(',').map(item => parseInt(item, 10));
      set(ret, 'productTagIds', ids);
    }
    if (variantValueIds) {
      const ids = variantValueIds.split(',').map(item => parseInt(item, 10));
      set(ret, 'variantValueIds', ids);
    }
    if (startPrice) {
      set(ret, 'startPrice', parseFloat(startPrice));
    }
    if (endPrice) {
      set(ret, 'endPrice', parseFloat(endPrice));
    }
    if (rate) {
      set(ret, 'rate', parseInt(rate, 10));
    }
    if (page) {
      set(ret, 'page', parseInt(page, 10));
    } else {
      set(ret, 'page', 0);
    }
    if (limit) {
      set(ret, 'limit', parseInt(limit, 10));
    } else {
      set(ret, 'limit', DEFAULT_PAGE_SIZE);
    }
    set(ret, 'viewType', get(params, 'viewType', 'grid'));

    // keyword, sortType, sortDirection, findType, flashSaleId
    ret = { ...ret, ...rest };
  }
  return ret;
}

function parseOptionsToParams(options) {
  const allKeys = keys(options);
  const ret = {};
  for (let i = 0; i < allKeys.length; i += 1) {
    const key = allKeys[i];
    const p = get(options, key);
    if (isArray(p)) {
      set(ret, key, join(p, ','));
    } else {
      set(ret, key, p);
    }
  }
  if (ret.startPrice) {
    ret['priceFilter.startPrice'] = ret.startPrice;
  }
  if (ret.endPrice) {
    ret['priceFilter.endPrice'] = ret.endPrice;
  }
  return ret;
}

function getFilterParams(opts) {
  const {
    categoryIds,
    brandIds,
    productTagIds,
    variantValueIds,
    startPrice,
    endPrice,
    rate,
  } = opts;
  const ret = {};
  if (categoryIds) set(ret, 'categoryIds', categoryIds);
  if (brandIds) set(ret, 'brandIds', brandIds);
  if (productTagIds) set(ret, 'productTagIds', productTagIds);
  if (variantValueIds) set(ret, 'variantValueIds', variantValueIds);
  if (startPrice) set(ret, 'startPrice', startPrice);
  if (endPrice) set(ret, 'endPrice', endPrice);
  if (rate) set(ret, 'rate', rate);
  return ret;
}

function getSortParams(opts) {
  const { sortType, sortDirection } = opts;
  let ret = SortTypes[0];
  if (sortType) {
    const matchOptions = filter(SortTypes, t => t.sortType === sortType);
    if (matchOptions && matchOptions.length > 0) {
      [ret] = matchOptions;
    }
    if (sortDirection) {
      const f = find(matchOptions, o => o.sortDirection === sortDirection);
      if (f) {
        ret = f;
      }
    }
  }
  return ret;
}

function ProductSearchResult(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalStyle = styles();

  const { location, searchResult, findProducts, clearSearchResult } = props;

  const defaultOptions = useMemo(
    () => parseSearchQueryToOptions(location.search),
    [],
  );

  const defaultFilterParams = useMemo(() => getFilterParams(defaultOptions), [
    defaultOptions,
  ]);

  const defaultSortParams = useMemo(() => getSortParams(defaultOptions), [
    defaultOptions,
  ]);

  const openFilterRef = React.useRef(false);
  const [openFilter, setOpenFilter] = useState(openFilterRef.current);
  const [filterOptions, setFilterOptions] = useState(defaultFilterParams);
  const [sortOptions, setSortOptions] = useState(defaultSortParams);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState(get(defaultOptions, 'keyword'));

  const [viewType, setViewType] = useState(
    get(defaultOptions, 'viewType', 'grid'),
  );

  const onFilterOptionsChange = useCallback(options => {
    setFilterOptions(options);
    setPage(0);
  }, []);

  const onSortTypeChange = useCallback(sortOption => {
    setSortOptions(sortOption);
    setPage(0);
  }, []);

  const onViewTypeChange = React.useCallback(t => {
    setViewType(t);
  }, []);

  useEffect(() => {
    const cloneFilterOptions = { ...filterOptions };
    unset(cloneFilterOptions, 'sortType');
    unset(cloneFilterOptions, 'sortDirection');
    unset(cloneFilterOptions, 'keyword');
    const cloneSortOptions = { ...sortOptions };
    unset(cloneSortOptions, 'id');
    const options = {
      ...defaultOptions,
      ...cloneFilterOptions,
      ...cloneSortOptions,
      page,
      limit: DEFAULT_PAGE_SIZE,
      viewType,
    };
    if (keyword) {
      set(options, 'keyword', keyword);
    } else {
      unset(options, 'keyword');
    }
    unset(options, 'value');
    const historyOptions = parseSearchQueryToOptions(location.search);
    if (!isEqual(historyOptions, options)) {
      history.push(path.productSearch + convertToQueryString(options), {
        keepScrollLocation: true,
      });
    }
  }, [keyword, filterOptions, sortOptions, page, viewType]);

  useEffect(() => {
    const options = parseSearchQueryToOptions(location.search);
    const fps = getFilterParams(options);
    if (!isEqual(fps, filterOptions)) {
      setFilterOptions(fps);
    }
    const sps = getSortParams(options);
    if (!isEqual(sps, sortOptions)) {
      setSortOptions(sps);
    }
    const k = get(options, 'keyword');
    setKeyword(k);

    if (!options.page) {
      set(options, 'page', page);
    }
    if (!options.limit) {
      set(options, 'limit', DEFAULT_PAGE_SIZE);
    }
    const params = parseOptionsToParams(options);
    findProducts(params);
  }, [history.location]);

  useEffect(
    () => () => {
      clearSearchResult();
    },
    [],
  );

  const onChangePage = React.useCallback((evt, p) => {
    setPage(p - 1);
  }, []);

  const onSearchKeyword = React.useCallback(
    text => {
      setKeyword(text);
    },
    [history.location],
  );

  const onSearchCategory = React.useCallback(
    cat => {
      const fos = { ...filterOptions, page: 0 };
      set(fos, 'categoryIds', [cat.categoryId]);
      setFilterOptions(fos);
    },
    [history.location],
  );

  const onSearchBrand = React.useCallback(
    brand => {
      const fos = { ...filterOptions, page: 0 };
      set(fos, 'brandIds', [brand.brandId]);
      setFilterOptions(fos);
    },
    [history.location],
  );

  const totalElements = get(searchResult, 'totalElements', 0);

  const handleShowHideFilter = React.useCallback(() => {
    openFilterRef.current = !openFilterRef.current;
    setOpenFilter(openFilterRef.current);
  }, []);

  const onCloseFilterDrawer = React.useCallback(() => {
    setOpenFilter(false);
    openFilterRef.current = false;
  }, []);

  const goToHomePage = useCallback(() => {
    history.push(path.productHome);
  }, []);

  const rightButtons = useMemo(
    () => [
      <IconButton
        size="medium"
        color="inherit"
        onClick={goToHomePage}
        key="goToHome"
      >
        <HomeIcon color="#fff" />
      </IconButton>,
    ],
    [],
  );

  return (
    <BasePageView header={<Navigation rightButtons={rightButtons} />}>
      <DocumentHead title="Tìm kiếm sản phẩm" description="Kết quả tìm kiếm" />
      <ProductCategories
        onSearchKeyword={onSearchKeyword}
        onSearchCategory={onSearchCategory}
        onSearchBrand={onSearchBrand}
        keyword={keyword}
      />
      <div className={classes.mainContent}>
        <div className={globalStyle.container}>
          <Grid container>
            <Hidden smDown>
              <Grid item>
                <FilterView
                  onChange={onFilterOptionsChange}
                  selectedFilterOptions={filterOptions}
                />
              </Grid>
            </Hidden>
            <Hidden mdUp>
              <Drawer open={openFilter} onClose={onCloseFilterDrawer}>
                <FilterView
                  onChange={onFilterOptionsChange}
                  selectedFilterOptions={filterOptions}
                />
              </Drawer>
            </Hidden>
            <Grid item xs>
              <Grid container direction="column">
                <Grid item>
                  <SortView
                    onChange={onSortTypeChange}
                    onViewTypeChange={onViewTypeChange}
                    totalElements={totalElements}
                    sortOptions={sortOptions}
                    viewType={viewType}
                    keyword={keyword}
                    onShowHideFilter={handleShowHideFilter}
                  />
                </Grid>
                <Grid item>
                  <ResultView
                    data={searchResult}
                    onChangePage={onChangePage}
                    viewType={viewType}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </BasePageView>
  );
}

ProductSearchResult.propTypes = {
  location: PropTypes.any,
  findProducts: PropTypes.func,
  searchResult: PropTypes.object,
  clearSearchResult: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  searchResult: makeSelectSearchResult(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    findProducts: params => dispatch(fetchSearchResultRequest(params)),
    clearSearchResult: () => dispatch(clearSearchResultRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductSearchResult);
