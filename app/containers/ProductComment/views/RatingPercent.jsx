import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, LinearProgress, Typography } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import times from 'lodash/times';
import get from 'lodash/get';

const useStyles = makeStyles(theme => ({
  root: {},
  detail: {
    fontSize: 10,
    color: '#808080',
  },
  percentBar: {
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('xs')]: {
      width: 'auto',
    },
    [theme.breakpoints.up('sm')]: {
      width: 140,
    },
    height: 8,
  },
  percentBarMobile: {
    height: 8,
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#f2f2f2',
  },
  barColorPrimary: {
    backgroundColor: '#ffb600',
  },
})(LinearProgress);

function RatingBar(props) {
  const classes = useStyles();
  const { rate, amount, total } = props;
  const percent = useMemo(() => {
    if (total > 0) {
      return (amount * 100) / total;
    }
    return 0;
  }, [amount, total]);

  return (
    <Grid container alignItems="center">
      <Grid item className={classes.alignCenter}>
        <Rating
          className={classes.star}
          readOnly
          value={rate}
          size="small"
          precision={0.5}
        />
      </Grid>
      <Grid item xs>
        <ColorLinearProgress
          variant="determinate"
          value={percent}
          className={classes.percentBar}
          color="primary"
        />
      </Grid>
      <Grid item>
        <Typography display="inline" className={classes.detail}>
          {amount}
        </Typography>
      </Grid>
    </Grid>
  );
}

RatingBar.propTypes = {
  rate: PropTypes.number,
  amount: PropTypes.number,
  total: PropTypes.number,
};

function RatingPercent(props) {
  const { productRate } = props;
  const { numberTotal } = productRate;
  return (
    <Grid container direction="column">
      {times(5, i => (
        <Grid item key={i}>
          <RatingBar
            rate={5 - i}
            amount={get(productRate, `numberRate${5 - i}`, 0)}
            total={numberTotal}
          />
        </Grid>
      ))}
    </Grid>
  );
}

RatingPercent.propTypes = {
  productRate: PropTypes.object,
};

export default memo(RatingPercent);
