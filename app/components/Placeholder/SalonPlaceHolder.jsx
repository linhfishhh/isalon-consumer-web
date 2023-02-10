import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

function SalonPlaceHolder() {
  return (
    <div>
      <Skeleton variant="rect" width="100%" height={165} />
      <Skeleton animation="wave" width="100%" />
      <Skeleton animation="wave" width="80%" />
      <Skeleton animation="wave" width="60%" />
    </div>
  );
}

export default memo(SalonPlaceHolder);
