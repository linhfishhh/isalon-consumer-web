/**
 *
 * Header
 *
 */

import React, { memo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { useAuthentication } from 'utils/hooks';

import { path } from 'routers/path';

import AreaSafe from 'components/AreaSafe';

import { SignInIcon } from 'assets/svgIcon';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: theme.spacing(2, 4),
    background: 'linear-gradient(90deg, #ff5c39 0%, #D91C5C 100%)',
  },
  areaSafe: {
    background: 'linear-gradient(90deg, #ff5c39 0%, #D91C5C 100%)',
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontFamily: theme.typography.fontMedium,
    fontWeight: 'bold',
    lineHeight: 'normal',
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  signIn: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    padding: 0,
    '& svg': {
      width: 25,
      height: 25,
    },
  },
}));

function Header() {
  const classes = useStyle();
  const history = useHistory();
  const {
    authenticated,
    showSignInDialog,
    userInfoLogged,
  } = useAuthentication();

  const gotoAccount = useCallback(() => {
    history.push(path.account);
  });

  return (
    <>
      <AreaSafe className={classes.areaSafe} />
      <Grid container className={classes.wrapper} alignItems="center">
        <Grid item xs>
          <Typography className={classes.label}>Làm đẹp</Typography>
          <Typography className={classes.label}>theo cách của bạn!</Typography>
        </Grid>
        <Grid item>
          {authenticated ? (
            <Avatar
              alt="avatar"
              onClick={gotoAccount}
              className={classes.avatar}
              src={userInfoLogged.avatar}
            />
          ) : (
            <IconButton className={classes.signIn} onClick={showSignInDialog}>
              <SignInIcon color="#fff" />
            </IconButton>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default memo(Header);
