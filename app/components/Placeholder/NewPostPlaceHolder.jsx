import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function NewPostPlaceHolder() {
  return (
    <div>
      <Skeleton variant="rect" width="100%" height={185} />
      <Skeleton animation="wave" width="100%" />
      <Skeleton animation="wave" width="100%" />
    </div>
  );
}

export default memo(NewPostPlaceHolder);
