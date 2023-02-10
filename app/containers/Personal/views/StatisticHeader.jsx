import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import WalletSummary from 'components/WalletSummary';
import Link from 'components/Link';

import { path } from 'routers/path';

const useStyles = makeStyles(theme => ({
  box: {
    minWidth: 120,
    height: 100,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    border: 'solid 1px #ddd',
  },
  normal_text: {
    color: theme.palette.textColor[1],
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detail_text: {
    color: theme.palette.textColor[1],
    fontWeight: 'bold',
    fontSize: 25,
    textAlign: 'center',
  },
}));

function StatisticHeader(props) {
  const classes = useStyles();
  const { data, amountCoin, shoppingOrderCount, favoriteProductCount } = props;

  const { bookingOrderCount, favoriteCount } = data;

  return (
    <Grid container spacing={3}>
      <Grid item>
        <Link to={path.wallet} className={classes.box}>
          <WalletSummary amount={amountCoin} />
        </Link>
      </Grid>
      <Grid item>
        <Link to={path.bookingHistory} className={classes.box}>
          <Typography className={classes.normal_text}>ĐẶT CHỖ</Typography>
          <Typography className={classes.detail_text}>
            {bookingOrderCount}
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link to={path.shoppingHistory} className={classes.box}>
          <Typography className={classes.normal_text}>ĐƠN HÀNG</Typography>
          <Typography className={classes.detail_text}>
            {shoppingOrderCount}
          </Typography>
        </Link>
      </Grid>
      <Grid item>
        <Link to={path.favorite} className={classes.box}>
          <Typography className={classes.normal_text}>YÊU THÍCH</Typography>
          <Typography className={classes.detail_text}>
            {favoriteCount + favoriteProductCount}
          </Typography>
        </Link>
      </Grid>
      {/* <Grid item>
        <Typography component='div' className={classes.box}>
            <Typography className={classes.normal_text}>NHẬN XÉT</Typography>
            <Typography className={classes.detail_text}>10</Typography>
        </Typography>
      </Grid> */}
    </Grid>
  );
}

StatisticHeader.propTypes = {
  data: PropTypes.object,
  shoppingOrderCount: PropTypes.number,
  amountCoin: PropTypes.number,
  favoriteProductCount: PropTypes.number,
};

export default memo(StatisticHeader);
