/**
 *
 * SalonHintItem
 *
 */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';

import { currencyFormat, distanceFormat } from 'utils/stringFormat';

const useStyles = makeStyles(theme => ({
  item: {
    padding: theme.spacing(2),
  },
  price: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
  },
  rating: {
    marginLeft: theme.spacing(2),
    color: theme.palette.success.main,
    fontFamily: theme.typography.fontMedium,
  },
  distance: {
    color: theme.palette.grey[500],
    fontSize: 12,
  },
}));

function SalonHintItem(props) {
  const { salon, onClick } = props;
  const classes = useStyles();

  return (
    <ListItem button onClick={onClick} divider className={classes.item}>
      <Grid container direction="column">
        <Grid item xs>
          <Grid container justify="space-between">
            <Grid item xs zeroMinWidth>
              <Typography noWrap>{salon.name}</Typography>
            </Grid>
            <Grid item>
              <Typography align="right" className={classes.rating}>
                {salon.rating.toFixed(1)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid container justify="space-between">
            <Grid item>
              <Typography className={classes.price}>
                {`Từ ${currencyFormat(salon.price_from)}`}
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="right" className={classes.distance}>{`${
                salon.location_name
              } - ${distanceFormat(salon.distance)}`}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

SalonHintItem.propTypes = {
  salon: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(SalonHintItem);
