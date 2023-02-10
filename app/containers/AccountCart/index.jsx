/**
 *
 * AccountCart
 *
 */

import React, { memo, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, Divider, Button, Typography } from '@material-ui/core';
import CartItem from 'components/CartItem';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/Cart/reducer';
import saga from 'containers/Cart/saga';
import { makeSelectCart } from 'containers/Cart/selectors';
import { CONTEXT } from 'containers/Cart/constants';
import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';
import {
  getCartRequest as getCartAction,
  removeCartItem as removeCartItemAction,
  addProductItem as addProductItemAction,
  removeProductItem as removeProductItemAction,
} from 'containers/Cart/actions';

const useStyle = makeStyles(theme => ({
  wrapper: {
    width: 365,
    maxHeight: 420,
  },
  list: {
    padding: 25,
    maxHeight: 340,
    position: 'relative',
    overflow: 'auto',
  },
  line: {
    marginBottom: 10,
    marginTop: 10,
  },
  cartButton: {
    width: '100%',
  },
  buttonWrapper: {
    padding: '10px 10px 20px 10px',
    width: '100%',
  },
  emptyText: {
    textAlign: 'center',
    width: '100%',
    padding: theme.spacing(2),
  },
}));

const AccountCart = props => {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  const {
    cart,
    getCart,
    removeItem,
    addProduct,
    removeProduct,
    onClickCart,
  } = props;
  const items = (cart && cart.items) || [];
  const classes = useStyle();
  useEffect(() => {
    getCart();
  }, []);
  const history = useHistory();
  return (
    <div className={classes.wrapper}>
      {(items && items.length > 0 && (
        <List className={classes.list} component="div">
          {items.map((item, index) => (
            <div key={item.cartItemId || index}>
              <CartItem
                data={item}
                onClickRemove={removeItem}
                onClickAddProduct={addProduct}
                onClickRemoveProduct={removeProduct}
              />
              {index < items.length - 1 && <Divider className={classes.line} />}
            </div>
          ))}
        </List>
      )) || (
        <Typography className={classes.emptyText}>
          Bạn chưa có sản phẩm nào trong giỏ hàng
        </Typography>
      )}
      <div className={classes.buttonWrapper}>
        <Button
          className={classes.cartButton}
          color="primary"
          variant="contained"
          onClick={() => {
            if (onClickCart) {
              onClickCart();
            }
            history.push(path.cart);
          }}
          disableElevation
        >
          XEM GIỎ HÀNG
        </Button>
      </div>
    </div>
  );
};

AccountCart.propTypes = {
  cart: PropTypes.any,
  getCart: PropTypes.func,
  removeItem: PropTypes.func,
  removeProduct: PropTypes.func,
  addProduct: PropTypes.func,
  onClickCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cart: makeSelectCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCart: () => dispatch(getCartAction()),
    removeItem: data => dispatch(removeCartItemAction(data)),
    removeProduct: data => dispatch(removeProductItemAction(data)),
    addProduct: data => dispatch(addProductItemAction(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AccountCart);
