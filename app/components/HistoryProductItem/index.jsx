import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { path, createPath } from 'routers/path';
import { currencyFormat, convertToSlug } from 'utils/stringFormat';
import Img from 'components/Img';
import Link from 'components/Link';
import get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: theme.spacing(2),
  },
  image: {
    width: 100,
    height: 130,
    borderRadius: theme.spacing(1),
    border: `solid 1px ${theme.palette.grey[300]}`,
  },
  info: {
    marginLeft: theme.spacing(3),
    marginTop: theme.spacing(2),
  },
  name: {
    color: theme.palette.grey[900],
    fontWeight: 'bold',
    maxHeight: 42,
    overflow: 'hidden',
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
  },
  brand: {
    color: theme.palette.grey[400],
  },
  price: {
    marginTop: theme.spacing(1),
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  quantity: {
    color: theme.palette.grey[500],
  },
}));

function HistoryProductItem(props) {
  const { data } = props;
  const { product, quantity, pricePerProduct } = data;
  const link = product
    ? createPath(path.productDetail, {
        productId: `${product.productId}`,
        productName: convertToSlug(product.name),
      })
    : '/';
  const classes = useStyles();

  return (
    <Link to={link}>
      <Grid container className={classes.wrapper}>
        <Grid item>
          <Img
            src={get(product, 'mainImage.imageLocation')}
            className={classes.image}
          />
        </Grid>
        <Grid item xs className={classes.info}>
          <Grid container direction="column">
            <Typography className={classes.name}>
              {product && product.name}
            </Typography>
            <Typography className={classes.brand}>
              {product && product.brand && product.brand.name}
            </Typography>
            <Typography className={classes.price}>
              {currencyFormat(pricePerProduct)}
            </Typography>
            <Typography
              className={classes.quantity}
            >{`x${quantity}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Link>
  );
}

HistoryProductItem.propTypes = {
  data: PropTypes.object,
};

export default memo(HistoryProductItem);
