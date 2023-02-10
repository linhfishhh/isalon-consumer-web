import React, { memo } from 'react';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';

import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(3, 4) : theme.spacing(4, 8),
  },
}));

function CommentPlaceHolder() {
  const classes = useStyles();
  return (
    <>
      {[...Array(4)].map(() => (
        <Grid
          container
          key={shortid.generate()}
          spacing={2}
          className={classes.wrapper}
        >
          <Grid item>
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          </Grid>
          <Grid item xs>
            <Skeleton animation="wave" width="50%" />
            <Skeleton animation="wave" width="100%" />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default memo(CommentPlaceHolder);
