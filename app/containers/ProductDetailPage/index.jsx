/**
 *
 * ProductDetailPage
 *
 */

import React, { memo, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get, uniqWith, concat, isEmpty, filter, take } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import shortid from 'shortid';

import styles from 'assets/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  storageKeys,
  setLocalStorage,
  getLocalStorage,
} from 'utils/localStorage';
import { useAuthentication } from 'utils/hooks';
import { isMobileOnly } from 'utils/platform';

import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';
import ProductComment from 'containers/ProductComment';
import ProductFaq from 'containers/ProductFaq';
import ProductCategories from 'containers/ProductCategories';

import { getCartQuantityRequest } from 'containers/Cart/actions';
import { makeSelectCartQuantity } from 'containers/Cart/selectors';
import { CONTEXT as CART_CONTEXT } from 'containers/Cart/constants';
import cartSaga from 'containers/Cart/saga';
import cartReducer from 'containers/Cart/reducer';

import { CartIcon, HomeIcon } from 'assets/svgIcon';

import { makeSelectProductDetail, makeSelectViewedProducts } from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  getProductDetailRequest,
  getProductVariantValuesRequest,
  getViewedProductsRequest,
  clearProductDetailRequest,
  getViewedProductsSuccess,
} from './actions';
import ProductInfo from './views/ProductInfo';
import RelatedProducts from './views/RelatedProducts';
import { CONTEXT } from './constants';
import ProductDetail from './views/ProductDetail';
import ViewedProducts from './views/ViewedProducts';

const useStyle = makeStyles(theme => ({
  wrapperMobile: {},
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  mainContent: {
    backgroundColor: theme.palette.backgroundColor[1],
    padding: isMobileOnly ? 0 : theme.spacing(6, 0),
  },
  categoryList: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

const stateSelector = createStructuredSelector({
  productDetail: makeSelectProductDetail(),
  viewedProducts: makeSelectViewedProducts(),
  cartQuantity: makeSelectCartQuantity(),
});

function ProductDetailPage(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: CART_CONTEXT, reducer: cartReducer });
  useInjectSaga({ key: CART_CONTEXT, saga: cartSaga });

  const { authenticated } = useAuthentication();
  const history = useHistory();

  const classes = useStyle();
  const globalStyle = styles();

  const { match } = props;

  const {
    productDetail,
    viewedProducts,
    myAddresses,
    cartQuantity,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const { productId } = match.params;
  useEffect(() => {
    window.scrollTo({ x: 0, y: 0, behavior: 'smooth' });
    dispatch(clearProductDetailRequest());
    dispatch(getProductDetailRequest({ productId }));
    dispatch(getProductVariantValuesRequest({ productId }));
    if (authenticated) {
      dispatch(getViewedProductsRequest());
    } else {
      const viewedList = getLocalStorage(storageKeys.VIEWED_PRODUCTS);
      if (viewedList) {
        let l = JSON.parse(viewedList);
        l = filter(l, p => !isEmpty(p));
        dispatch(getViewedProductsSuccess(l));
      }
    }
  }, [productId]);

  useEffect(() => {
    if (!isEmpty(productDetail)) {
      const viewedProductsJson =
        getLocalStorage(storageKeys.VIEWED_PRODUCTS) || '[]';
      if (viewedProductsJson) {
        let viewedList = JSON.parse(viewedProductsJson);
        viewedList = concat(viewedProducts, productDetail);
        const l = uniqWith(
          viewedList,
          (p1, p2) => p1.productId === p2.productId,
        );
        if (!isEmpty(l)) {
          setLocalStorage(
            storageKeys.VIEWED_PRODUCTS,
            JSON.stringify(take(l, 10)),
          );
        }
      }
    }
  }, [productDetail]);

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartQuantityRequest());
    }
    return () => {
      dispatch(clearProductDetailRequest());
    };
  }, []);

  const onNavigateCart = useCallback(() => {
    history.push(path.cart);
  }, []);

  const goToHomePage = useCallback(() => {
    history.push(path.productHome);
  }, []);

  const rightButtons = useMemo(
    () => [
      <IconButton
        size="medium"
        onClick={onNavigateCart}
        key={shortid.generate()}
      >
        <Badge badgeContent={cartQuantity} color="secondary">
          <CartIcon color="#fff" />
        </Badge>
      </IconButton>,
      <IconButton
        size="medium"
        color="inherit"
        onClick={goToHomePage}
        key={shortid.generate()}
      >
        <HomeIcon color="#fff" />
      </IconButton>,
    ],
    [cartQuantity],
  );

  const relatedProducts = get(productDetail, 'relatedProducts');

  return (
    <BasePageView
      className={classes.wrapperMobile}
      header={
        <Navigation
          color="primary"
          title={productDetail.name}
          rightButtons={rightButtons}
        />
      }
    >
      <DocumentHead
        title={productDetail.name}
        description={productDetail.description}
        image={get(productDetail, 'mainImage.imageLocation')}
      />

      <ProductCategories className={classes.categoryList} />
      <div>
        <div className={classes.mainContent}>
          <div className={globalStyle.container}>
            <ProductInfo
              productDetail={productDetail}
              dispatch={dispatch}
              myAddresses={myAddresses}
            />
          </div>
          <div className={globalStyle.container}>
            {!isEmpty(relatedProducts) && (
              <RelatedProducts data={relatedProducts} dispatch={dispatch} />
            )}
          </div>
          <div className={globalStyle.container}>
            <ProductDetail data={get(productDetail, 'description', '<p/>')} />
          </div>
          <div className={globalStyle.container}>
            {!isEmpty(productDetail) && <ProductComment data={productDetail} />}
          </div>
          <div className={globalStyle.container}>
            {!isEmpty(productDetail) && <ProductFaq data={productDetail} />}
          </div>
          {!isEmpty(viewedProducts) && (
            <div className={globalStyle.container}>
              <ViewedProducts data={viewedProducts} />
            </div>
          )}
        </div>
      </div>
    </BasePageView>
  );
}

ProductDetailPage.propTypes = {
  match: PropTypes.any,
};

export default memo(ProductDetailPage);
