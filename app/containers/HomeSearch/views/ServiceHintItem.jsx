/**
 *
 * ServiceHintItem
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
  name: {
    maxWidth: 120,
  },
  price: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
  },
  distance: {
    color: theme.palette.grey[500],
    fontSize: 12,
  },
}));

function ServiceHintItem(props) {
  const { service, onClick } = props;
  const classes = useStyles();

  return (
    <ListItem button onClick={onClick} divider className={classes.item}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item>
          <Typography noWrap className={classes.name}>
            {service.name}
          </Typography>
          <Typography className={classes.price}>
            {`Từ ${currencyFormat(service.price_from)}`}
          </Typography>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography align="right" noWrap>
            {service.salon.name}
          </Typography>
          <Typography align="right" className={classes.distance}>{`${
            service.salon.location_name
          } - ${distanceFormat(service.salon.distance)}`}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

ServiceHintItem.propTypes = {
  service: PropTypes.object,
  onClick: PropTypes.func,
};

export default memo(ServiceHintItem);
