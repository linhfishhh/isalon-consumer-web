/**
 *
 * CommonProduct
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';

import BlockContent from 'components/BlockContent';
import Slideshow from 'components/Slideshow';
import ProductItem from 'components/ProductItem';
import CollectionView from 'components/CollectionView';
import ProductPlaceHolder from 'components/Placeholder/ProductPlaceHolder';

import { isMobileOnly } from 'utils/platform';
import { useBreakpointValues } from 'utils/hooks';
import { gotoSearchResultPage } from 'utils/searchHelper';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import { getProductForCategoryRequest } from './actions';
import { CONTEXT } from './constants';
import { makeSelectProductsInCategory } from './selectors';
import reducer from './reducer';
import saga from './saga';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: theme.spacing(1.5),
    padding: isMobileOnly ? theme.spacing(2, 0) : theme.spacing(8),
    backgroundColor: isMobileOnly
      ? 'transparent'
      : theme.palette.background.default,
    width: '100%',
  },
  viewAll: {
    color: theme.palette.secondary.main,
    padding: isMobileOnly ? theme.spacing(0.5, 2) : theme.spacing(1, 3),
    backgroundColor: isMobileOnly ? '#fff' : theme.palette.backgroundColor[1],
    borderRadius: 16,
    minWidth: 'auto',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  item: {
    width: isMobileOnly ? 'auto' : '194px !important',
    marginRight: isMobileOnly ? 0 : theme.spacing(4),
  },
}));

function CommonProduct(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const {
    getProductsInCategory,
    productsInCategory,
    category,
    title = '',
  } = props;

  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    if (category) {
      const categoryId = get(category, 'categoryId');
      if (!productsInCategory[categoryId]) {
        getProductsInCategory(categoryId);
      }
    }
  }, [category]);

  const data = get(productsInCategory, `${get(category, 'categoryId')}`, []);

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const renderItem = React.useCallback(
    (item, index) => (
      <div
        key={isEmpty(item) ? index : item.productId}
        className={classes.item}
      >
        {isEmpty(item) ? (
          <ProductPlaceHolder />
        ) : (
          <ProductItem data={item} dense />
        )}
      </div>
    ),
    [],
  );

  const viewAllComp = React.useMemo(() => {
    const onViewAll = () => {
      if (category) {
        gotoSearchResultPage(history, { categoryIds: [category.categoryId] });
      }
    };
    return (
      <button className={classes.viewAll} onClick={onViewAll} type="button">
        Tất cả
      </button>
    );
  }, [category]);

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  return (
    <BlockContent
      className={classes.wrapper}
      title={title}
      endAdornmentTitle={viewAllComp}
    >
      {isMobileOnly ? (
        <CollectionView
          items={data && data.length > 0 ? data : placeholders}
          renderItem={renderItem}
          cellWidth={125}
          cellHeight={320}
          height={340}
          spacing={8}
        />
      ) : (
        <Slideshow
          items={data && data.length > 0 ? data : placeholders}
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

CommonProduct.propTypes = {
  category: PropTypes.object,
  title: PropTypes.string,
  getProductsInCategory: PropTypes.func,
  productsInCategory: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  productsInCategory: makeSelectProductsInCategory(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductsInCategory: catId =>
      dispatch(getProductForCategoryRequest({ categoryId: catId })),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CommonProduct);
