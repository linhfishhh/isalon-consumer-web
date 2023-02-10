/**
 *
 * SalonInfo
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import AddressIcon from '@material-ui/icons/Room';

const useStyle = makeStyles(theme => ({
  wrapper: {},
  address: {
    color: theme.palette.textColor[2],
  },
  icon: {
    paddingLeft: theme.spacing(1 / 2),
    paddingRight: theme.spacing(1 / 2),
    color: theme.palette.grey[600],
  },
}));

function SalonInfo(props) {
  const { salonInfo, showIcon = false } = props;
  const classes = useStyle();

  return (
    <Grid container className={classes.wrapper}>
      {showIcon && (
        <Grid item>
          <AddressIcon className={classes.icon} />
        </Grid>
      )}
      <Grid item xs>
        <Typography variant="h6">{salonInfo.name}</Typography>
        <Typography className={classes.address}>{salonInfo.address}</Typography>
      </Grid>
    </Grid>
  );
}

SalonInfo.propTypes = {
  salonInfo: PropTypes.object,
  showIcon: PropTypes.bool,
};

export default memo(SalonInfo);
