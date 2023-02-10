import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { isMobileOnly } from 'utils/platform';
import { createStructuredSelector } from 'reselect';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Grid, Typography, Button, GridList } from '@material-ui/core';
import AddIcon from '@material-ui/icons/AddOutlined';
import remove from 'lodash/remove';
import { isAuthenticated } from 'utils/auth';
import { showCartNotificationRequest } from 'containers/Header/actions';
import headerReducer from 'containers/Header/reducer';
import { CONTEXT as HEADER_CONTEXT } from 'containers/Header/constants';
import RelatedProductItem from './RelatedProductItem';
import AddCartSuccessDialog from './AddCartSuccessDialog';
import useStyles from '../styles';
import { CONTEXT } from '../constants';
import saga from '../saga';
import { addProductsToCartRequest } from '../actions';

function RelatedProducts(props) {
  useInjectSaga({ key: CONTEXT, saga });
  useInjectReducer({ key: HEADER_CONTEXT, reducer: headerReducer });
  const classes = useStyles();
  const { data, addProductsToCart, dispatch } = props;
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [openAddCartSuccessDlg, setOpenAddCartSuccessDlg] = useState(false);
  const onSelectionChange = React.useCallback(
    (product, checked) => {
      const l = [...relatedProducts];
      remove(l, p => p.productId === product.productId);
      if (checked) {
        l.push(product);
      }
      setRelatedProducts(l);
    },
    [relatedProducts],
  );

  useEffect(() => {
    setRelatedProducts([]);
  }, [data]);

  const mapRequestPayloadToCartItems = () => {
    const ret = relatedProducts.map(p => ({
      product: p,
      productVariant: p.defaultProductVariant,
      quantity: 1,
    }));
    return ret;
  };

  const onAddProductsToCart = () => {
    if (addProductsToCart && isAuthenticated()) {
      const payloads = relatedProducts.map(p => {
        const { productId, defaultProductVariant } = p;
        let payload = {
          productId,
          quantity: 1,
        };
        const selectedVariant = defaultProductVariant;
        if (selectedVariant) {
          payload = {
            ...payload,
            productVariantId: selectedVariant.productVariantId,
          };
        }
        return payload;
      });
      if (payloads && payloads.length > 0) {
        addProductsToCart({
          cartItems: payloads,
          callback: () => {
            if (isMobileOnly) {
              setOpenAddCartSuccessDlg(true);
            } else {
              dispatch(showCartNotificationRequest(true));
            }
          },
        });
      }
    }
  };

  return (
    <div className={`${classes.root} ${classes.padding_4}`}>
      <Typography className={classes.title}>Thường được mua cùng</Typography>
      <div className={classes.relatedList}>
        {data && (
          <GridList cols={2} className={classes.gridList} cellHeight={330}>
            {data.map((item, index) => {
              const last = index === data.length - 1;
              return (
                <div
                  key={item.productId || index}
                  className={classes.relatedItem}
                >
                  <Grid container alignItems="center" wrap="nowrap">
                    <Grid item xs>
                      <RelatedProductItem
                        data={item}
                        onSelectionChange={onSelectionChange}
                      />
                    </Grid>
                    <Grid item className={classes.plusSign}>
                      {!last && <AddIcon />}
                    </Grid>
                  </Grid>
                </div>
              );
            })}
          </GridList>
        )}
      </div>
      {relatedProducts.length > 0 && (
        <Grid container alignItems="center" justify="center">
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              disableElevation
              onClick={onAddProductsToCart}
            >{`THÊM ${relatedProducts.length} SẢN PHẨM VÀO GIỎ HÀNG`}</Button>
          </Grid>
        </Grid>
      )}
      {isMobileOnly && (
        <AddCartSuccessDialog
          open={openAddCartSuccessDlg}
          items={mapRequestPayloadToCartItems()}
          onClose={() => setOpenAddCartSuccessDlg(false)}
        />
      )}
    </div>
  );
}

RelatedProducts.propTypes = {
  dispatch: PropTypes.func,
  data: PropTypes.array,
  addProductsToCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    addProductsToCart: params => dispatch(addProductsToCartRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RelatedProducts);
