import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, IconButton, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import {
  ClearOutlined,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';
import Img from 'components/Img';
import Link from 'components/Link';
import ProductPrice from 'components/ProductPrice';
import { convertToSlug } from 'utils/stringFormat';
import { path, createPath } from 'routers/path';
import get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
  detail_container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  avatar: {
    width: 120,
    height: 160,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    borderRadius: 5,
  },
  title_text: {
    color: theme.palette.textColor[1],
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 16,
  },
  detail_text: {
    color: theme.palette.textColor[2],
    textAlign: 'left',
    fontSize: 13,
  },
  price_text: {
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontSize: 15,
    fontWeight: 'bold',
  },
  rate: {
    color: theme.palette.textColor[1],
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  star: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    fontSize: 11,
    color: theme.palette.textColor[7],
  },
}));

function FavoritedProductItem(props) {
  const { data, onRemove } = props;

  const classes = useStyles();

  const product = data.defaultProductVariant || data;
  const { retailPrice, originRetailPrice } = product.price;
  const percent =
    originRetailPrice > 0
      ? ((originRetailPrice - retailPrice) * 100) / originRetailPrice
      : 0;

  const onDeleteFavProduct = () => {
    if (onRemove) {
      onRemove(data.productId);
    }
  };

  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });

  return (
    <Grid container direction="row" className={classes.root} spacing={4}>
      <Grid item>
        <Img
          src={get(data, 'mainImage.thumb256')}
          className={classes.avatar}
          alt="Product thumbnail"
        />
      </Grid>
      <Grid item xs>
        <Grid container direction="column" className={classes.detail_container}>
          <Grid item xs>
            <Typography className={classes.title_text}>{data.name}</Typography>
          </Grid>
          {percent > 0 ? (
            <Grid item>
              <ProductPrice product={data} />
            </Grid>
          ) : null}
          <Grid item container alignItems="center" className={classes.rate}>
            <Typography display="inline">
              {data.productRate ? data.productRate.rate.toFixed(1) : 0}
            </Typography>
            <Rating
              className={classes.star}
              readOnly
              value={data.productRate ? data.productRate.rate : 0}
              size="small"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              precision={0.5}
            />
            <Typography className={classes.rateNumber} display="inline">{`(${
              data.productRate ? data.productRate.numberTotal : 0
            })`}</Typography>
          </Grid>
          <Grid item>
            <Link to={link} color="secondary">
              Xem chi tiết
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <IconButton aria-label="delete" onClick={onDeleteFavProduct}>
          <ClearOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
}

FavoritedProductItem.propTypes = {
  data: PropTypes.object,
  onRemove: PropTypes.func,
};

export default memo(FavoritedProductItem);
