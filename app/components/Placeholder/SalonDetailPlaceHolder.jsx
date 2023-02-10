import React, { memo } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  item: {
    marginTop: 15,
  },
});

function SalonDetailPlaceHolder() {
  const classes = useStyles();
  return (
    <div>
      <Skeleton variant="rect" width="100%" height={300} />
      <Skeleton
        variant="rect"
        width="100%"
        height={50}
        className={classes.item}
      />
      <Skeleton
        variant="rect"
        width={800}
        height={50}
        className={classes.item}
      />
      <Skeleton
        variant="rect"
        width={800}
        height={50}
        className={classes.item}
      />
    </div>
  );
}

export default memo(SalonDetailPlaceHolder);
