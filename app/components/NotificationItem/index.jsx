/**
 *
 * NotificationItem
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import get from 'lodash/get';
import { ListItem, Avatar, Typography, Grid, Badge } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { path } from 'routers/path';

import defaultImage from 'assets/images/ic_logo.png';

const useStyle = makeStyles(theme => ({
  wrapperItem: {
    padding: 0,
  },
  message: {
    fontSize: 14,
    color: props =>
      (props.read && theme.palette.textColor[2]) || theme.palette.primary.main,
  },
  date: {
    fontSize: 12,
    marginRight: theme.spacing(2),
    color: theme.palette.grey[500],
  },
  root: {
    paddingBottom: theme.spacing(2),
  },
  avatar: {
    width: 44,
    height: 44,
  },
  detail: {
    fontSize: 12,
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
}));

function NotificationItem(props) {
  const { data, type } = props;
  const { title, date, read, cover } = data;
  const classes = useStyle(data);
  const history = useHistory();

  const handleNotificationDetail = () => {
    let destinationPath;
    switch (type) {
      case 'booking': {
        const id = get(data, 'route.params.id');
        destinationPath = `${path.bookingHistory}?id=${id}`;
        break;
      }
      case 'shop': {
        const id = get(data, 'params.orderId');
        destinationPath = `${path.shoppingHistory}?id=${id}`;
        break;
      }
      case 'coin': {
        destinationPath = path.wallet;
        break;
      }
      default: {
        destinationPath = path.notification;
        break;
      }
    }
    if (!isEmpty(destinationPath)) {
      history.push(destinationPath);
    }
  };

  return (
    <ListItem
      className={classes.wrapperItem}
      alignItems="flex-start"
      component="div"
    >
      <Grid container wrap="nowrap" spacing={2} className={classes.root}>
        <Grid item>
          <Badge
            color="secondary"
            overlap="circle"
            variant="dot"
            invisible={read}
          >
            <Avatar
              className={classes.avatar}
              alt="Remy Sharp"
              src={cover || defaultImage}
            />
          </Badge>
        </Grid>
        <Grid item xs zeroMinWidth>
          <Typography className={classes.message}>{title}</Typography>
          <Typography className={classes.date} display="inline">
            {date}
          </Typography>
          <Typography
            className={classes.detail}
            component="span"
            onClick={handleNotificationDetail}
          >
            Chi tiết
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

NotificationItem.propTypes = {
  data: PropTypes.object,
  type: PropTypes.string,
};

export default memo(NotificationItem);
