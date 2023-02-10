import React, { memo, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  IconButton,
  GridList,
  GridListTile,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { v1 } from 'uuid';
import Img from 'components/Img';
import get from 'lodash/get';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { toDate } from 'date-fns-tz';
import vi from 'date-fns/locale/vi';

import { useBreakpointValues } from 'utils/hooks';
import { isMobileOnly } from 'utils/platform';

import { ThumbIcon, ThumbIconLiked } from 'assets/svgIcon/ThumbIcon';
import useStyles from '../styles';

function CommentItem(props) {
  const classes = useStyles();
  const {
    data = {},
    onLikeOrUnlikeReview,
    authenticated,
    showSignInDialog,
  } = props;
  const [fancybox] = useState(v1());
  const cols = useBreakpointValues({ xs: 3.5, sm: 4, md: 5 });

  const commentDate = useMemo(() => {
    const commentDateStr = get(data, 'createdAt');
    if (commentDateStr) {
      const d = toDate(commentDateStr, { timeZone: 'UTC' });
      return formatDistanceToNow(d, { locale: vi, addSuffix: true });
    }
    return '';
  }, [data]);

  const images = get(data, 'collection.images', []);
  const onThumbButtonClicked = () => {
    if (authenticated) {
      onLikeOrUnlikeReview(data);
    } else {
      showSignInDialog();
    }
  };

  return (
    <div className={classes.commentItemRoot}>
      <Grid container spacing={3}>
        <Grid item>
          <Img
            src={get(data, 'profile.avatar', '')}
            className={classes.commentAvatar}
          />
        </Grid>
        <Grid item xs>
          <Typography className={classes.commentTitle}>
            {get(data, 'profile.fullName', '')}
          </Typography>
          <Typography className={classes.commentDetail}>
            {commentDate}
          </Typography>
          <Grid container alignItems="center">
            <Grid item>
              <Rating
                readOnly
                value={get(data, 'rate', 0)}
                size="small"
                precision={0.5}
              />
            </Grid>
            <Grid item xs />
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
            {/* <Grid item>
                  <IconButton>
                    <MoreIcon />
                  </IconButton>
                </Grid> */}
          </Grid>
          <Grid container direction="column">
            <Grid item>
              <Typography className={classes.commentTitle}>
                {get(data, 'title', '')}
              </Typography>
            </Grid>
            <Grid item>
              <Typography className={classes.commentDetail}>
                {get(data, 'comment', '')}
              </Typography>
            </Grid>
          </Grid>
          <div className={classes.gridRoot}>
            <GridList
              cols={cols}
              spacing={isMobileOnly ? 8 : 16}
              className={classes.gridList}
              cellHeight={isMobileOnly ? 80 : 130}
            >
              {images.map((item, index) => (
                <GridListTile
                  key={item.imageId || index}
                  // className={classes.commentImageContainer}
                >
                  <a href={item.imageLocation} data-fancybox={fancybox}>
                    <Img
                      src={item.thumb256}
                      className={classes.commentImage}
                      resizeMode="cover"
                    />
                  </a>
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

CommentItem.propTypes = {
  data: PropTypes.object,
  onLikeOrUnlikeReview: PropTypes.func,
  authenticated: PropTypes.bool,
  showSignInDialog: PropTypes.func,
};

export default memo(CommentItem);
