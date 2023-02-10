import React, { memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Grid, Avatar, Typography, IconButton } from '@material-ui/core';
import { ThumbIcon, ThumbIconLiked } from 'assets/svgIcon/ThumbIcon';
import get from 'lodash/get';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toDate } from 'date-fns-tz';
import vi from 'date-fns/locale/vi';

import defaultThumbnail from 'assets/images/ic_logo.png';
import useStyles from '../styles';

function ReplyCommentItem(props) {
  const classes = useStyles();
  const {
    data = {},
    onLikeOrUnlikeReviewReply,
    authenticated,
    showSignInDialog,
  } = props;
  const commentDate = useMemo(() => {
    const commentDateStr = get(data, 'createdAt');
    if (commentDateStr) {
      const d = toDate(commentDateStr, { timeZone: 'UTC' });
      return formatDistanceToNow(d, { locale: vi, addSuffix: true });
    }
    return '';
  }, [data]);

  const onThumbButtonClicked = () => {
    if (authenticated) {
      onLikeOrUnlikeReviewReply(data);
    } else {
      showSignInDialog();
    }
  };

  return (
    <div className={classes.replyCommentItemRoot}>
      <Grid container spacing={3}>
        <Grid item>
          <Avatar src={defaultThumbnail} />
        </Grid>
        <Grid item xs>
          <Grid container direction="column">
            <Grid item>
              <Typography className={classes.commentTitle}>
                Phản hồi từ nhà bán hàng
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.commentDetail}>
                {commentDate}
              </Typography>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item xs>
                  <Typography className={classes.commentDetail}>
                    {get(data, 'message', '')}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={onThumbButtonClicked}>
                    {get(data, 'isLiked', false) === true ? (
                      <ThumbIconLiked />
                    ) : (
                      <ThumbIcon />
                    )}
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography display="inline">
                    {get(data, 'numLikes', 0)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

ReplyCommentItem.propTypes = {
  data: PropTypes.object,
  onLikeOrUnlikeReviewReply: PropTypes.func,
  authenticated: PropTypes.bool,
  showSignInDialog: PropTypes.func,
};

export default memo(ReplyCommentItem);
