/**
 *
 * Summary
 *
 */
import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Fab } from '@material-ui/core';
import ArrowIcon from '@material-ui/icons/NavigateNext';
import ShareIcon from '@material-ui/icons/Share';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { FacebookShareButton } from 'react-share';

import { shareFacebook, getLinkShareSalon } from 'utils/share';
import { isNative, isMobileOnly } from 'utils/platform';
import { getSettings } from 'utils/localStorage/settings';

import { FavoriteIcon, FavoredIcon } from 'assets/svgIcon/FavoriteIcon';
import { WriteReviewIcon } from 'assets/svgIcon';

const useStyle = makeStyles(theme => ({
  wrapper: {
    backgroundColor: theme.palette.background.paper,
    padding: isMobileOnly ? theme.spacing(2, 4) : theme.spacing(4, 8),
  },
  average: {
    fontSize: 25,
    display: 'inline',
  },
  star: {
    marginLeft: theme.spacing(2),
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
  },
  reviewNumber: {
    fontSize: 20,
    margin: isMobileOnly ? 0 : theme.spacing(0, 4),
  },
  writeReview: {
    color: theme.palette.textColor[2],
    fontSize: 16,
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  write: {
    width: 30,
    height: 30,
    marginRight: theme.spacing(2),
  },
  favorite: {
    backgroundColor: theme.palette.backgroundColor[1],
    boxShadow: 'none',
  },
  likes: {
    marginLeft: theme.spacing(1),
  },
  share: {
    backgroundColor: `${theme.palette.backgroundColor[1]} !important`,
    boxShadow: 'none',
    marginLeft: theme.spacing(2),
    width: 40,
    height: 40,
    borderRadius: 20,
    outline: 'none',
  },
  marginTop: {
    marginTop: theme.spacing(1),
  },
}));

function Summary(props) {
  const { data, onFavorite, onShowReviewForm } = props;
  const classes = useStyle();
  const shareUrl = window.location.href;
  const settings = getSettings();

  const handlerShare = useCallback(() => {
    const linkShare = getLinkShareSalon(data);
    shareFacebook(linkShare);
  }, [data]);

  const writeReview = (
    <Grid container justify="space-between">
      {settings.rating && (
        <Grid item>
          <Typography className={classes.reviewNumber}>
            {data.ratingCount} đánh giá <ArrowIcon />
          </Typography>
        </Grid>
      )}
      <Grid item>
        <Typography className={classes.writeReview} onClick={onShowReviewForm}>
          <WriteReviewIcon className={classes.write} /> Viết đánh giá
        </Typography>
      </Grid>
    </Grid>
  );

  const favoriteAndShare = (
    <>
      <Fab
        className={classes.favorite}
        variant="extended"
        size="medium"
        onClick={onFavorite}
      >
        {data.liked ? <FavoredIcon /> : <FavoriteIcon />}
        <Typography component="span" className={classes.likes}>
          {data.likes}
        </Typography>
      </Fab>
      {isNative ? (
        <Fab size="medium" className={classes.share} onClick={handlerShare}>
          <ShareIcon fontSize="small" />
        </Fab>
      ) : (
        <FacebookShareButton url={shareUrl} className={classes.share}>
          <ShareIcon fontSize="small" />
        </FacebookShareButton>
      )}
    </>
  );

  return (
    <>
      <Grid
        container
        className={classes.wrapper}
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            {settings.rating && (
              <>
                <Grid item>
                  <Typography className={classes.average}>
                    {data.rating.toFixed(1)}
                  </Typography>
                </Grid>
                <Grid item className={classes.rating}>
                  <Rating
                    className={classes.star}
                    readOnly
                    value={data.rating}
                    size="large"
                    precision={0.5}
                    emptyIcon={<StarBorderIcon fontSize="inherit" />}
                  />
                </Grid>
              </>
            )}
            {(!isMobileOnly || !settings.rating) && (
              <Grid item>{writeReview}</Grid>
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justify="flex-end">
            {favoriteAndShare}
          </Grid>
        </Grid>
      </Grid>
      {isMobileOnly && settings.rating && (
        <Grid container className={`${classes.marginTop} ${classes.wrapper}`}>
          <Grid item xs>
            {writeReview}
          </Grid>
        </Grid>
      )}
    </>
  );
}

Summary.propTypes = {
  data: PropTypes.object,
  onFavorite: PropTypes.func,
  onShowReviewForm: PropTypes.func,
};

export default memo(Summary);
