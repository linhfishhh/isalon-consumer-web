/**
 *
 * FeatureBar
 *
 */
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Avatar, Typography } from '@material-ui/core';
import bookingImage from 'assets/images/ic_booking.png';
import shopImage from 'assets/images/ic_shop.png';
import giftImage from 'assets/images/ic_gift.png';
import shareImage from 'assets/images/ic_share.png';

import { isMobileOnly } from 'utils/platform';
import { useAuthentication, useAffiliate } from 'utils/hooks';

import { path } from 'routers/path';

import Link from 'components/Link';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    background: theme.palette.backgroundColor[0],
    borderRadius: isMobileOnly ? theme.spacing(4) : theme.spacing(1.5),
    padding: theme.spacing(4, 0),
    boxShadow: isMobileOnly ? '0px 10px 4px #ddd' : 'none',
    margin: isMobileOnly ? theme.spacing(4) : 0,
    '& p': {
      marginTop: isMobileOnly ? theme.spacing(1) : theme.spacing(2),
      color: theme.palette.textColor[1],
    },
  },
  image: {
    width: isMobileOnly ? 50 : 80,
    height: isMobileOnly ? 50 : 80,
  },
  share: {
    cursor: 'pointer',
  },
}));

function FeatureBar() {
  const classes = useStyle();
  const {
    authenticated,
    showSignInDialog,
    showInviteDialog,
  } = useAuthentication();

  const { affiliateSettings } = useAffiliate();

  const handleShowInviteDialog = () => {
    if (authenticated) {
      showInviteDialog();
    } else {
      showSignInDialog();
    }
  };

  return (
    <div className={classes.wrapper}>
      <Grid container justify="center">
        <Grid item md={8} sm={10} xs>
          <Grid container justify="space-around">
            <Grid item>
              <Link to={path.bookingHome}>
                <Avatar
                  className={classes.image}
                  src={bookingImage}
                  alt="booking"
                />
                <Typography align="center">Booking</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to={path.productHome}>
                <Avatar
                  className={classes.image}
                  src={shopImage}
                  alt="shoping"
                />
                <Typography align="center">Shop</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/">
                <Avatar className={classes.image} src={giftImage} alt="gift" />
                <Typography align="center">Quà tặng</Typography>
              </Link>
            </Grid>
            {affiliateSettings.affiliateEnabled && authenticated && (
              <Grid item>
                <Typography
                  className={classes.share}
                  component="div"
                  onClick={handleShowInviteDialog}
                >
                  <Avatar
                    className={classes.image}
                    src={shareImage}
                    alt="share"
                  />
                  <Typography align="center">Chia sẻ</Typography>
                </Typography>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default memo(FeatureBar);
