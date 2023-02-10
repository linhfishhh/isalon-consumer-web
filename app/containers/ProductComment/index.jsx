/**
 *
 * ProductComment
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import globalStyles from 'assets/styles';
import get from 'lodash/get';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import AverageRate from './views/AverageRate';
import { makeSelectProductReviews } from './selectors';
import reducer from './reducer';
import saga from './saga';
import useStyles from './styles';
import { CONTEXT } from './constants';
import {
  getProductReviewsRequest,
  likeReviewRequest,
  unlikeReviewRequest,
  likeReviewReplyRequest,
  unlikeReviewReplyRequest,
} from './actions';
import Comments from './views/Comments';
import NoComment from './views/NoComment';

export function ProductComment(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });

  const classes = useStyles();
  const globalClasses = globalStyles();

  const {
    data,
    productReviews,
    getProductReviews,
    likeReview,
    unlikeReview,
    likeReviewReply,
    unlikeReviewReply,
  } = props;

  useEffect(() => {
    const productId = get(data, 'productId');
    if (productId) {
      getProductReviews({
        productId,
        page: 0,
        limit: 5,
      });
    }
  }, [data]);

  const onChangePage = useCallback(
    (evt, page) => {
      const productId = get(data, 'productId');
      if (productId) {
        getProductReviews({
          productId,
          page: page - 1,
          limit: 5,
        });
      }
    },
    [data],
  );

  const handleLikeAndUnlikeReview = useCallback(review => {
    if (review.isLiked) {
      unlikeReview({ id: review.productReviewId });
    } else {
      likeReview({ id: review.productReviewId });
    }
  }, []);

  const handleLikeAndUnlikeReply = useCallback(reply => {
    if (reply.isLiked) {
      unlikeReviewReply({ id: reply.productReviewMessageId });
    } else {
      likeReviewReply({ id: reply.productReviewMessageId });
    }
  }, []);

  const hasComment = get(productReviews, 'numberOfElements', 0) > 0;

  return (
    <div className={`${classes.root} ${classes.padding_4}`}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography className={globalClasses.groupTitle}>
            Đánh giá và nhận xét về sản phẩm
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AverageRate product={data} />
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography className={globalClasses.normalText}>
            Nhận xét về sản phẩm
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {hasComment ? (
            <Comments
              data={productReviews}
              onChangePage={onChangePage}
              onLikeOrUnlikeReview={handleLikeAndUnlikeReview}
              onLikeOrUnlikeReviewReply={handleLikeAndUnlikeReply}
            />
          ) : (
            <NoComment />
          )}
        </Grid>
      </Grid>
    </div>
  );
}

ProductComment.propTypes = {
  data: PropTypes.object,
  productReviews: PropTypes.object,
  getProductReviews: PropTypes.func,
  likeReview: PropTypes.func,
  unlikeReview: PropTypes.func,
  likeReviewReply: PropTypes.func,
  unlikeReviewReply: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  productReviews: makeSelectProductReviews(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getProductReviews: params => dispatch(getProductReviewsRequest(params)),
    likeReview: params => dispatch(likeReviewRequest(params)),
    unlikeReview: params => dispatch(unlikeReviewRequest(params)),
    likeReviewReply: params => dispatch(likeReviewReplyRequest(params)),
    unlikeReviewReply: params => dispatch(unlikeReviewReplyRequest(params)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProductComment);
