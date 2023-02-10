import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles, darken } from '@material-ui/core/styles';

import { isMobileOnly } from 'utils/platform';
import { coinFormat } from 'utils/stringFormat';

import { ReactComponent as BountyIcon } from 'assets/icons/bounty.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {
    backgroundColor: 'transparent',
  },
  wrapperIcon: {
    width: 200,
    height: 150,
  },
  bountyIcon: {
    width: 200,
    position: 'absolute',
  },
  content: {
    padding: isMobileOnly
      ? theme.spacing(12, 4, 4, 4)
      : theme.spacing(12, 8, 8, 8),
    backgroundColor: '#fff',
    borderRadius: isMobileOnly ? theme.spacing(4) : theme.spacing(6),
  },
  title: {
    fontFamily: theme.typography.fontMedium,
  },
  subTitle: {
    margin: theme.spacing(2, 0),
    color: theme.palette.grey[500],
    fontFamily: theme.typography.fontMedium,
  },
  caption: {
    padding: theme.spacing(2, 10),
    textAlign: 'center',
  },
  price: {
    color: theme.palette.primary.main,
    fontFamily: theme.typography.fontMedium,
    fontSize: 36,
    fontWeight: 'bold',
  },
  unit: {
    fontSize: 18,
    fontFamily: theme.typography.fontMedium,
  },
  button: {
    height: 44,
    borderRadius: 22,
  },
  discover: {
    backgroundColor: '#27a9e0',
    color: '#fff',
    '&:hover': {
      backgroundColor: darken('#27a9e0', 0.1),
    },
  },
}));

const Success = props => {
  const { onGotoWallet, onClose, affiliateInfo } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      className={classes.wrapper}
    >
      <Grid item className={classes.wrapperIcon}>
        <BountyIcon className={classes.bountyIcon} />
      </Grid>
      <Grid item>
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.content}
        >
          <Typography className={classes.title} variant="h4">
            Chào mừng bạn!
          </Typography>
          <Typography className={classes.subTitle} variant="h6">
            Quà tặng của bạn là
          </Typography>
          <Typography className={classes.price}>
            {coinFormat(affiliateInfo.inviteeRewardCoin)}
          </Typography>
          <Typography className={classes.caption}>
            Lưu ý: Quà tặng của bạn được dùng cho các đơn đặt chỗ và mua sản
            phẩm tại iSalon.
          </Typography>
          <Grid container justify="space-around">
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={onGotoWallet}
              >
                Tới ví iSalon
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                className={`${classes.button} ${classes.discover}`}
                onClick={onClose}
              >
                Khám phá
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Success.propTypes = {
  onGotoWallet: PropTypes.func,
  onClose: PropTypes.func,
  affiliateInfo: PropTypes.object,
};

export default memo(Success);
