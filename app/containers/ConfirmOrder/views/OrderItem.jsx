import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

import Img from 'components/Img';
import ProductPrice from 'components/ProductPrice';
import Link from 'components/Link';
import { path, createPath } from 'routers/path';

import { isMobileOnly } from 'utils/platform';
import { convertToSlug } from 'utils/stringFormat';
import { useBreakpointValues } from 'utils/hooks';

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
  buttonDelete: {
    marginLeft: 20,
  },
  functionWrapper: {
    paddingTop: '20%',
  },
  buttons: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row-reverse',
    marginTop: '20%',
  },
  quantityText: {
    marginLeft: theme.spacing(2),
  },
  textGray: {
    color: theme.palette.textColor[7],
  },
  error: {
    color: theme.palette.error.main,
    fontSize: 12,
  },
  productName: {
    fontFamily: theme.typography.fontMedium,
  },
}));

const OrderItem = props => {
  const { item } = props;
  const classes = useStyles();

  const breakpoint = useBreakpointValues({
    xs: 12,
    sm: 12,
    md: false,
    lg: false,
    xl: false,
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

  const link = createPath(path.productDetail, {
    productId: `${item.product.productId}`,
    productName: convertToSlug(item.product.name),
  });

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.gridContainer}
        spacing={4}
        direction={isMobileOnly ? 'column' : 'row'}
      >
        <Grid item>
          <Grid container spacing={4} justify="space-around">
            <Grid item>
              <Img
                src={get(item, 'product.mainImage.thumb256')}
                resizeMode="contain"
                className={classes.productItemCover}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs>
              <Link to={link}>
                <Typography className={classes.productName}>
                  {item.product.name}
                </Typography>
              </Link>
              <Typography>
                {item.product.brand && item.product.brand.name}
              </Typography>
              <Typography className={classes.textGray}>
                {variantValueText}
              </Typography>
              {error && (
                <Typography className={classes.error}>{error}</Typography>
              )}
            </Grid>
            <Grid item xs={breakpoint}>
              <ProductPrice
                product={item.product}
                variant={item.productVariant}
              />
              <Typography>
                Số lượng:
                <span className={classes.quantityText}>{item.quantity}</span>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

OrderItem.propTypes = {
  item: PropTypes.object,
};
export default memo(OrderItem);
