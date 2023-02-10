/**
 *
 * ProductBestSelling
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

import { getProductListRequest } from './actions';
import { CONTEXT } from './constants';
import { makeSelectProductList } from './selectors';
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
    padding: isMobileOnly ? theme.spacing(0.5, 3) : theme.spacing(1, 3),
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

export function ProductBestSelling(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const { productList, getProductList } = props;
  const classes = useStyle();
  const history = useHistory();

  useEffect(() => {
    if (productList.length === 0) {
      getProductList();
    }
  }, []);

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const renderItem = React.useCallback(
    item => (
      <div key={shortid.generate()} className={classes.item}>
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
      gotoSearchResultPage(history, {
        sortType: 'HOT_ORDER',
        sortDirection: 'DESC',
      });
    };
    return (
      <Button className={classes.viewAll} onClick={onViewAll}>
        Tất cả
      </Button>
    );
  }, []);

  const placeholders = React.useMemo(
    () => [...Array(isMobileOnly ? 3 : 5)],
    [],
  );

  return (
    <BlockContent
      className={classes.wrapper}
      title="SẢN PHẨM BÁN CHẠY"
      endAdornmentTitle={viewAllComp}
    >
      {isMobileOnly ? (
        <CollectionView
          items={
            productList && productList.length > 0 ? productList : placeholders
          }
          renderItem={renderItem}
          cellWidth={125}
          cellHeight={320}
          height={340}
          spacing={8}
        />
      ) : (
        <Slideshow
          items={
            productList && productList.length > 0 ? productList : placeholders
          }
          variableWidth
          className="slide variable-width"
          slidesToScroll={slidesToScroll}
          renderItem={renderItem}
        />
      )}
    </BlockContent>
  );
}

ProductBestSelling.propTypes = {
  productList: PropTypes.array,
  getProductList: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productList: makeSelectProductList(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductList: () => dispatch(getProductListRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductBestSelling);
