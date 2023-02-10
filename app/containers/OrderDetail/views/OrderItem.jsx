import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import { Typography, Grid } from '@material-ui/core';

import { currencyFormat, convertToSlug } from 'utils/stringFormat';
import { isMobileOnly } from 'utils/platform';

import Link from 'components/Link';
import Img from 'components/Img';
import { path, createPath } from 'routers/path';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },

  divider: {
    margin: theme.spacing(2, 0),
  },
  image: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.shape.borderRadius,
    width: 90,
    height: 120,
    transition: 'all 0.3s ease 0s',
    backgroundColor: '#fff',
  },
  productName: {
    color: theme.palette.textColor[1],
    fontFamily: theme.typography.fontMedium,
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  price: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
    textAlign: 'right',
  },
  quantityText: {
    color: theme.palette.grey[500],
    textAlign: 'right',
  },
  quantity: {
    marginLeft: theme.spacing(2),
    fontWeight: 'bold',
    color: theme.palette.grey[900],
  },
}));

const OrderItem = props => {
  const { item } = props;
  const classes = useStyles();
  const image = get(item, 'product.mainImage.imageLocation');
  const link = createPath(path.productDetail, {
    productId: `${item.product.productId}`,
    productName: convertToSlug(item.product.name),
  });
  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <Link to={link}>
            <Img className={classes.image} src={image} resizeMode="contain" />
          </Link>
        </Grid>
        <Grid item xs>
          <Grid container>
            <Grid item xs>
              <Link to={link}>
                <Typography className={classes.productName}>
                  {item.product.name}
                </Typography>
              </Link>
              <Typography className={classes.label}>
                {item.product.brand && item.product.brand.name}
              </Typography>
            </Grid>
            <Grid item xs={isMobileOnly ? 12 : false}>
              <Typography className={classes.price}>
                {currencyFormat(item.pricePerProduct)}
              </Typography>
              <Typography className={classes.quantityText}>
                Số lượng:
                <span className={classes.quantity}>{item.quantity}</span>
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
