import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { bookingReviewService } from 'services';
import {
  GET_REVIEWS_REQUEST,
  LIKE_REVIEW_REQUEST,
  GET_SERVICE_TO_REVIEW_REQUEST,
  GET_CRIT_REQUEST,
  SEND_REVIEW_REQUEST,
} from './constants';
import {
  getReviewsSuccess,
  getReviewsFail,
  likeReviewSuccess,
  likeReviewFail,
  getServiceToReviewSuccess,
  getServiceToReviewFail,
  getCritSuccess,
  getCritFail,
  sendReviewSuccess,
  sendReviewFail,
} from './actions';

export function* getReviews({ payload }) {
  try {
    const { variant, id, page } = payload;
    const response = yield call(
      [bookingReviewService, 'getReviews'],
      variant,
      id,
      page,
    );
    yield put(getReviewsSuccess({ response, variant, page }));
  } catch (err) {
    yield put(getReviewsFail(err));
  }
}

export function* likeReview({ payload }) {
  try {
    const { reviewId, variant } = payload;
    const response = yield call([bookingReviewService, 'likeReview'], reviewId);
    yield put(likeReviewSuccess({ ...response, reviewId, variant }));
  } catch (err) {
    yield put(likeReviewFail(err));
  }
}

export function* getServiceToReview({ payload }) {
  try {
    const response = yield call(
      [bookingReviewService, 'getServiceToReview'],
      payload,
    );
    yield put(getServiceToReviewSuccess(response));
  } catch (err) {
    yield put(getServiceToReviewFail(err));
  }
}

export function* getCrit({ payload }) {
  try {
    const response = yield call([bookingReviewService, 'getCrit'], payload);
    yield put(getCritSuccess(response));
  } catch (err) {
    yield put(getCritFail(err));
  }
}

export function* sendReview({ payload }) {
  try {
    const { orderID, serviceID } = payload;
    const response = yield call([bookingReviewService, 'sendReview'], payload);
    yield put(sendReviewSuccess({ ...response, orderID, serviceID }));
  } catch (err) {
    yield put(sendReviewFail(err));
  }
}

export default function* salonDetailSaga() {
  yield takeEvery(GET_REVIEWS_REQUEST, getReviews);
  yield takeLatest(LIKE_REVIEW_REQUEST, likeReview);
  yield takeLatest(GET_SERVICE_TO_REVIEW_REQUEST, getServiceToReview);
  yield takeLatest(GET_CRIT_REQUEST, getCrit);
  yield takeLatest(SEND_REVIEW_REQUEST, sendReview);
}
