/**
 *
 * Account
 *
 */
import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Popper } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

import Button from 'components/Button';
import Popover from 'components/Popover';

import { useAffiliate } from 'utils/hooks';

import AccountCart from 'containers/AccountCart';
import AccountNotification from 'containers/AccountNotification';
import { path } from 'routers/path';

import AccountMenu from './AccountMenu';
import AccountBooking from './AccountBooking';
import CartNotification from './CartNotification';

const useStyles = makeStyles(theme => ({
  wrapperButton: {
    height: 104,
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.backgroundColor[2],
  },
  avatar: {
    marginRight: 15,
    marginLeft: 15,
    height: 104,
    display: 'flex',
    alignItems: 'center',
  },
  bigAvatar: {
    width: 60,
    height: 60,
    marginLeft: 10,
    cursor: 'pointer',
    boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
      theme.palette.borderColor[0],
    )}, 0.5)`,
  },
  signInButton: {
    marginRight: 20,
    marginLeft: 20,
    borderRadius: 20,
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
      theme.palette.borderColor[0],
    )}, 0.5)`,
    '&:hover': {
      boxShadow: `0 8px 4px rgba(${theme.hexToRgb(
        theme.palette.borderColor[0],
      )}, 0.5)`,
    },
  },
  popper: {
    marginTop: 1,
  },
}));

const links = [
  { id: 'profile', name: 'Xem & Chỉnh sửa hồ sơ', link: path.personal },
  {
    id: 'history',
    name: 'Quản lý đặt chỗ & mua hàng',
    link: path.bookingHistory,
  },
  { id: 'favorite', name: 'Yêu thích', link: path.favorite },
];

const Account = props => {
  const {
    authenticated,
    userInfoLogged,
    onSignIn,
    onSignOut,
    openCartNotification,
    closeCartNotification,
    cartQuantity,
    notificationCount,
    bookingWaiting,
    onShowInviteDialog,
  } = props;

  const classes = useStyles();
  const [showPopover, setShowPopover] = useState(false);
  const [type, setType] = useState('');
  const [anchorEl, setAnchorEl] = useState();
  const cartButton = useRef();
  const [menu, setMenu] = useState([...links]);
  const { affiliateSettings } = useAffiliate();

  useEffect(() => {
    if (affiliateSettings.affiliateEnabled) {
      const newMenu = [...links];
      newMenu.splice(2, 0, { id: 'invite', name: 'Mời bạn bè' });
      setMenu(newMenu);
    }
  }, [affiliateSettings]);

  const handleShowPopover = name => event => {
    setAnchorEl(event.currentTarget.parentNode);
    setType(name);
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setAnchorEl();
    setShowPopover(false);
  };

  const handleClosePopper = () => {
    closeCartNotification();
  };

  useEffect(() => {
    if (openCartNotification === true && cartButton) {
      cartButton.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [openCartNotification]);

  return (
    <>
      {authenticated ? (
        <>
          <div className={classes.wrapperButton}>
            <Button
              className={classes.button}
              icon="notification"
              type="iconButton"
              onClick={handleShowPopover('notification')}
              badgeNumber={notificationCount}
              fontSize="small"
            />
          </div>
          <div className={classes.wrapperButton}>
            <Button
              className={classes.button}
              icon="booking"
              type="iconButton"
              onClick={handleShowPopover('booking')}
              fontSize="small"
              badgeNumber={bookingWaiting.total || 0}
            />
          </div>
          <div className={classes.wrapperButton} ref={cartButton}>
            <Button
              className={classes.button}
              icon="cart"
              type="iconButton"
              onClick={handleShowPopover('cart')}
              badgeNumber={cartQuantity}
              fontSize="small"
            />
          </div>
          <div className={classes.avatar}>
            <Avatar
              alt="avatar"
              className={classes.bigAvatar}
              src={userInfoLogged.avatar}
              onClick={handleShowPopover('profile')}
            />
          </div>
        </>
      ) : (
        <Button
          className={classes.signInButton}
          icon="user"
          name="Đăng nhập"
          options={{ showIcon: true, iconColor: '#fff' }}
          onClick={onSignIn}
        />
      )}
      <Popover
        open={showPopover}
        onClose={handleClosePopover}
        anchorEl={anchorEl}
        align="right"
      >
        {type === 'profile' && (
          <AccountMenu
            menu={menu}
            onSignOut={onSignOut}
            onClosePopover={handleClosePopover}
            onShowInviteDialog={onShowInviteDialog}
            userInfo={userInfoLogged}
          />
        )}
        {type === 'notification' && <AccountNotification />}
        {type === 'booking' && <AccountBooking data={bookingWaiting.orders} />}
        {type === 'cart' && (
          <AccountCart onClickCart={() => setShowPopover(false)} />
        )}
      </Popover>
      <Popper
        open={openCartNotification}
        anchorEl={cartButton.current}
        transition
        placement="bottom-end"
        disablePortal={false}
        className={classes.popper}
        modifiers={{
          flip: {
            enabled: true,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'scrollParent',
          },
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClosePopper}>
              <div>
                <CartNotification
                  closeNotification={handleClosePopper}
                  onGoToCart={handleClosePopper}
                />
              </div>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </>
  );
};

Account.propTypes = {
  authenticated: PropTypes.bool,
  userInfoLogged: PropTypes.object,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
  openCartNotification: PropTypes.bool,
  closeCartNotification: PropTypes.func,
  cartQuantity: PropTypes.number,
  notificationCount: PropTypes.number,
  bookingWaiting: PropTypes.object,
  onShowInviteDialog: PropTypes.func,
};

export default Account;
