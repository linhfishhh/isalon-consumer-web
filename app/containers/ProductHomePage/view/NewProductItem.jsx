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
import { Link } from 'react-router-dom';
import ProductPrice from 'components/ProductPrice';

import { convertToSlug } from 'utils/stringFormat';

import { path, createPath } from 'routers/path';

const useStyle = makeStyles(theme => ({
  wrapper: {
    position: 'relative',
    padding: isMobileOnly ? theme.spacing(0, 2) : theme.spacing(0, 4),
    '&:hover h4': {
      color: theme.palette.primary.main,
    },
    '&:hover img': {
      boxShadow: `0 25px 25px -20px rgba(0, 0, 0, 0.2)`,
    },
  },
  wrapperMain: {
    paddingLeft: isMobileOnly ? theme.spacing(2) : 0,
    display: 'flex',
    flexDirection: 'column',
  },
  imageHolder: {
    width: isMobileOnly ? 70 : 120,
  },
  image: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.shape.borderRadius,
    width: isMobileOnly ? 70 : 120,
    height: isMobileOnly ? 100 : 160,
    marginBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(3),
    transition: 'all 0.3s ease 0s',
    backgroundColor: '#fff',
    flexShrink: 0,
  },
  itemInfo: {
    marginLeft: theme.spacing(2),
    flexGrow: 1,
  },
  name: {
    fontFamily: theme.typography.fontMedium,
    color: theme.palette.textColor[1],
    height: 42,
    overflow: 'hidden',
    lineClamp: 2,
    display: '-webkit-box',
    boxOrient: 'vertical',
    marginBottom: theme.spacing(2),
    marginBlockStart: 0,
  },
  mainImage: {
    border: `solid 1px ${theme.palette.borderColor[2]}`,
    borderRadius: theme.shape.borderRadius,
    height: isMobileOnly ? 180 : 400,
    marginBottom: theme.spacing(3),
    transition: 'all 0.3s ease 0s',
    backgroundColor: '#fff',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

function NewProductItem(props) {
  const { data, itemType, className } = props;
  const classes = useStyle();

  const image = get(data, 'mainImage.imageLocation');
  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });

  return (
    <Link to={link} className={className}>
      {itemType === 'MAIN' ? (
        <div className={`${classes.wrapper} ${classes.wrapperMain}`}>
          <Img className={classes.mainImage} src={image} resizeMode="contain" />
          <h4 className={classes.name}>{data.name}</h4>
          <ProductPrice product={data} />
        </div>
      ) : (
        <div className={`${classes.wrapper} ${classes.row}`}>
          <Img className={classes.image} src={image} resizeMode="contain" />
          <div className={`${classes.column} ${classes.itemInfo}`}>
            <h4 className={classes.name} display="inline">
              {data.name}
            </h4>
            <ProductPrice product={data} />
          </div>
        </div>
      )}
    </Link>
  );
}

NewProductItem.propTypes = {
  data: PropTypes.object,
  itemType: PropTypes.string,
  className: PropTypes.string,
};

export default memo(NewProductItem);
