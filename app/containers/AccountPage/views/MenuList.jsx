import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import AlertDialog from 'components/AlertDialog';

import { path } from 'routers/path';
import { useAffiliate } from 'utils/hooks';

import { WalletIcon } from 'assets/svgIcon/WalletIcon';

import { ReactComponent as FavoriteIcon } from 'assets/icons/favorite.svg';
import { ReactComponent as TOSIcon } from 'assets/icons/tos.svg';
import { ReactComponent as InfoIcon } from 'assets/icons/info.svg';
import { ReactComponent as GiftIcon } from 'assets/icons/gift.svg';
import { ReactComponent as SignInIcon } from 'assets/icons/user.svg';
import { ReactComponent as SignOutIcon } from 'assets/icons/logout.svg';
import { ReactComponent as AddressBookIcon } from 'assets/icons/addressBook.svg';

const AllMenu = [
  {
    id: 'wallet',
    name: 'Ví iSalon',
    icon: <WalletIcon />,
    path: path.wallet,
    private: true,
  },
  {
    id: 'address',
    name: 'Sổ địa chỉ',
    icon: <AddressBookIcon />,
    path: path.addressBook,
    private: true,
  },
  {
    id: 'favorite',
    name: 'Yêu thích',
    icon: <FavoriteIcon />,
    path: path.favorite,
    private: true,
  },
  {
    id: 'invite',
    name: 'Mời bạn bè',
    icon: <GiftIcon />,
    private: true,
    caption: 'Kiếm tiền từ những chia sẻ của bạn',
  },
  {
    id: 'support',
    name: 'Trợ giúp',
    icon: <InfoIcon />,
    path: path.help,
    private: false,
  },
  {
    id: 'tos',
    name: 'Điều khoản dịch vụ',
    icon: <TOSIcon />,
    path: path.termOfUse,
    private: false,
  },
  {
    id: 'signIn',
    name: 'Đăng nhập',
    icon: <SignInIcon />,
    private: false,
  },
  {
    id: 'signOut',
    name: 'Đăng xuất',
    icon: <SignOutIcon />,
    private: true,
  },
];

const useStyles = makeStyles(theme => ({
  wrapper: {
    '& svg': {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  item: {
    padding: theme.spacing(3, 0),
  },
  versionItem: {
    textAlign: 'center',
    fontSize: 12,
    color: theme.palette.grey[600],
    fontStyle: 'italic',
  },
  icon: {
    display: 'flex',
    justifyContent: 'center',
  },
  separetor: {
    marginLeft: theme.spacing(14),
  },
  multipleLine: {
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    '& span': {
      lineHeight: 'normal',
    },
  },
  caption: {
    color: theme.palette.grey[400],
    fontSize: 10,
  },
}));

const MenuList = props => {
  const { authenticated, onSignIn, onSignOut, onShowInvite } = props;

  const classes = useStyles();
  const history = useHistory();

  const [openConfirm, setOpenConfirm] = useState(false);
  const { affiliateSettings } = useAffiliate();

  const onConfirmCancelSignOut = () => {
    setOpenConfirm(false);
  };

  const onConfirmSignOut = () => {
    setOpenConfirm(false);
    onSignOut();
  };

  const menu = AllMenu.filter(item => {
    if (item.id === 'signIn') {
      return !authenticated;
    }
    if (item.id === 'invite') {
      return affiliateSettings.affiliateEnabled && authenticated;
    }
    return !item.private || (item.private && authenticated);
  });

  const handleClick = item => {
    if (item.id === 'signIn') {
      onSignIn();
    }
    if (item.id === 'signOut') {
      setOpenConfirm(true);
    }
    if (item.id === 'invite') {
      onShowInvite();
    }
    if (item.path) {
      history.push(item.path);
    }
  };

  const renderItem = React.useCallback(
    item => (
      <React.Fragment key={item.id}>
        <ListItem
          className={classes.item}
          disableGutters
          onClick={() => handleClick(item)}
        >
          <ListItemIcon className={classes.icon}>{item.icon}</ListItemIcon>
          <ListItemText
            primary={item.name}
            className={item.caption ? classes.multipleLine : ''}
            secondary={
              <Typography variant="caption" className={classes.caption}>
                {item.caption}
              </Typography>
            }
          />
        </ListItem>
        <Divider className={classes.separetor} component="li" />
      </React.Fragment>
    ),
    [],
  );

  return (
    <>
      <List className={classes.wrapper}>
        {menu.map(item => renderItem(item))}
        <ListItem className={classes.versionItem} disableGutters>
          <ListItemText
            disableTypography
            primary={`Phiên bản ${VERSION} iSalon team`}
          />
        </ListItem>
      </List>
      <AlertDialog
        open={openConfirm}
        description="Bạn có chắc chắn muốn đăng xuất không?"
        onCancel={onConfirmCancelSignOut}
        onConfirm={onConfirmSignOut}
      />
    </>
  );
};

MenuList.propTypes = {
  authenticated: PropTypes.bool,
  onSignIn: PropTypes.func,
  onSignOut: PropTypes.func,
  onShowInvite: PropTypes.func,
};

export default memo(MenuList);
