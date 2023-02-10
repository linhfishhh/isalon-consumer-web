/**
 *
 * Layout
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuAccountIcon,
  MenuBookingHistoryIcon,
  // MenuGalleryIcon,
  MenuPurchaseHistoryIcon,
  MenuNotificationIcon,
} from 'assets/svgIcon';
import { WalletIcon } from 'assets/svgIcon/WalletIcon';
import { path } from 'routers/path';

import { useAuthentication } from 'utils/hooks';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';

import Loading from 'containers/LoadingInPage';

import { makeSelectCartQuantity } from 'containers/Cart/selectors';
import { CONTEXT as CART_CONTEXT } from 'containers/Cart/constants';
import { getCartQuantityRequest } from 'containers/Cart/actions';
import cartReducer from 'containers/Cart/reducer';
import cartSaga from 'containers/Cart/saga';
import { makeSelectTotalNotificationCount } from 'containers/NotificationList/selectors';
import notifyReducer from 'containers/NotificationList/reducer';
import notifySaga from 'containers/NotificationList/saga';
import {
  getNotificationCountRequest,
  getShopNotificationCountRequest,
} from 'containers/NotificationList/actions';
import { CONTEXT as NOTIFY_CONTEXT } from 'containers/NotificationList/constants';

import Header from './views/Header';
import Footer from './views/Footer';

const useStyles = makeStyles(() => ({
  mainContent: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 160px)',
    backgroundColor: '#f3f3f4',
  },
}));

export function PersonalLayout(props) {
  useInjectReducer({ key: NOTIFY_CONTEXT, reducer: notifyReducer });
  useInjectSaga({ key: NOTIFY_CONTEXT, saga: notifySaga });
  useInjectReducer({ key: CART_CONTEXT, reducer: cartReducer });
  useInjectSaga({ key: CART_CONTEXT, saga: cartSaga });

  const classes = useStyles();
  const {
    authenticated,
    logoutSuccess,
    showInviteDialog,
    userInfoLogged,
    logout,
  } = useAuthentication();

  const {
    children,
    getNotificationCount,
    notificationCount,
    cartQuantity,
    getCartQuantity,
    getShopNotificationCount,
  } = props;

  const items = [
    {
      name: 'Tài khoản',
      url: path.personal,
      icon: <MenuAccountIcon />,
    },
    {
      name: 'Ví tiền',
      url: path.wallet,
      icon: <WalletIcon color="#fff" />,
    },
    {
      name: 'Thông báo',
      url: path.notification,
      icon: <MenuNotificationIcon />,
      count: notificationCount,
    },
    {
      name: 'Lịch sử đặt chỗ',
      url: path.bookingHistory,
      icon: <MenuBookingHistoryIcon />,
    },
    {
      name: 'Lịch sử mua hàng',
      url: path.shoppingHistory,
      icon: <MenuPurchaseHistoryIcon />,
    },
    // {
    //   name: 'Bộ sưu tập',
    //   url: '/tai-khoan/bo-suu-tap',
    //   icon: <MenuGalleryIcon />,
    // },
  ];

  useEffect(() => {
    if (authenticated) {
      getNotificationCount();
      getShopNotificationCount();
      getCartQuantity();
    }
  }, []);

  return (
    <>
      <Header
        authenticated={authenticated}
        userInfoLogged={userInfoLogged}
        items={items}
        cartQuantity={cartQuantity}
        onShowInvite={showInviteDialog}
        logout={logout}
        logoutSuccess={logoutSuccess}
      />
      <div className={classes.mainContent}>{children}</div>
      <Footer />
      <Loading />
    </>
  );
}

PersonalLayout.propTypes = {
  children: PropTypes.node,
  notificationCount: PropTypes.number,
  getNotificationCount: PropTypes.func,
  cartQuantity: PropTypes.number,
  getCartQuantity: PropTypes.func,
  getShopNotificationCount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  notificationCount: makeSelectTotalNotificationCount(),
  cartQuantity: makeSelectCartQuantity(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getNotificationCount: () => dispatch(getNotificationCountRequest()),
    getShopNotificationCount: () => dispatch(getShopNotificationCountRequest()),
    getCartQuantity: () => dispatch(getCartQuantityRequest()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(PersonalLayout);
