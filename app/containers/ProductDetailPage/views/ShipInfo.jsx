import React, { memo } from 'react';
import { Grid, Divider } from '@material-ui/core';
import { isMobileOnly } from 'utils/platform';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ShipLocation from './ShipLocation';
import CustomerRight from './CustomerRight';
import ContactUs from './ContactUs';
import useStyles from '../styles';

function ShipInfo() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.only('sm'));

  return (
    <div className={classes.shipPanel}>
      <Grid container direction={isMobileOnly ? 'column' : 'row'} spacing={3}>
        <Grid item xs={matches || 12}>
          <ShipLocation />
        </Grid>
        <Grid item xs={matches ? !matches : 12}>
          <Divider orientation={matches ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid item xs={matches || 12}>
          <CustomerRight />
        </Grid>
        <Grid item xs={matches ? !matches : 12}>
          <Divider orientation={matches ? 'vertical' : 'horizontal'} />
        </Grid>
        <Grid item xs={matches || 12}>
          <ContactUs />
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ShipInfo);
