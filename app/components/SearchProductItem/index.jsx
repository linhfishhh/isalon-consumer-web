/**
 *
 * ProductItem
 *
 */

import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';
import Img from 'components/Img';
import Link from 'components/Link';
import ProductPrice from 'components/ProductPrice';
import get from 'lodash/get';
import { convertToSlug } from 'utils/stringFormat';
import { path, createPath } from 'routers/path';
import { isMobileOnly } from 'utils/platform';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
    '&:hover img': {
      boxShadow: `0 25px 25px -20px rgba(0, 0, 0, 0.2)`,
    },
  },
  image: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.shape.borderRadius,
    height: isMobileOnly ? 120 : 272,
    width: isMobileOnly ? 90 : 204,
    marginBottom: theme.spacing(3),
    transition: 'all 0.3s ease 0s',
    backgroundColor: '#fff',
  },
  itemInfo: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  brand: {
    color: theme.palette.textColor[7],
    textTransform: 'uppercase',
  },
  name: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.textColor[1],
    // height: 42,
    overflow: 'hidden',
    // lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
  },
  rate: {
    color: theme.palette.textColor[1],
  },
  star: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  rateNumber: {
    fontSize: 11,
    color: theme.palette.textColor[7],
  },
  discountPercent: {
    position: 'absolute',
    left: 3,
    bottom: 14,
    fontSize: 15,
    color: '#ffff',
    fontWeight: 'bold',
    padding: '2px 3px',
    backgroundColor: theme.palette.primary.main,
    height: 30,
    width: 50,
    textAlign: 'center',
    '&:before': {
      borderBottom: `30px solid ${theme.palette.primary.main}`,
      borderRight: `10px solid transparent`,
      content: "''",
      position: 'absolute',
      right: -10,
      bottom: 0,
    },
  },
  wrapperImage: {
    overflow: 'hidden',
    marginRight: theme.spacing(4),
  },
  infoContainer: {},
  description: {
    color: '#757575',
    maxHeight: 180,
    overflow: 'hidden',
    fontSize: 13,
  },
}));

function SearchProductItem(props) {
  const { data } = props;
  const classes = useStyle();

  const image = get(data, 'mainImage.imageLocation');
  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });

  const desc = get(data, 'description', '<p/>');
  const html = useMemo(
    () => ({
      __html: desc,
    }),
    [desc],
  );

  return (
    <Link to={link}>
      <Grid container className={classes.wrapper}>
        <Grid item className={classes.wrapperImage}>
          <Img className={classes.image} src={image} resizeMode="contain" />
        </Grid>
        <Grid item xs>
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.infoContainer}
          >
            <Grid item>
              <Typography
                display="inline"
                component="h4"
                className={classes.name}
              >
                {data.name}
              </Typography>
            </Grid>
            <Grid item>
              <Typography display="inline" className={classes.brand}>
                {data.brand && data.brand.name}
              </Typography>
            </Grid>
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
            {isMobileOnly && (
              <Grid item>
                <ProductPrice product={data} />
              </Grid>
            )}
            {!isMobileOnly && (
              <Grid item>
                <div
                  className={classes.description}
                  // eslint-disable-next-line react/no-danger
                  dangerouslySetInnerHTML={html}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
        {!isMobileOnly && (
          <Grid item>
            <ProductPrice product={data} />
          </Grid>
        )}
      </Grid>
    </Link>
  );
}

SearchProductItem.propTypes = {
  data: PropTypes.object,
};

export default memo(SearchProductItem);
