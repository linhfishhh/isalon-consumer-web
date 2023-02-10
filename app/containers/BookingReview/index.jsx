/**
 *
 * BookingReview
 *
 */

import React, { memo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { useAuthentication, useDidUpdateEffect } from 'utils/hooks';
import { useInjectLoading } from 'utils/injectLoading';

import AlertDialog from 'components/AlertDialog';

import {
  getReviewsRequest,
  likeReviewRequest,
  getServiceToReviewRequest,
  getCritRequest,
  sendReviewRequest,
  cleanDataAction,
  showReviewFormAction,
} from './actions';
import { CONTEXT, SEND_REVIEW } from './constants';
import {
  makeSelectReviews,
  makeSelectServiceToReview,
  makeSelectCrit,
  makeSelectBadges,
  makeSelectReviewSuccess,
  makeSelectShowForm,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { ReviewList, ReviewForm } from './views';

const stateSelector = createStructuredSelector({
  reviews: makeSelectReviews(),
  serviceToReview: makeSelectServiceToReview(),
  crit: makeSelectCrit(),
  badges: makeSelectBadges(),
  reviewSuccess: makeSelectReviewSuccess(),
  showForm: makeSelectShowForm(),
});

export function BookingReview(props) {
  useInjectReducer({ key: CONTEXT, reducer });
  useInjectSaga({ key: CONTEXT, saga });
  useInjectLoading([SEND_REVIEW]);

  const { variant, rating, ratingCount, id } = props;

  const { authenticated, showSignInDialog } = useAuthentication();

  const {
    reviews,
    serviceToReview,
    crit,
    badges,
    reviewSuccess,
    showForm,
  } = useSelector(stateSelector);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(getReviewsRequest({ variant, id }));
  };

  useEffect(() => {
    if (variant === 'salon' && authenticated) {
      dispatch(getServiceToReviewRequest({ salon_id: id }));
    }
    return () => {
      if (variant === 'salon') {
        dispatch(cleanDataAction());
      } else {
        dispatch(cleanDataAction(['reviewSuccess', 'reviews.service']));
      }
    };
  }, []);

  useDidUpdateEffect(() => {
    fetchData();
  }, [authenticated]);

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (reviewSuccess) {
      fetchData();
    }
  }, [reviewSuccess]);

  const handleLikeReview = useCallback(
    reviewId => {
      if (authenticated) {
        dispatch(likeReviewRequest({ reviewId, variant }));
      } else {
        showSignInDialog();
      }
    },
    [authenticated],
  );

  const handleShowReviewForm = useCallback(() => {
    if (authenticated) {
      dispatch(showReviewFormAction(true));
    } else {
      showSignInDialog();
    }
  }, [authenticated]);

  const handleSendReview = useCallback(
    review => {
      if (authenticated) {
        dispatch(sendReviewRequest(review));
      } else {
        showSignInDialog();
      }
    },
    [authenticated],
  );

  const loadMoreReview = useCallback(() => {
    dispatch(getReviewsRequest({ variant, id, page: reviews[variant].next }));
  }, [reviews]);

  const onConfirmReviewSuccess = useCallback(() => {
    dispatch(showReviewFormAction(false));
    dispatch(cleanDataAction(['reviewSuccess']));
  }, []);

  const closeReviewForm = useCallback(() => {
    dispatch(showReviewFormAction(false));
  }, []);

  const getCrit = useCallback(payload => {
    dispatch(getCritRequest(payload));
  }, []);

  return (
    <>
      <ReviewList
        rating={rating}
        ratingCount={ratingCount}
        reviews={reviews[variant]}
        onLike={handleLikeReview}
        onShowReviewForm={handleShowReviewForm}
        onLoadMore={loadMoreReview}
      />
      <ReviewForm
        open={showForm}
        onClose={closeReviewForm}
        onSendReview={handleSendReview}
        serviceToReview={serviceToReview}
        onGetCrit={getCrit}
        crit={crit}
        badges={badges}
      />
      <AlertDialog
        open={reviewSuccess}
        title="Nhận xét đánh giá"
        description="Bạn đã gửi nhận xét đánh giá thành công"
        onConfirm={onConfirmReviewSuccess}
      />
    </>
  );
}

BookingReview.propTypes = {
  id: PropTypes.number,
  variant: PropTypes.oneOf(['salon', 'service']),
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
};

export default memo(BookingReview);
