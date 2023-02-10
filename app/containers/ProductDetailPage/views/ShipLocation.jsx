import React, { memo } from 'react';
import { Grid, Typography } from '@material-ui/core';
import ShipIcon from 'assets/svgIcon/ShipIcon';
import addBusinessDays from 'date-fns/addBusinessDays';
import format from 'date-fns/format';
import vi from 'date-fns/locale/vi';
import { LocationOn as LocationIcon } from '@material-ui/icons';
import { getAddress } from 'utils/localStorage/location';
import useStyles from '../styles';

function ShipLocation() {
  const classes = useStyles();

  const now = new Date();
  const onDate = addBusinessDays(now, 2);
  const onDateStr = format(onDate, 'EEE, dd/MM/yyyy', { locale: vi });

  return (
    <div>
      <Grid container alignItems="center" spacing={3}>
        <Grid item>
          <ShipIcon />
        </Grid>
        <Grid item>
          <Typography className={classes.title}>Giao hàng</Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" wrap="nowrap" spacing={3}>
        <Grid item>
          <LocationIcon color="primary" />
        </Grid>
        <Grid item xs>
          <Typography className={classes.shipAddress}>
            {getAddress()}
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" spacing={3}>
        <Grid item xs>
          <Grid container direction="column">
            <Grid item>
              <Typography display="inline">
                Giao hàng tiêu chuẩn, 1-2 ngày
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.detail} display="inline">
                {`Dự kiến giao hàng ${onDateStr}`}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(ShipLocation);
