import React, { memo, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

import { convertToSlug } from 'utils/stringFormat';
import { useBreakpointValues } from 'utils/hooks';
// import { isMobileOnly } from 'utils/platform';

import Checkbox from 'components/Checkbox';
import ButtonDelete from 'components/ButtonDelete';
import ButtonFavorite from 'components/ButtonFavorite';
import Img from 'components/Img';
import ProductPrice from 'components/ProductPrice';
import QuantitySelector from 'components/QuantitySelector';
import Link from 'components/Link';

import { path, createPath } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#fff',
    marginBottom: theme.spacing(4),
    border: '0.5px solid #d2d2d2aa',
    borderRadius: 3,
    overflow: 'hidden',
    padding: theme.spacing(4),
  },
  productItemCover: {
    width: 134,
    height: 150,
  },
  productName: {
    color: theme.palette.grey[900],
  },
  brandName: {
    color: theme.palette.grey[500],
  },
  buttonDelete: { marginLeft: theme.spacing(3) },
  functionWrapper: {
    // paddingTop: '20%',
  },
  buttons: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse',
    // marginTop: '20%',
  },
  textGray: {
    color: theme.palette.textColor[7],
  },
  error: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  productImage: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  checkbox: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
}));

const CartItem = props => {
  const {
    item,
    onCheckboxChanged,
    removeItem,
    addProduct,
    removeProduct,
    likeProduct,
    unlikeProduct,
  } = props;
  const classes = useStyles();
  const onChange = useCallback(checked => onCheckboxChanged(item, checked), [
    item,
  ]);
  const onQuantityChange = useCallback(
    (quatity, isMinus) => {
      if (isMinus) {
        removeProduct(item);
      } else {
        addProduct(item);
      }
    },
    [item],
  );

  const link = createPath(path.productDetail, {
    productId: `${item.product.productId}`,
    productName: convertToSlug(item.product.name),
  });

  const variantValueText = useMemo(
    () =>
      get(item, 'productVariant.variantValues', [])
        .map(
          variantValue =>
            `${get(variantValue, 'variant.name', '')}: ${get(
              variantValue,
              'name',
              '',
            )}`,
        )
        .join(', '),
    [item],
  );

  const error = useMemo(() => {
    if (typeof item.maxQuantity !== 'undefined') {
      if (item.maxQuantity === 0) {
        return 'Hết hàng';
      }
      if (item.quantity > item.maxQuantity) {
        return `Chỉ còn lại  ${item.maxQuantity} sản phẩm`;
      }
    }
    return undefined;
  }, [item]);

  const direction = useBreakpointValues({ xs: 'column', md: 'row' });

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.gridContainer}
        spacing={4}
        direction={direction}
      >
        <Grid item className={classes.productImage}>
          <Checkbox
            onChange={onChange}
            className={classes.checkbox}
            checked={item.isSelected}
          />
          <Link to={link}>
            <Img
              src={get(item, 'product.mainImage.thumb256')}
              resizeMode="contain"
              className={classes.productItemCover}
            />
          </Link>
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs={12}>
              <Link to={link}>
                <Typography className={classes.productName} variant="h6">
                  {item.product.name}
                </Typography>
                <Typography className={classes.brandName}>
                  {item.product.brand && item.product.brand.name}
                </Typography>
                <ProductPrice
                  product={item.product}
                  variant={item.productVariant}
                />
                <Typography className={classes.textGray}>
                  {variantValueText}
                </Typography>
                {error && (
                  <Typography className={classes.error}>{error}</Typography>
                )}
              </Link>
            </Grid>
            <Grid container item direction="row-reverse" xs={12}>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <QuantitySelector
                    onChange={onQuantityChange}
                    defaultQuantity={item.quantity}
                  />
                </Grid>
                <Grid item>
                  <div className={classes.buttons}>
                    <ButtonDelete
                      className={classes.buttonDelete}
                      onClick={() => removeItem(item)}
                    />
                    <ButtonFavorite
                      onChange={iF => {
                        if (iF) {
                          likeProduct(item.product.productId);
                        } else {
                          unlikeProduct(item.product.productId);
                        }
                      }}
                      isFavorite={item.product.isFavorite}
                    />
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
  onCheckboxChanged: PropTypes.func,
  removeItem: PropTypes.func,
  addProduct: PropTypes.func,
  removeProduct: PropTypes.func,
  likeProduct: PropTypes.func,
  unlikeProduct: PropTypes.func,
};
export default memo(CartItem);
