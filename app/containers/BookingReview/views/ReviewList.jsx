/**
 *
 * Review
 *
 */
import React, { memo } from 'react';
import { isMobileOnly } from 'utils/platform';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Divider, Typography, Button } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { WriteReviewIcon } from 'assets/svgIcon';
import { StarBorder as StarBorderIcon } from '@material-ui/icons';

import ReviewItem from 'components/ReviewItem';
import EmptyPage from 'components/EmptyPage';
import CommentPlaceHolder from 'components/Placeholder/CommentPlaceHolder';

const useStyle = makeStyles(theme => ({
  wrapper: {
    border: isMobileOnly ? 'none' : `solid 1px ${theme.palette.borderColor[1]}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: isMobileOnly ? 0 : theme.shape.borderRadius + 2,
    margin: isMobileOnly ? theme.spacing(1, 0) : theme.spacing(5, 0, 0, 0),
    paddingBottom: theme.spacing(5),
  },
  summary: {
    padding: isMobileOnly ? theme.spacing(4, 2, 4, 4) : theme.spacing(8),
  },
  rating: {
    fontSize: isMobileOnly ? 30 : 40,
    marginRight: isMobileOnly ? 4 : theme.spacing(3),
  },
  ratingCount: {
    fontSize: 20,
  },
  button: {
    background: `linear-gradient(45deg, #f27e18 30%, ${
      theme.palette.primary.main
    } 90%)`,
    padding: theme.spacing(3, 4),
    color: theme.palette.textColor[6],
    fontSize: 17,
  },
  writeReview: {
    color: theme.palette.textColor[2],
  },
  iconReview: {
    marginLeft: isMobileOnly ? theme.spacing(2) : theme.spacing(4),
    width: 30,
    height: 30,
    color: isMobileOnly ? theme.palette.primary.main : 'inherit',
  },
  viewMore: {
    borderRadius: 30,
    marginTop: theme.spacing(4),
    paddingLeft: theme.spacing(20),
    paddingRight: theme.spacing(20),
    color: theme.palette.secondary.main,
    border: `solid 1px ${theme.palette.secondary.main}`,
  },
}));

function ReviewList(props) {
  const {
    rating,
    ratingCount,
    reviews,
    onLoadMore,
    onLike,
    onShowReviewForm,
  } = props;
  const classes = useStyle();
  return (
    <Grid container className={classes.wrapper}>
      <Grid item xs={12}>
        <Grid container justify="space-between" className={classes.summary}>
          <Grid item>
            <Typography display="inline" className={classes.rating}>
              {rating.toFixed(1)}
            </Typography>
            <Rating
              className={classes.star}
              readOnly
              value={rating}
              size="large"
              precision={0.5}
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
            />
            <Typography className={classes.ratingCount}>
              {`${ratingCount} Đánh giá`}
            </Typography>
            <Typography variant="caption">Còn bạn thì sao?</Typography>
          </Grid>
          <Grid item>
            <Button
              className={isMobileOnly ? classes.writeReview : classes.button}
              onClick={onShowReviewForm}
            >
              {isMobileOnly ? '' : 'Đánh giá'}
              <WriteReviewIcon className={classes.iconReview} color="inherit" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {isEmpty(reviews) && <CommentPlaceHolder />}
        {!isEmpty(reviews) && reviews.items.length === 0 && (
          <EmptyPage
            title="Hiện chưa có nhận xét nào cho Salon"
            subTitle="Cho người khác biết ý kiến của bạn và trở thành người đầu tiên nhận xét về dịch vụ của Salon này"
            height="auto"
          />
        )}
        {!isEmpty(reviews.items) &&
          reviews.items.map((item, index) => (
            <ReviewItem
              key={item.id || index}
              data={item}
              separator={index < reviews.items.length - 1}
              onLike={onLike}
            />
          ))}
      </Grid>
      {!isEmpty(reviews) && !reviews.isLast && (
        <Grid item xs={12} container justify="center">
          <Button className={classes.viewMore} onClick={onLoadMore}>
            Xem nhiều hơn
          </Button>
        </Grid>
      )}
    </Grid>
  );
}

ReviewList.defaultProps = {
  rating: 4.5,
  ratingCount: 100,
  reviews: {},
};

ReviewList.propTypes = {
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  reviews: PropTypes.object,
  onLoadMore: PropTypes.func,
  onLike: PropTypes.func,
  onShowReviewForm: PropTypes.func,
};
export default memo(ReviewList);
