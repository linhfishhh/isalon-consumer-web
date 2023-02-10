import React, { memo } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import shortid from 'shortid';
import isEmpty from 'lodash/isEmpty';
import { Typography } from '@material-ui/core';

import { useBreakpointValues } from 'utils/hooks';
import { isMobileOnly } from 'utils/platform';
import { placeholder } from 'utils/placeholder';

import Slideshow from 'components/Slideshow';
import ProductItem from 'components/ProductItem';
import ScrollView from 'components/ScrollView';
import ProductPlaceHolder from 'components/Placeholder/ProductPlaceHolder';
import useStyles from '../styles';

function ViewedProducts(props) {
  const classes = useStyles();
  const { data } = props;

  const slidesToScroll = useBreakpointValues({ xs: 2, sm: 3, md: 4, lg: 5 });

  const viewedData = take(data, 10);

  const renderItem = React.useCallback(
    item => (
      <div
        key={isEmpty(item) ? shortid.generate() : item.productId}
        className={classes.productItem}
      >
        {isEmpty(item) ? (
          <ProductPlaceHolder />
        ) : (
          <ProductItem data={item} dense />
        )}
      </div>
    ),
    [],
  );

  return (
    <div className={`${classes.root} ${classes.padding_4}`}>
      <Typography className={classes.title}>Sản phẩm đã xem</Typography>
      <div className={classes.viewedProducts}>
        {isMobileOnly ? (
          <ScrollView
            className={classes.gridList}
            items={placeholder(viewedData, 5)}
            cols={2.3}
            spacing={8}
            renderItem={renderItem}
          />
        ) : (
          <Slideshow
            items={placeholder(viewedData, 5)}
            variableWidth
            className="slide variable-width"
            slidesToScroll={slidesToScroll}
            renderItem={renderItem}
          />
        )}
      </div>
    </div>
  );
}

ViewedProducts.propTypes = {
  data: PropTypes.array,
};

export default memo(ViewedProducts);
