import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import Skeleton from '@material-ui/lab/Skeleton';

function ProductPlaceHolder(props) {
  const { imageHeight } = props;
  return (
    <div>
      <Skeleton
        variant="rect"
        width="100%"
        height={imageHeight || (isMobileOnly ? 150 : 200)}
      />
      <Skeleton animation="wave" width="100%" />
      <Skeleton animation="wave" width="80%" />
      <Skeleton animation="wave" width="70%" />
      <Skeleton animation="wave" width="60%" />
    </div>
  );
}

ProductPlaceHolder.propTypes = {
  imageHeight: PropTypes.number,
};

export default memo(ProductPlaceHolder);
