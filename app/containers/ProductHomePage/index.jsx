/**
 *
 * ProductHomePage
 *
 */

import React, { memo, useEffect, useMemo, useCallback } from 'react';
import { isMobileOnly } from 'utils/platform';
import { useDispatch, useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { createStructuredSelector } from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import styles from 'assets/styles';
import Badge from '@material-ui/core/Badge';
import Fab from '@material-ui/core/Fab';

import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication } from 'utils/hooks';
import { TABBAR_BOTTOM_HEIGHT } from 'utils/constants';

import DocumentHead from 'components/DocumentHead';
import ProductBestSelling from 'containers/ProductBestSelling';
import CommonProduct from 'containers/CommonProduct';
import ProductSearch from 'containers/ProductSearch';
import BasePageView from 'components/BasePageView';
import AreaSafe from 'components/AreaSafe';
import BgGradientMobile from 'components/BgGradientMobile';
import { getCartQuantityRequest } from 'containers/Cart/actions';
import { makeSelectCartQuantity } from 'containers/Cart/selectors';
import { CONTEXT as CART_CONTEXT } from 'containers/Cart/constants';
import cartSaga from 'containers/Cart/saga';
import cartReducer from 'containers/Cart/reducer';

import { CartIcon } from 'assets/svgIcon';
import { CONTEXT } from './constants';

