import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 0),
    backgroundColor: theme.palette.primary.main,
  },
  item: {
    boxShadow: 'none',
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
    margin: theme.spacing(2),
  },
  active: {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Types = props => {
  const { types, active, onChange } = props;

  const classes = useStyles();

  return (
    <Grid container className={classes.wrapper} justify="center">
      {types.map((item, index) => (
        <Grid item key={item.id}>
          <Fab
            variant="extended"
            size="medium"
            className={`${classes.item} ${
              index === active ? classes.active : ''
            }`}
            onClick={() => onChange(index)}
          >
            {item.name}
          </Fab>
        </Grid>
      ))}
    </Grid>
  );
};

Types.propTypes = {
  types: PropTypes.array,
  active: PropTypes.number,
  onChange: PropTypes.func,
};

export default memo(Types);
