import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import { Grid, Typography, Link } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    height: 70,
    backgroundColor: '#f3f3f4',
  },
  text: {
    color: theme.palette.textColor[5],
    display: 'inline',
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.footerWrapper}>
        {/* <Grid container justify="center" spacing={2}>
          <Grid item>
            <Typography className={classes.text}>
              {`Hãy gọi cho chúng tôi: `}
            </Typography>
          </Grid>
          <Grid item>
            <Link href="tel://0915000000">0915000000</Link>
          </Grid>
        </Grid> */}
      </div>
    </>
  );
}

export default memo(Footer);
