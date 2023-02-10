import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Badge, Grid, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Img from 'components/Img';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  cover: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  normal_text_unread: {
    color: theme.palette.primary.main,
    textAlign: 'left',
    fontWeight: 'bold',
  },
  normal_text: {
    color: theme.palette.grey[700],
    textAlign: 'left',
  },
  detail_text: {
    color: theme.palette.grey[500],
    textAlign: 'left',
  },
  view_detail: {
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  root: {
    paddingBottom: theme.spacing(4),
  },
}));

function NotificationItem(props) {
  const { data, onDetail, onDelete, onRead } = props;
  const { id, read, cover, message, date, type, link } = data;
  const classes = useStyles();

  return (
    <Grid item container className={classes.root}>
      <Grid item xs={1}>
        <Badge
          color="secondary"
          overlap="circle"
          variant="dot"
          invisible={read}
        >
          <Img
            className={classes.cover}
            src={cover}
            alt="cover"
            resizeMode="contain"
          />
        </Badge>
      </Grid>
      <Grid item xs>
        <Grid container direction="column">
          <Grid item xs>
            <Typography
              className={
                read ? classes.normal_text : classes.normal_text_unread
              }
            >
              {message}
            </Typography>
          </Grid>
          <Grid item xs>
            <Grid container direction="row" spacing={3}>
              <Grid item>
                <Typography className={classes.detail_text}>{date}</Typography>
              </Grid>
              <Grid item>
                {((type === 'booking' && link) ||
                  type === 'shop' ||
                  type === 'coin') && (
                  <Typography
                    component="span"
                    onClick={() => onDetail(data, type)}
                    className={classes.view_detail}
                  >
                    Chi tiết
                  </Typography>
                )}
              </Grid>
              {!read && type !== 'system' ? (
                <Grid item>
                  <Typography
                    component="span"
                    className={classes.view_detail}
                    onClick={() => onRead(id, type)}
                  >
                    Đã đọc
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} align="right">
        {type !== 'system' && (
          <IconButton
            aria-label="Xóa"
            component="span"
            onClick={() => onDelete(id, type)}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Grid>
    </Grid>
  );
}

NotificationItem.propTypes = {
  onDelete: PropTypes.func,
  onDetail: PropTypes.func,
  onRead: PropTypes.func,
  data: PropTypes.object,
};

export default memo(NotificationItem);
