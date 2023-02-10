/**
 *
 * ProductItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { makeStyles } from '@material-ui/core/styles';
import get from 'lodash/get';
import Img from 'components/Img';
// import Link from 'components/Link';
import ProductPrice from 'components/ProductPrice';
import RatingView from 'components/RatingView';
import { Link } from 'react-router-dom';

import { convertToSlug, currencyFormat } from 'utils/stringFormat';
import { getProductPrice } from 'utils/helper';
import { getSettings } from 'utils/localStorage/settings';

import { path, createPath } from 'routers/path';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
    '&:hover img': {
      boxShadow: `0 15px 15px -15px rgba(0, 0, 0, 0.5)`,
    },
    display: 'flex',
    flexDirection: 'column',
  },
  image: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.spacing(1.5),
    width: '100%',
    height: isMobileOnly ? props => (props.dense ? 170 : 200) : 258,
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
    height: 42,
    overflow: 'hidden',
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    '&:hover': {
      color: theme.palette.primary.main,
    },
    marginBlockStart: 0,
  },
  rate: {
    color: theme.palette.textColor[1],
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
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
    position: 'relative',
    overflow: 'hidden',
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    display: 'inline',
    fontWeight: 'bold',
    fontSize: isMobileOnly ? 16 : 18,
    color: theme.palette.primary.main,
  },
  originPrice: {
    color: theme.palette.textColor[7],
    textDecoration: 'line-through',
    fontSize: isMobileOnly ? 13 : 16,
  },
  gridItem: {
    marginBottom: 4,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function ProductItem(props) {
  const { data, categoryType, numColumn, minusWidth, dense } = props;
  const classes = useStyle({ numColumn, minusWidth, dense });
  const settings = getSettings();

  const image = get(data, 'mainImage.imageLocation');
  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });
  const { price, originPrice, discountPercent } = getProductPrice(data);

  return (
    <Link to={link}>
      <div className={classes.wrapper}>
        <div className={`${classes.wrapperImage} ${classes.gridItem}`}>
          <Img className={classes.image} src={image} resizeMode="contain" />
          {(categoryType === 'SUGGESTED' || categoryType === 'FLASH_SALE') &&
            discountPercent > 0 && (
              <span className={classes.discountPercent}>
                {`- ${discountPercent}%`}
              </span>
            )}
        </div>
        {categoryType !== 'SUGGESTED' ? (
          <>
            <span className={`${classes.brand} ${classes.gridItem}`}>
              {data.brand && data.brand.name}
            </span>
            <h4 className={`${classes.name} ${classes.gridItem}`}>
              {data.name}
            </h4>
            {settings.rating && (
              <div className={classes.rate}>
                {/* <Typography display="inline">
                  {data.productRate ? data.productRate.rate.toFixed(1) : 0}
                </Typography> */}
                <RatingView
                  className={classes.star}
                  value={data.productRate ? data.productRate.rate : 0}
                  size="small"
                />
                <span className={classes.rateNumber} display="inline">{`(${
                  data.productRate ? data.productRate.numberTotal : 0
                })`}</span>
              </div>
            )}
            <ProductPrice product={data} className={classes.gridItem} />
          </>
        ) : (
          <div>
            <div>
              {discountPercent > 0 && (
                <span className={classes.originPrice}>
                  {currencyFormat(originPrice)}
                </span>
              )}
            </div>
            <span className={classes.price}>{currencyFormat(price)}</span>
          </div>
        )}
      </div>
    </Link>
  );
}

ProductItem.defaultProps = {
  numColumn: 5,
  minusWidth: 0,
  dense: false,
};

ProductItem.propTypes = {
  data: PropTypes.object,
  categoryType: PropTypes.string,
  numColumn: PropTypes.number,
  minusWidth: PropTypes.number,
  dense: PropTypes.bool,
};

export default memo(ProductItem);
