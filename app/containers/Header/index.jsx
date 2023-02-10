/**
 *
 * Header
 *
 */

import React, { memo, useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import take from 'lodash/take';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useLocation, Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication, useSearchConfig } from 'utils/hooks';

import Logo from 'assets/images/logo.png';
import { ReactComponent as MenuIcon } from 'assets/icons/menu.svg';
import { path } from 'routers/path';
import Img from 'components/Img';
import Menu from 'components/Menu';
import UserLocation from 'containers/UserLocation';

import { getSpotlightsRequest } from 'containers/ProductHomePage/actions';
import { getCartQuantityRequest } from 'containers/Cart/actions';
import { getBookingWaitingRequest } from 'containers/HistoryPage/actions';
import {
  getNotificationCountRequest,
  getShopNotificationCountRequest,
} from 'containers/NotificationList/actions';

import { makeSelectSpotlights } from 'containers/ProductHomePage/selectors';
import { makeSelectCartQuantity } from 'containers/Cart/selectors';
import { makeSelectWaitingBooking } from 'containers/HistoryPage/selectors';
import { makeSelectTotalNotificationCount } from 'containers/NotificationList/selectors';

import homeShopReducer from 'containers/ProductHomePage/reducer';
import cartReducer from 'containers/Cart/reducer';
import historyReducer from 'containers/HistoryPage/reducer';
import notificationReducer from 'containers/NotificationList/reducer';

import homeShopSaga from 'containers/ProductHomePage/saga';
import cartSaga from 'containers/Cart/saga';
import historySaga from 'containers/HistoryPage/saga';
import notificationSaga from 'containers/NotificationList/saga';

import { CONTEXT as HOME_SHOP_CONTEXT } from 'containers/ProductHomePage/constants';
import { CONTEXT as CART_CONTEXT } from 'containers/Cart/constants';
import { CONTEXT as NOTIFICATION_CONTEXT } from 'containers/NotificationList/constants';

import { CONTEXT as HISTORY_CONTEXT } from 'containers/HistoryPage/constants';

import { showCartNotificationRequest } from './actions';
import { makeSelectOpenCartNotification } from './selectors';
import Account from './views/Account';
import DrawerMenu from './views/DrawerMenu';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: 104,
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
  },
  rootAccount: {
    display: 'flex',
    alignItems: 'center',
    height: 104,
  },
  flexGrowLeft: {
    flexGrow: 1,
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  flexGrowRight: {
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    },
  },
  menu: {
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  menuButton: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
    width: 44,
    height: 44,
    borderRadius: '50%',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#cccccc33',
    },
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
    color: theme.palette.grey[900],
    margin: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