import {
  getAllProductRequest,
  getSuggestedProductRequest,
  getSpotlightsRequest,
  getNewProductsRequest,
  getFlashSaleRequest,
} from './actions';
import {
  makeSelectFetched,
  makeSelectProducts,
  makeSelectSuggestedProducts,
  makeSelectSpotlights,
  makeSelectNewProducts,
  makeSelectFlashSale,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import AllProduct from './view/AllProduct';
import SuggestedProduct from './view/SuggestedProduct';
import FlashSale from './view/FlashSale';
import NewProduct from './view/NewProduct';
import Categories from './view/Categories';
import Carousel from './view/Carousel';

const useStyle = makeStyles(theme => ({
  mainWrapper: {
    backgroundColor: isMobileOnly ? '#fff' : theme.palette.backgroundColor[1],
    paddingTop: 25,
    paddingBottom: 25,
  },
  searchWrapper: {
    paddingBottom: isMobileOnly ? 0 : theme.spacing(4),
  },
  fab: {
    position: 'fixed',
    bottom: 'calc(env(safe-area-inset-bottom) + 58px)',
    right: theme.spacing(2),
    zIndex: 1,
    width: 50,
    height: 50,
  },
  areaSafe: {
    background: 'linear-gradient(90deg, #9E1F63 0%, #D91C5C 100%)',
  },
}));

const stateSelector = createStructuredSelector({
  fetched: makeSelectFetched(),
  products: makeSelectProducts(),
  suggestedProducts: makeSelectSuggestedProducts(),
  spotlights: makeSelectSpotlights(),
  newProducts: makeSelectNewProducts(),
  flashSale: makeSelectFlashSale(),
  cartQuantity: makeSelectCartQuantity(),
});

export function ProductHomePage() {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: CART_CONTEXT, reducer: cartReducer });
  useInjectSaga({ key: CART_CONTEXT, saga: cartSaga });

  const globalStyle = styles();
  const classes = useStyle();

  const { authenticated, showSignInDialog } = useAuthentication();
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    fetched,
    products,
    suggestedProducts,
    spotlights,
    newProducts,
    flashSale,
    cartQuantity,
  } = useSelector(stateSelector);

  const fetchData = React.useCallback(() => {
    if (isEmpty(spotlights)) {
      dispatch(getSpotlightsRequest());
    }
    dispatch(getFlashSaleRequest());
    dispatch(getNewProductsRequest());
    dispatch(getAllProductRequest({ page: 0 }));
  }, [spotlights]);

  useEffect(() => {
    if (!fetched || !isMobileOnly) {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartQuantityRequest());
      dispatch(getSuggestedProductRequest());
    }
  }, [authenticated]);

  const currentPage = get(products, 'pageInfo.page', 0);
  const last = get(products, 'pageInfo.last', false);
  const onLoadMoreProducts = React.useCallback(() => {
    if (!last) {
      dispatch(getAllProductRequest({ page: currentPage + 1 }));
    }
  }, [currentPage, last]);

  const banners = useMemo(() => {
    if (spotlights) {
      let bannerItem;
      for (let i = 0; i < spotlights.length; i += 1) {
        const s = spotlights[i];
        if (s.type === 'banner') {
          bannerItem = s;
          break;
        }
      }

      if (bannerItem) {
        return bannerItem.banners;
      }
    }
    return [];
  }, [spotlights]);

  const categories = useMemo(() => {
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
        return get(categoryItem, 'category.subCategories', []);
      }
    }
    return [];
  }, [spotlights]);

  const onNavigateCart = useCallback(() => {
    if (authenticated) {
      history.push(path.cart);
    } else {
      showSignInDialog();
    }
  }, []);

  const header = React.useMemo(
    () => (
      <>
        <AreaSafe className={classes.areaSafe} />
        <ProductSearch />
      </>
    ),
    [],
  );

  const contentProps = React.useMemo(
    () => ({
      onRefresh: fetchData,
      dataLength: products.contents.length,
      onLoadMore: onLoadMoreProducts,
      hasMore: !products.pageInfo.last,
      paddingBottom: TABBAR_BOTTOM_HEIGHT,
    }),
    [fetchData, products],
  );

  const slotFixed = React.useMemo(
    () => <BgGradientMobile isMobile={isMobileOnly} isBooking={false} />,
    [],
  );

  const spotlightsComp = React.useMemo(
    () => (
      <>
        {spotlights &&
          spotlights.map((spotlightItem, index) => {
            switch (spotlightItem.type) {
              case 'group': {
                return !isEmpty(newProducts) ? (
                  <NewProduct
                    data={newProducts}
                    key={spotlightItem.spotlightItemId || index}
                    title={spotlightItem.name.toUpperCase()}
                  />
                ) : null;
              }
              case 'bestSelling': {
                return (
                  <ProductBestSelling
                    key={spotlightItem.spotlightItemId || index}
                  />
                );
              }
              case 'list': {
                return (
                  <CommonProduct
                    title={spotlightItem.name.toUpperCase()}
                    category={spotlightItem.category}
                    key={spotlightItem.spotlightItemId || index}
                  />
                );
              }
              default:
                return null;
            }
          })}
      </>
    ),
    [spotlights, newProducts],
  );

  const childContent = React.useMemo(
    () => (
      <>
        <DocumentHead />
        {!isMobileOnly && (
          <BgGradientMobile isMobile={false} isBooking={false} />
        )}
        <div className={classes.searchWrapper}>
          <div className={globalStyle.container}>
            {!isMobileOnly && <ProductSearch />}
            <Carousel data={banners} />
            <Categories data={categories} />
          </div>
        </div>
        <div className={classes.mainWrapper}>
          <div className={globalStyle.container}>
            {!isEmpty(flashSale) && <FlashSale data={flashSale} />}
            {authenticated && <SuggestedProduct data={suggestedProducts} />}
            {spotlightsComp}
            <AllProduct data={products} onLoadMore={onLoadMoreProducts} />
          </div>
        </div>
      </>
    ),
    [
      banners,
      categories,
      authenticated,
      suggestedProducts,
      spotlightsComp,
      products,
      flashSale,
      onLoadMoreProducts,
    ],
  );

  return (
    <>
      <BasePageView
        contentProps={contentProps}
        header={header}
        slotFixed={slotFixed}
      >
        {childContent}
      </BasePageView>
      {isMobileOnly && (
        <Fab className={classes.fab} color="primary" onClick={onNavigateCart}>
          <Badge badgeContent={cartQuantity} color="secondary">
            <CartIcon color="#fff" />
          </Badge>
        </Fab>
      )}
    </>
  );
}

ProductHomePage.propTypes = {};

export default memo(ProductHomePage);
