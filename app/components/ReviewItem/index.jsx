/**
 *
 * ReviewItem
 *
 */

import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';
import { Grid, Avatar, Typography, Divider, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import {
  ThumbUpAlt as LikeIcon,
  StarBorder as StarBorderIcon,
} from '@material-ui/icons';

import ImageList from 'components/ImageList';

const useStyle = makeStyles(theme => ({
  wrapper: {
    padding: isMobileOnly ? theme.spacing(3, 4) : theme.spacing(4, 8),
  },
  separator: {
    padding: isMobileOnly ? theme.spacing(0, 4) : theme.spacing(0, 8),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
  button: {
    border: `solid 1px ${theme.palette.borderColor[1]}`,
    backgroundColor: 'transparent',
    color: theme.palette.textColor[7],
    boxShadow: 'none',
    '&:hover': {
      backgroundColor: theme.palette.background.paper,
    },
  },
  like: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  likes: {
    borderRight: `solid 1px ${theme.palette.borderColor[1]}`,
    paddingRight: theme.spacing(2),
  },
  name: {
    fontSize: 13,
  },
  date: {
    fontSize: 12,
    color: theme.palette.textColor[2],
  },
  title: {
    fontSize: 17,
  },
  content: {
    color: theme.palette.textColor[2],
  },
  image: {
    marginTop: theme.spacing(2),
  },
}));

function ReviewItem(props) {
  const { data, separator, onLike } = props;
  const classes = useStyle();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container className={classes.wrapper}>
          <Grid item>
            <Avatar src={data.avatar} className={classes.avatar} />
          </Grid>
          <Grid item xs>
            <Typography className={classes.name}>{data.name}</Typography>
            <Typography className={classes.date}>{data.date}</Typography>
            <Grid container justify="space-between" alignItems="center">
              <Grid item>
                <Rating
                  className={classes.star}
                  readOnly
                  value={data.rating}
                  precision={0.5}
                  emptyIcon={<StarBorderIcon fontSize="inherit" />}
                />
              </Grid>
              <Grid item>
                <Fab
                  variant="extended"
                  size="small"
                  className={classes.button}
                  onClick={() => onLike(data.id)}
                >
                  {data.likes > 0 && (
                    <Typography className={classes.likes}>
                      {data.likes}
                    </Typography>
                  )}
                  <LikeIcon
                    className={classes.like}
                    color={data.liked ? 'primary' : 'inherit'}
                  />
                  {isMobileOnly ? '' : 'Hữu ích'}
                </Fab>
              </Grid>
            </Grid>
            <Typography className={classes.title}>
              {`"${data.title}"`}
            </Typography>
            <Typography className={classes.content}>{data.content}</Typography>
            {!isEmpty(data.images) && (
              <ImageList
                data={data.images}
                caption={data.title}
                className={classes.image}
                numberToShow={isMobileOnly ? 3 : 5}
              />
            )}
          </Grid>
        </Grid>
      </Grid>
      {separator && (
        <Grid item xs className={classes.separator}>
          <Divider />
        </Grid>
      )}
    </Grid>
  );
}

ReviewItem.propTypes = {
  data: PropTypes.object,
  separator: PropTypes.bool,
  onLike: PropTypes.func,
};

export default memo(ReviewItem);