export function Header(props) {
  useInjectReducer({ key: HOME_SHOP_CONTEXT, reducer: homeShopReducer });
  useInjectSaga({ key: HOME_SHOP_CONTEXT, saga: homeShopSaga });
  useInjectReducer({ key: CART_CONTEXT, reducer: cartReducer });
  useInjectSaga({ key: CART_CONTEXT, saga: cartSaga });
  useInjectReducer({ key: NOTIFICATION_CONTEXT, reducer: notificationReducer });
  useInjectSaga({ key: NOTIFICATION_CONTEXT, saga: notificationSaga });
  useInjectReducer({ key: HISTORY_CONTEXT, reducer: historyReducer });
  useInjectSaga({ key: HISTORY_CONTEXT, saga: historySaga });

  const {
    dispatch,
    openCartNotification,
    cartQuantity,
    getCartQuantity,
    spotlights,
    getSpotlights,
    getNotificationCount,
    notificationCount,
    bookingWaiting,
    getBookingWaiting,
    getShopNotificationCount,
    onlyAccountView,
  } = props;

  const {
    authenticated,
    showSignInDialog,
    logout,
    showInviteDialog,
    userInfoLogged,
  } = useAuthentication();
  const { searchConfig } = useSearchConfig();
  const serviceCategories = useMemo(() => searchConfig.cats, [searchConfig]);

  const classes = useStyles();
  const location = useLocation();

  const [menuItems, setMenuItems] = useState();
  const [openDrawerMenu, setOpenDrawerMenu] = useState(false);

  const fetchDataAuthenticated = () => {
    if (authenticated && !onlyAccountView) {
      getCartQuantity();
      getBookingWaiting();
      getNotificationCount();
      getShopNotificationCount();
    }
  };

  useEffect(() => {
    if (isEmpty(spotlights)) {
      getSpotlights();
    }
  }, []);

  useEffect(() => {
    fetchDataAuthenticated();
  }, [authenticated]);

  useEffect(() => {
    setOpenDrawerMenu(false);
  }, [location]);

  const bookingServices = useMemo(() => {
    if (serviceCategories && serviceCategories.length > 0) {
      return take(
        serviceCategories.map(item => ({
          id: item.id,
          name: item.name,
          url: `${path.bookingSearch}?cat[]=${item.id}`,
        })),
        5,
      );
    }
    return [];
  }, [serviceCategories]);

  const shopCategories = useMemo(() => {
    if (spotlights) {
      let categoryItem;
      for (let i = 0; i < spotlights.length; i += 1) {
        const s = spotlights[i];
        if (s.type === 'category') {
          categoryItem = s;
          break;
        }
      }

      if (categoryItem) {
        const cats = get(categoryItem, 'category.subCategories', []);
        return take(
          cats.map(item => ({
            id: item.categoryId,
            name: item.name,
            url: `${path.productSearch}?categoryIds=${item.categoryId}`,
          })),
          5,
        );
      }
    }
    return [];
  }, [spotlights]);

  useEffect(() => {
    const items = [
      {
        name: 'Trang chủ',
        url: path.home,
      },
      {
        name: 'Làm đẹp',
        url: path.bookingHome,
        sub: bookingServices,
      },
      {
        name: 'Sản phẩm',
        url: path.productHome,
        sub: shopCategories,
      },
      {
        name: 'Tin tức',
        url: path.news,
        targetBlank: true,
      },
    ];
    setMenuItems(items);
  }, [bookingServices, shopCategories]);

  const handlOpenDrawerMenu = () => {
    setOpenDrawerMenu(!openDrawerMenu);
  };

  return (
    <>
      {onlyAccountView ? (
        <div className={classes.rootAccount}>
          <Account
            authenticated={authenticated}
            userInfoLogged={userInfoLogged}
            onSignIn={showSignInDialog}
            onSignOut={logout}
            openCartNotification={openCartNotification}
            closeCartNotification={() =>
              dispatch(showCartNotificationRequest(false))
            }
            cartQuantity={cartQuantity}
            notificationCount={notificationCount}
            bookingWaiting={bookingWaiting}
            onShowInviteDialog={showInviteDialog}
          />
        </div>
      ) : (
        <div className={classes.root}>
          <AppBar position="static" color="inherit" elevation={0}>
            <Toolbar>
              <button
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handlOpenDrawerMenu}
                type="button"
              >
                <MenuIcon style={{ width: 22 }} />
              </button>
              <div className={classes.logo}>
                <Link to={path.home}>
                  <Img src={Logo} alt="isalon" resizeMode="contain" />
                </Link>
              </div>
              <div className={classes.flexGrowLeft} />
              <Menu className={classes.menu} items={menuItems} />
              <UserLocation />
              <div className={classes.flexGrowRight} />
              <Link
                to={path.becomeSalonManager}
                color="inherit"
                className={classes.link}
              >
                Đăng ký chủ Salon
              </Link>
              <Account
                authenticated={authenticated}
                userInfoLogged={userInfoLogged}
                onSignIn={showSignInDialog}
                onSignOut={logout}
                openCartNotification={openCartNotification}
                closeCartNotification={() =>
                  dispatch(showCartNotificationRequest(false))
                }
                cartQuantity={cartQuantity}
                notificationCount={notificationCount}
                bookingWaiting={bookingWaiting}
                onShowInviteDialog={showInviteDialog}
              />
            </Toolbar>
          </AppBar>
          <DrawerMenu
            items={menuItems}
            open={openDrawerMenu}
            onClose={handlOpenDrawerMenu}
          />
        </div>
      )}
    </>
  );
}

Header.propTypes = {
  dispatch: PropTypes.func,
  openCartNotification: PropTypes.bool,
  cartQuantity: PropTypes.number,
  getCartQuantity: PropTypes.func,
  spotlights: PropTypes.array,
  getSpotlights: PropTypes.func,
  getNotificationCount: PropTypes.func,
  notificationCount: PropTypes.number,
  bookingWaiting: PropTypes.object,
  getBookingWaiting: PropTypes.func,
  getShopNotificationCount: PropTypes.func,
  onlyAccountView: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  openCartNotification: makeSelectOpenCartNotification(),
  cartQuantity: makeSelectCartQuantity(),
  spotlights: makeSelectSpotlights(),
  notificationCount: makeSelectTotalNotificationCount(),
  bookingWaiting: makeSelectWaitingBooking(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getCartQuantity: () => dispatch(getCartQuantityRequest()),
    getSpotlights: () => dispatch(getSpotlightsRequest()),
    getNotificationCount: () => dispatch(getNotificationCountRequest()),
    getBookingWaiting: () => dispatch(getBookingWaitingRequest()),
    getShopNotificationCount: () => dispatch(getShopNotificationCountRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Header);
