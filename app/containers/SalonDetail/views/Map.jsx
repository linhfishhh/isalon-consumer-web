/**
 *
 * Map
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Grid, Toolbar, Dialog } from '@material-ui/core';

import { getCurrentPosition } from 'utils/localStorage/location';

import AreaSafe from 'components/AreaSafe';
import Button from 'components/Button';
import MapView from 'components/MapView';
import Transition from 'components/Transition';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  navigation: {
    backgroundColor: theme.palette.primary.main,
    background: `linear-gradient(90deg, rgba(${theme.hexToRgb(
      theme.palette.primary.main,
    )}, 1) 0%, rgba(${theme.hexToRgb(
      theme.palette.backgroundColor[5],
    )}, 1) 100%)`,
  },
  btnClose: {
    color: theme.palette.textColor[6],
  },
}));

const convertSalon = salon => {
  if (isEmpty(salon)) {
    return [];
  }
  const result = {
    id: salon.id,
    name: salon.name,
    address: salon.address,
    rating: salon.rating,
    rating_count: salon.ratingCount,
    cover: salon.cover,
    open: salon.verified,
    verified: salon.open,
    distance: salon.distance,
    liked: salon.liked,
    location: {
      latitude: salon.map_lat,
      longitude: salon.map_lng,
    },
    services: [],
  };
  return [result];
};

function Map(props) {
  const { open, onClose, salon } = props;
  const classes = useStyles();

  const { position } = getCurrentPosition();

  const data = convertSalon(salon);

  return (
    <Dialog
      fullScreen
      aria-labelledby="simple-dialog-title"
      open={open}
      TransitionComponent={Transition}
    >
      <AppBar position="static" className={classes.navigation}>
        <AreaSafe />
        <Toolbar>
          <Grid container justify="flex-end">
            <Grid item>
              <Button
                icon="close"
                type="iconButton"
                onClick={onClose}
                className={classes.btnClose}
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <MapView location={position} salons={data} />
    </Dialog>
  );
}

Map.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  salon: PropTypes.object,
};

export default memo(Map);
