import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import shortid from 'shortid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

import DeleteIcon from '@material-ui/icons/Delete';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import defaultImage from 'assets/images/ic_logo.png';

import { makeStyles } from '@material-ui/core/styles';

import EmptyPage from 'components/EmptyPage';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  cover: {
    alignSelf: 'flex-start',
  },
  title_unread: {
    color: `${theme.palette.primary.main} !important`,
  },
  title: {
    color: theme.palette.textColor[1],
    whiteSpace: 'pre-wrap',
    marginBottom: '0 !important',
  },
  date: {
    color: theme.palette.textColor[2],
    display: 'inline',
    fontSize: '12px !important',
  },
  detail: {
    marginLeft: theme.spacing(2),
    color: '#3e76bb',
    fontSize: 12,
  },
  view_detail: {
    marginLeft: theme.spacing(2),
    color: '#3e76bb',
    cursor: 'pointer',
    fontSize: 12,
  },
}));

function ListContent(props) {
  const classes = useStyles();

  const { loading, items = [], onRead, onDelete, onDetail } = props;

  const { length } = items;

  const handleDetail = useCallback(item => {
    if (
      (item.type === 'booking' && item.link) ||
      item.type === 'shop' ||
      item.type === 'coin'
    ) {
      onDetail(item, item.type);
    } else if (!item.read) {
      onRead(item.id, item.type);
    }
  }, []);

  return (
    <>
      {isEmpty(items) ? (
        <>
          {loading ? (
            <>{/* placeholder */}</>
          ) : (
            <EmptyPage
              title="Không có thông báo"
              subTitle="Bạn chưa có thông báo nào, khi nào có chúng sẽ hiển thị tại đây"
            />
          )}
        </>
      ) : (
        <List>
          {items.map((item, index) => (
            <React.Fragment key={shortid.generate()}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Badge
                    color="secondary"
                    variant="dot"
                    invisible={item.read}
                    overlap="circle"
                  >
                    <Avatar
                      className={classes.cover}
                      src={item.cover || defaultImage}
                      alt="cover"
                    />
                  </Badge>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      component="span"
                      className={`${classes.title} ${
                        item.read ? '' : classes.title_unread
                      }`}
                      onClick={() => handleDetail(item)}
                    >
                      {item.message}
                    </Typography>
                  }
                  secondary={
                    <>
                      <Typography component="span" className={classes.date}>
                        {item.date}
                      </Typography>
                      {((item.type === 'booking' && item.link) ||
                        item.type === 'shop' ||
                        item.type === 'coin') && (
                        <Typography
                          component="span"
                          onClick={() => onDetail(item, item.type)}
                          className={classes.detail}
                        >
                          Chi tiết
                        </Typography>
                      )}
                      {!item.read && item.type !== 'system' ? (
                        <Typography
                          component="span"
                          className={classes.view_detail}
                          onClick={() => onRead(item.id, item.type)}
                        >
                          Đã đọc
                        </Typography>
                      ) : null}
                    </>
                  }
                />
                {item.type !== 'system' && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      onClick={() => onDelete(item.id, item.type)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
              {index < length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      )}
    </>
  );
}

ListContent.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array,
  onRead: PropTypes.func,
  onDelete: PropTypes.func,
  onDetail: PropTypes.func,
};

export default memo(ListContent);
