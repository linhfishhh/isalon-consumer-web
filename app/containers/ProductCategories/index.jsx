/**
 *
 * ProductCategories
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import { useBreakpointValues } from 'utils/hooks';
import { gotoSearchResultPage } from 'utils/searchHelper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import styles from 'assets/styles';

import Slideshow from 'components/Slideshow';
import Img from 'components/Img';

import ProductSearch from 'containers/ProductSearch';
import {
  getFeaturedBrandsRequest,
  getSpotlightsRequest,
} from 'containers/ProductHomePage/actions';
import {
  makeSelectFeaturedBrands,
  makeSelectSpotlights,
} from 'containers/ProductHomePage/selectors';
import { CONTEXT as HOME_CONTEXT } from 'containers/ProductHomePage/constants';
import homeReducer from 'containers/ProductHomePage/reducer';
import homeSaga from 'containers/ProductHomePage/saga';
import { CONTEXT as SEARCH_CONTEXT } from 'containers/ProductSearch/constants';
import searchSaga from 'containers/ProductSearch/saga';
import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  root: {
    height: isMobileOnly ? 72 : 140,
    backgroundColor: '#f2f2f2',
  },
  searchWrapper: {
    backgroundColor: theme.palette.primary.main,
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      '#9E1F63',
    )}, 1) 0%, rgba(${theme.hexToRgb('#D91C5C')}, 1) 100%)`,
  },
  carousel: {},
  textField: {
    margin: 0,
    width: 500,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {},
  searchButton: {
    width: 100,
    height: 40,
    borderRadius: 20,
  },
  categoriesTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  categoryCover: {
    width: 46,
    height: 46,
    borderRadius: 23,
    overflow: 'hidden',
  },
  categoryItem: {
    width: '180px !important',
    backgroundColor: '#fff',
    height: 50,
    borderRadius: 25,
    marginLeft: theme.spacing(3),
    padding: 2,
    cursor: 'pointer',
  },
  categoryName: {
    fontSize: 14,
    marginTop: theme.spacing(4),
    textAlign: 'left',
  },
  categoriesWrapper: {
    marginTop: theme.spacing(8),
  },
  brandName: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: theme.spacing(3),
    display: 'inline',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function ProductCategories(props) {
  useInjectReducer({ key: HOME_CONTEXT, reducer: homeReducer });
  useInjectSaga({ key: HOME_CONTEXT, saga: homeSaga });
  useInjectSaga({ key: SEARCH_CONTEXT, saga: searchSaga });

  const {
    className,
    featuredBrands,
    getFeaturedBrands,
    onSearchKeyword,
    onSearchCategory,
    keyword,
    spotlights,
    getSpotlights,
  } = props;
  const classes = useStyles();
  const globalStyle = styles();
  const history = useHistory();
  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 5 });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (isEmpty(featuredBrands)) {
      getFeaturedBrands();
    }
    if (isEmpty(spotlights)) {
      getSpotlights();
    }
  }, []);

  useEffect(() => {
    if (spotlights) {
      let categoryItem;
      for (let i = 0; i < spotlights.length; i += 1) {
        const s = spotlights[i];
        if (s.type === 'category') {
          categoryItem = s;
          break;
        }
      }

      if (categoryItem) {
        setCategories(get(categoryItem, 'category.subCategories', []));
      }
    }
  }, [spotlights]);

  const onSearchCategoryClicked = cat => {
    if (onSearchCategory) {
      onSearchCategory(cat);
    } else {
      gotoSearchResultPage(history, { categoryIds: [cat.categoryId] });
    }
  };

  const renderItem = React.useCallback(
    item => (
      <button
        key={shortid.generate()}
        className={classes.categoryItem}
        onClick={() => onSearchCategoryClicked(item)}
        type="button"
      >
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={3}>
            <Img
              className={classes.categoryCover}
              src={get(item, 'image.imageLocation')}
            />
          </Grid>
          <Grid item xs={8}>
            <Typography className={classes.categoryName} display="inline">
              {item.name}
            </Typography>
          </Grid>
        </Grid>
      </button>
    ),
    [],
  );

  return (
    <div className={`${classes.root} ${className}`}>
      <div className={classes.searchWrapper}>
        <div className={globalStyle.container}>
          <Grid container className={classes.searchContainer}>
            <Grid item xs>
              <ProductSearch
                onSearchKeyword={onSearchKeyword}
                defaultKeyword={keyword}
              />
            </Grid>
          </Grid>
        </div>
      </div>
      {!isMobileOnly && (
        <div
          className={`${globalStyle.container} ${classes.categoriesWrapper}`}
        >
          <Slideshow
            items={categories}
            variableWidth
            className="slide variable-width"
            slidesToScroll={slidesToScroll}
            renderItem={renderItem}
          />
        </div>
      )}
    </div>
  );
}

ProductCategories.propTypes = {
  featuredBrands: PropTypes.array,
  getFeaturedBrands: PropTypes.func,
  className: PropTypes.string,
  onSearchKeyword: PropTypes.func,
  onSearchCategory: PropTypes.func,
  keyword: PropTypes.string,
  spotlights: PropTypes.array,
  getSpotlights: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  featuredBrands: makeSelectFeaturedBrands(),
  spotlights: makeSelectSpotlights(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getFeaturedBrands: () => dispatch(getFeaturedBrandsRequest()),
    getSpotlights: () => dispatch(getSpotlightsRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductCategories);
