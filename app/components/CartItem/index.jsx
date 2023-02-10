/**
 *
 * CartItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'components/Img';
import Link from 'components/Link';
import ProductPrice from 'components/ProductPrice';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import AmountCounter from 'components/AmountCounter';
import { path, createPath } from 'routers/path';
import { convertToSlug } from 'utils/stringFormat';
import get from 'lodash/get';

const useStyle = makeStyles(theme => ({
  wrapperItem: {
    padding: 0,
  },
  imageContainer: {
    width: 85,
    height: 115,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: 5,
    overflow: 'hidden',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  },
  name: {
    color: theme.palette.textColor[1],
  },
  brand: {
    fontSize: 12,
    color: theme.palette.textColor[2],
  },
  price: {
    fontSize: 16,
    color: theme.palette.primary.main,
  },
  originPrice: {
    display: 'inline',
    fontSize: 12,
    color: theme.palette.textColor[2],
  },
  percent: {
    marginLeft: theme.spacing(2),
    display: 'inline',
  },
  closeButton: {
    padding: theme.spacing(1),
    backgroundColor: theme.palette.error.main,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
  closeIcon: {
    color: '#fff',
  },
}));

function CartItem(props) {
  const {
    data,
    onClickRemove,
    onClickAddProduct,
    onClickRemoveProduct,
    editable = true,
  } = props;
  const classes = useStyle();
  const { quantity, product } = data;
  if (!product) return <></>;
  const { name, brand, mainImage } = product;

  const link = createPath(path.productDetail, {
    productId: `${product.productId}`,
    productName: convertToSlug(product.name),
  });

  const item = {
    productId: get(data, 'product.productId'),
    productVariantId: get(data, 'productVariant.productVariantId'),
    quantity: 1,
  };

  return (
    <ListItem
      className={classes.wrapperItem}
      component="div"
      alignItems="flex-start"
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Link to={link}>
            <div className={classes.imageContainer}>
              <Img src={mainImage.thumb256} alt="thumbnail" />
            </div>
          </Link>
        </Grid>
        <Grid item xs>
          <Grid container direction="row">
            <Grid item xs>
              <Link to={link} className={classes.name}>
                <Typography>{name}</Typography>
                <Typography className={classes.brand}>
                  {brand && brand.name}
                </Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid item xs>
            <Grid container>
              <Grid item xs>
                <ProductPrice product={product} />
              </Grid>
              <Grid item container alignItems="flex-end" justify="flex-end">
                {editable ? (
                  <AmountCounter
                    initialValue={quantity}
                    onChange={({ amount }) => {
                      if (amount < 0) {
                        onClickRemoveProduct(data);
                      } else {
                        onClickAddProduct([item]);
                      }
                    }}
                  />
                ) : (
                  <Typography>{`Số lượng: ${quantity}`}</Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {editable && (
          <Grid item xs={1}>
            <IconButton
              className={classes.closeButton}
              onClick={() => {
                onClickRemove(data);
              }}
            >
              <DeleteIcon className={classes.closeIcon} />
            </IconButton>
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
}

CartItem.propTypes = {
  editable: PropTypes.bool,
  data: PropTypes.object,
  onClickRemove: PropTypes.func,
  onClickAddProduct: PropTypes.func,
  onClickRemoveProduct: PropTypes.func,
};

export default memo(CartItem);
