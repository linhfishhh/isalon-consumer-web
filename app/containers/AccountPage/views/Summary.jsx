import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

import { getLoggedInUser } from 'utils/auth';

import { path } from 'routers/path';

import { ReactComponent as EditPhotoIcon } from 'assets/icons/photo.svg';
import { ReactComponent as NotifyIcon } from 'assets/icons/notify.svg';
import { ReactComponent as HistoryBookingIcon } from 'assets/icons/history_booking.svg';
import { ReactComponent as HistoryShopIcon } from 'assets/icons/history_shop.svg';
// import { ReactComponent as GalleryIcon } from 'assets/icons/gallery.svg';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  cover: {
    height: 155,
    backgroundColor: theme.palette.grey[300],
  },
  avatarWrapper: {
    height: theme.spacing(10),
    position: 'relative',
  },
  badgeAvatar: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translate(-50%, 0%)',
  },
  editPhoto: {
    border: 'solid 2px #fff',
    '& svg': {
      width: `${theme.spacing(4)}px !important`,
    },
  },
  avatar: {
    width: 110,
    height: 110,
    border: 'solid 4px #fff',
  },
  iconButton: {
    backgroundColor: theme.palette.grey[300],
    boxShadow: 'none',
    '& svg': {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
  },
  editProfile: {
    boxShadow: 'none',
    padding: theme.spacing(1, 6),
    backgroundColor: theme.palette.grey[200],
    fontWeight: 'normal',
    margin: theme.spacing(3, 0),
  },
  toolBar: {
    padding: theme.spacing(0, 4),
  },
  toolBarItem: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    '& span': {
      textAlign: 'center',
    },
  },
}));

const Summary = props => {
  const { badgeNotify } = props;
  const user = getLoggedInUser();
  const classes = useStyles();
  const history = useHistory();

  const goToPage = router => {
    history.push(router);
  };

  return (
    <Grid container direction="column" className={classes.wrapper}>
      <Grid item>
        <div className={classes.cover} />
      </Grid>
      <Grid item className={classes.avatarWrapper}>
        <Badge
          className={classes.badgeAvatar}
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={
            <Fab
              size="small"
              className={`${classes.iconButton} ${classes.editPhoto}`}
            >
              <EditPhotoIcon />
            </Fab>
          }
        >
          <Avatar alt="avatar" className={classes.avatar} src={user.avatar} />
        </Badge>
      </Grid>
      <Grid item>
        <Typography variant="h3" align="center">
          {user.name}
        </Typography>
      </Grid>
      <Grid item container justify="center">
        <Button
          variant="contained"
          className={classes.editProfile}
          onClick={() => goToPage(path.editProfile)}
        >
          Xem & chỉnh sửa hồ sơ
        </Button>
      </Grid>
      <Grid item>
        <Grid container className={classes.toolBar}>
          <Grid item xs className={classes.toolBarItem}>
            <Fab
              size="small"
              className={classes.iconButton}
              onClick={() => goToPage(path.notification)}
            >
              <Badge color="primary" badgeContent={badgeNotify}>
                <NotifyIcon />
              </Badge>
            </Fab>
            <Typography variant="caption">Thông báo</Typography>
          </Grid>
          <Grid item xs className={classes.toolBarItem}>
            <Fab
              size="small"
              className={classes.iconButton}
              onClick={() => goToPage(path.bookingHistory)}
            >
              <HistoryBookingIcon />
            </Fab>
            <Typography variant="caption">Lịch sử đặt chỗ</Typography>
          </Grid>
          <Grid item xs className={classes.toolBarItem}>
            <Fab
              size="small"
              className={classes.iconButton}
              onClick={() => goToPage(path.shoppingHistory)}
            >
              <HistoryShopIcon />
            </Fab>
            <Typography variant="caption">Lịch sử mua hàng</Typography>
          </Grid>
          {/* <Grid item xs className={classes.toolBarItem}>
            <Fab size="small" className={classes.iconButton}>
              <GalleryIcon />
            </Fab>
            <Typography variant="caption">Bộ sưu tập ảnh</Typography>
          </Grid> */}
        </Grid>
      </Grid>
    </Grid>
  );
};

Summary.propTypes = {
  badgeNotify: PropTypes.number,
};

export default memo(Summary);
