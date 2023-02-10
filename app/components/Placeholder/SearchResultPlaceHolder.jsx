import React, { memo } from 'react';
import shortid from 'shortid';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';

import { isMobileOnly } from 'utils/platform';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginTop: isMobileOnly ? theme.spacing(4) : theme.spacing(4),
  },
  item: {
    marginBottom: isMobileOnly ? theme.spacing(2) : theme.spacing(4),
    borderRadius: theme.spacing(1.5),
  },
}));

function SearchResultPlaceHolder() {
  const classes = useStyles();
  return (
    <>
      {[...Array(5)].map(() => (
        <Grid
          container
          direction={isMobileOnly ? 'column' : 'row'}
          key={shortid.generate()}
          spacing={isMobileOnly ? 0 : 4}
          className={classes.wrapper}
        >
          <Grid item xs sm={6}>
            <Skeleton
              variant="rect"
              width="100%"
              height={250}
              className={classes.item}
              animation="wave"
            />
          </Grid>
          <Grid item xs>
            <Skeleton
              variant="rect"
              width="100%"
              height={25}
              className={classes.item}
              animation="wave"
            />
            <Skeleton
              variant="rect"
              width="90%"
              height={25}
              className={classes.item}
              animation="wave"
            />
            <Skeleton
              variant="rect"
              width="80%"
              height={25}
              className={classes.item}
              animation="wave"
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
}

export default memo(SearchResultPlaceHolder);
