/**
 *
 * Cart
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { get } from 'lodash';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import { isMobileOnly } from 'utils/platform';
import { useInjectLoading } from 'utils/injectLoading';

import BasePageView from 'components/BasePageView';
import Navigation from 'components/Navigation';
import DocumentHead from 'components/DocumentHead';

import ProductCategories from 'containers/ProductCategories';
import addressReducer from 'containers/AddressBook/reducer';
import addressSaga from 'containers/AddressBook/saga';
import { CONTEXT as ADDRESS_CONTEXT } from 'containers/AddressBook/constants';
import { getMyAddressesRequest } from 'containers/AddressBook/actions';
import { makeSelectSuggestedProducts } from 'containers/ProductHomePage/selectors';
import { getSuggestedProductRequest } from 'containers/ProductHomePage/actions';
import reducerProductHome from 'containers/ProductHomePage/reducer';
import sagaProductHome from 'containers/ProductHomePage/saga';
import { CONTEXT as PRODUCT_HOME_CONTEXT } from 'containers/ProductHomePage/constants';
import useGlobalStyles from 'assets/styles';
import { makeSelectAddress as makeSelectCurrentAddress } from 'containers/UserLocation/selectors';
import {
  makeSelectCart,
  makeSelectNumberSelectedItems,
  makeSelectIsCheckedAll,
  makeSelectPrice,
  makeSelectAddress,
  makeSelectErrors,
  makeSelectSelectedItems,
  makeSelectGiftCode,
  makeSelectLoading,
} from './selectors';
import {
  getCartRequest,
  removeCartItem as removeCartItemAction,
  addProductItem as addProductItemAction,
  removeProductItem as removeProductItemAction,
  selectCartItem as selectCartItemAction,
  selectAllCartItems as selectAllCartItemsAction,
  showError as showErrorAction,
  likeProductRequest,
  unlikeProductRequest,
  calculateCart as calculateCartAction,
  clearCartViewRequest,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import { CONTEXT, GET_CART } from './constants';
import MainContent from './views/MainContent';
import CartConfirm from './views/CartConfirm';
import SuggestedProducts from './views/SuggestedProducts';
import EmptyCart from './views/EmptyCart';

const useStyles = makeStyles(theme => ({
  base: {
    backgroundColor: '#F2F2F2',
  },
  root: {
    backgroundColor: '#F2F2F2',
    padding: theme.spacing(4),
  },
  title: {
    color: '#8E8E93',
    fontSize: 16,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(2),
  },
  cartConfirmPanel: {
    maxWidth: isMobileOnly ? '100%' : 380,
    marginLeft: isMobileOnly ? 0 : theme.spacing(4),
  },
  content: {
    paddingTop: 56,
  },
}));

function Cart(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: ADDRESS_CONTEXT, reducer: addressReducer });
  useInjectSaga({ key: ADDRESS_CONTEXT, saga: addressSaga });
  useInjectReducer({ key: PRODUCT_HOME_CONTEXT, reducer: reducerProductHome });
  useInjectSaga({ key: PRODUCT_HOME_CONTEXT, saga: sagaProductHome });
  useInjectLoading([GET_CART]);
  const classes = useStyles();
  const {
    loading,
    cart,
    getCart,
    removeItem,
    addProduct,
    removeProduct,
    selectCartItem,
    totalSelected,
    selectAllCartItems,
    isCheckedAll,
    getMyAddresses,
    address,
    suggestedProducts,
    getSuggestedProduct,
    price,
    dispatch,
    errors,
    createOrder,
    selectedItems,
    giftCode,
    showError,
    unlikeProduct,
    likeProduct,
    calculateCart,
    clearCartView,
    currentAddress,
  } = props;
  useEffect(() => {
    getCart();
    getMyAddresses();
    getSuggestedProduct();
    return () => {
      clearCartView();
    };
  }, []);

  const globalStyles = useGlobalStyles();
  const onCheckboxChanged = useCallback(
    (item, checked) => selectCartItem(item, checked),
    [selectCartItem],
  );

  const onCheckboxSelectAllChanged = useCallback(
    checked => selectAllCartItems(checked),
    [selectAllCartItems],
  );

  const displayAddress = address || { addressDetail: currentAddress };
  const header = React.useMemo(
    () => <Navigation color="primary" title="Giỏ hàng của bạn" />,
    [],
  );

  return (
    <BasePageView className={classes.base} header={header}>
      <DocumentHead title="Giỏ hàng của bạn" description="Giỏ hàng của bạn" />
      {!loading && (
        <div className={classes.base}>
          {!isMobileOnly && <ProductCategories dispatch={dispatch} />}
          <div className={`${classes.root} ${globalStyles.container}`}>
            {!isMobileOnly && (
              <Typography className={classes.title}>
                Giỏ hàng của bạn
              </Typography>
            )}
            <Grid container>
              {cart && cart.items.length > 0 && (
                <>
                  <Grid item xs>
                    <MainContent
                      cart={cart}
                      onCheckboxChanged={onCheckboxChanged}
                      onCheckboxSelectAllChanged={onCheckboxSelectAllChanged}
                      totalSelected={totalSelected}
                      isCheckedAll={isCheckedAll}
                      removeItem={removeItem}
                      addProduct={addProduct}
                      removeProduct={removeProduct}
                      dispatch={dispatch}
                      likeProduct={likeProduct}
                      unlikeProduct={unlikeProduct}
                    />
                  </Grid>
                  <Grid item className={classes.cartConfirmPanel}>
                    <CartConfirm
                      selectedItems={selectedItems}
                      giftCode={giftCode}
                      price={price}
                      address={displayAddress}
                      totalSelected={totalSelected}
                      errors={errors}
                      onPay={createOrder}
                      showError={showError}
                      onCalculateCart={calculateCart}
                    />
                  </Grid>
                </>
              )}
              {get(cart, 'items', []).length === 0 && (
                <Grid item xs={12}>
                  <EmptyCart dispatch={dispatch} />
                </Grid>
              )}
              <Grid item xs={12}>
                <SuggestedProducts products={suggestedProducts} />
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </BasePageView>
  );
}

Cart.propTypes = {
  loading: PropTypes.bool,
  cart: PropTypes.any,
  getCart: PropTypes.func,
  removeItem: PropTypes.func,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  selectCartItem: PropTypes.func,
  totalSelected: PropTypes.number,
  selectAllCartItems: PropTypes.func,
  isCheckedAll: PropTypes.bool,
  getMyAddresses: PropTypes.func,
  address: PropTypes.object,
  suggestedProducts: PropTypes.array,
  getSuggestedProduct: PropTypes.func,
  price: PropTypes.object,
  dispatch: PropTypes.func,
  errors: PropTypes.array,
  createOrder: PropTypes.func,
  selectedItems: PropTypes.array,
  giftCode: PropTypes.string,
  showError: PropTypes.func,
  unlikeProduct: PropTypes.func,
  likeProduct: PropTypes.func,
  calculateCart: PropTypes.func,
  clearCartView: PropTypes.func,
  currentAddress: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  cart: makeSelectCart(),
  totalSelected: makeSelectNumberSelectedItems(),
  isCheckedAll: makeSelectIsCheckedAll(),
  address: makeSelectAddress(),
  suggestedProducts: makeSelectSuggestedProducts(),
  price: makeSelectPrice(),
  errors: makeSelectErrors(),
  selectedItems: makeSelectSelectedItems(),
  giftCode: makeSelectGiftCode(),
  currentAddress: makeSelectCurrentAddress(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCart: () => dispatch(getCartRequest()),
    removeItem: data => dispatch(removeCartItemAction(data)),
    removeProduct: data => dispatch(removeProductItemAction(data)),
    addProduct: data => {
      const item = {
        productId: get(data, 'product.productId'),
        productVariantId: get(data, 'productVariant.productVariantId'),
        quantity: 1,
      };
      dispatch(addProductItemAction([item]));
    },
    selectCartItem: (item, checked) =>
      dispatch(selectCartItemAction({ item, checked })),
    selectAllCartItems: checked =>
      dispatch(selectAllCartItemsAction({ checked })),
    getMyAddresses: () => dispatch(getMyAddressesRequest()),
    getSuggestedProduct: () => dispatch(getSuggestedProductRequest()),
    showError: message => dispatch(showErrorAction({ message })),
    likeProduct: productId => dispatch(likeProductRequest({ productId })),
    unlikeProduct: productId => dispatch(unlikeProductRequest({ productId })),
    calculateCart: (giftCode, isConfirm = false, success = undefined) =>
      dispatch(calculateCartAction({ giftCode, isConfirm, success })),
    clearCartView: () => dispatch(clearCartViewRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Cart);
