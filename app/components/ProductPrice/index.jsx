/**
 *
 * ProductPrice
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import { getProductPrice } from 'utils/helper';
import { currencyFormat } from 'utils/stringFormat';
import { isMobileOnly } from 'utils/platform';

const useStyle = makeStyles(theme => ({
  priceWrapper: {
    position: 'relative',
    minHeight: isMobileOnly ? 'auto' : 43,
    display: 'flex',
    flexDirection: 'column',
  },
  priceAndDiscount: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: props =>
      props.spaceBetween ? 'space-between' : 'flex-start',
  },
  price: {
    fontFamily: theme.typography.fontMedium,
    display: 'inline',
    fontWeight: 'bold',
    fontSize: isMobileOnly ? 14 : 16,
    color: theme.palette.primary.main,
    margin: 0,
  },
  originPrice: {
    color: theme.palette.textColor[7],
    textDecoration: 'line-through',
    fontSize: isMobileOnly ? 11 : 13,
  },
  discountPercent: {
    display: 'inline-block',
    position: 'relative',
    marginLeft: props => (props.spaceBetween ? 0 : theme.spacing(6)),
    color: theme.palette.textColor[6],
    backgroundColor: theme.palette.secondary.main,
    paddingRight: theme.spacing(1),
    borderTopRightRadius: theme.shape.borderRadius / 2,
    borderBottomRightRadius: theme.shape.borderRadius / 2,
    fontSize: isMobileOnly ? 11 : 14,
    height: isMobileOnly ? 16 : 20,
    '&:before': {
      border: `${isMobileOnly ? 8 : 10}px solid transparent`,
      borderRightColor: theme.palette.secondary.main,
      content: "''",
      position: 'absolute',
      left: isMobileOnly ? -16 : -20,
      top: 0,
    },
  },
}));

function ProductPrice(props) {
  const { product, variant } = props;
  const { price, originPrice, discountPercent } = getProductPrice(
    product,
    variant,
  );

  const classes = useStyle(props);

  return (
    <div className={classes.priceWrapper}>
      <div className={classes.priceAndDiscount}>
        {price && (
          <span className={classes.price}>{currencyFormat(price)}</span>
        )}
        {discountPercent > 0 && (
          <span className={classes.discountPercent}>
            {`- ${discountPercent}%`}
          </span>
        )}
      </div>
      {originPrice && originPrice !== price && (
        <span className={classes.originPrice}>
          {currencyFormat(originPrice)}
        </span>
      )}
    </div>
  );
}

ProductPrice.defaultProps = {
  spaceBetween: isMobileOnly,
};

ProductPrice.propTypes = {
  product: PropTypes.object,
  variant: PropTypes.object,
  // eslint-disable-next-line react/no-unused-prop-types
  spaceBetween: PropTypes.bool,
};

export default memo(ProductPrice);
