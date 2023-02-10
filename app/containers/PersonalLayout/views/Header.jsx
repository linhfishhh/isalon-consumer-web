/**
 *
 * Header
 *
 */

import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { isMobileOnly } from 'utils/platform';
import { AppBar, Toolbar, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import history from 'utils/history';
import IconButton from '@material-ui/core/IconButton';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';

import Link from 'components/Link';
import Img from 'components/Img';
import Logo from 'assets/images/logo_white.png';

import DrawerMenu from 'containers/Header/views/DrawerMenu';

import Menu from './Menu';
import Account from './Account';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 90,
    backgroundColor: '#21232d',
    position: 'sticky',
    top: 0,
    zIndex: 2,
  },
  appbar: {
    backgroundColor: '#21232d',
  },
  flexGrowLeft: {
    flexGrow: 1,
  },
  flexGrowRight: {
    flexGrow: 1,
  },
  logo: {
    width: 100,
    marginLeft: 15,
    marginRight: 15,
    '& img': {
      height: 25,
      verticalAlign: 'sub',
    },
  },
  link: {
    margin: theme.spacing(1),
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  menu: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

export function Header(props) {
  const {
    authenticated,
    userInfoLogged,
    logout,
    items,
    cartQuantity,
    logoutSuccess,
    onShowInvite,
  } = props;
  const classes = useStyles();

  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

  useEffect(() => {
    if (logoutSuccess && !isMobileOnly) {
      history.push('/');
    }
  }, [logoutSuccess]);

  const onSignOut = () => {
    logout();
  };

  const handlOpenDrawerMenu = () => {
    setOpenDrawerMenu(!openDrawerMenu);
  };

  return (
    <Grid container className={classes.root} alignItems="center">
      <Grid item xs={12}>
        <AppBar position="static" className={classes.appbar} elevation={0}>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={handlOpenDrawerMenu}
            >
              <MenuIcon style={{ width: 22 }} />
            </IconButton>
            <div className={classes.logo}>
              <Link to="/">
                <Img src={Logo} alt="isalon" resizeMode="contain" />
              </Link>
            </div>
            <div className={classes.flexGrowLeft} />
            <Menu items={items} className={classes.menu} />
            <div className={classes.flexGrowRight} />
            <Account
              authenticated={authenticated}
              userInfoLogged={userInfoLogged}
              onSignOut={onSignOut}
              cartQuantity={cartQuantity}
              onShowInvite={onShowInvite}
            />
          </Toolbar>
        </AppBar>
      </Grid>
      <DrawerMenu
        items={items}
        open={openDrawerMenu}
        onClose={handlOpenDrawerMenu}
      />
    </Grid>
  );
}

Header.propTypes = {
  authenticated: PropTypes.bool,
  userInfoLogged: PropTypes.object,
  items: PropTypes.array,
  cartQuantity: PropTypes.number,
  logoutSuccess: PropTypes.bool,
  logout: PropTypes.func,
  onShowInvite: PropTypes.func,
};

export default memo(Header);
