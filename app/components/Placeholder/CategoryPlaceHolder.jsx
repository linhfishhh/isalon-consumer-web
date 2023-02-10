import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import { isMobileOnly } from 'utils/platform';

function CategoryPlaceHolder() {
  return (
    <Grid container justify="center" spacing={4}>
      <Grid item>
        <Skeleton
          variant="circle"
          width={isMobileOnly ? 60 : 94}
          height={isMobileOnly ? 60 : 94}
        />
      </Grid>
      <Grid item xs={12}>
        <Skeleton
          animation="wave"
          width="80%"
          height={isMobileOnly ? 10 : 15}
        />
        <Skeleton
          animation="wave"
          width="60%"
          height={isMobileOnly ? 10 : 15}
        />
      </Grid>
    </Grid>
  );
}

export default memo(CategoryPlaceHolder);
