import { takeLatest, call, put } from 'redux-saga/effects';
import { productReviewService, imageService } from 'services';
import get from 'lodash/get';
import set from 'lodash/set';
import unset from 'lodash/unset';
import clone from 'lodash/clone';
import {
  getProductReviewsSuccess,
  getProductReviewsFail,
  likeReviewReplySuccess,
  likeReviewSuccess,
  likeReviewFail,
  unlikeReviewSuccess,
  unlikeReviewFail,
  likeReviewReplyFail,
  unlikeReviewReplySuccess,
  unlikeReviewReplyFail,
  sendCommentSuccess,
  sendCommentFail,
} from './actions';
import {
  GET_PRODUCT_REVIEWS_REQUEST,
  LIKE_REVIEW_REQUEST,
  UNLIKE_REVIEW_REQUEST,
  LIKE_REVIEW_REPLY_REQUEST,
  UNLIKE_REVIEW_REPLY_REQUEST,
  SEND_COMMENT_REQUEST,
} from './constants';

export function* getProductReviews({ payload }) {
  try {
    const response = yield call(
      [productReviewService, 'getAllReviews'],
      payload,
    );
    yield put(getProductReviewsSuccess(response));
  } catch (err) {
    yield put(getProductReviewsFail(err));
  }
}

export function* likeReview({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([productReviewService, 'likeReview'], id);
    yield put(likeReviewSuccess(response));
  } catch (err) {
    yield put(likeReviewFail(err));
  }
}

export function* unlikeReview({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([productReviewService, 'unlikeReview'], id);
    yield put(unlikeReviewSuccess(response));
  } catch (err) {
    yield put(unlikeReviewFail(err));
  }
}

export function* likeReviewReply({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([productReviewService, 'likeReply'], id);
    yield put(likeReviewReplySuccess(response));
  } catch (err) {
    yield put(likeReviewReplyFail(err));
  }
}

export function* unlikeReviewReply({ payload }) {
  try {
    const { id } = payload;
    const response = yield call([productReviewService, 'unlikeReply'], id);
    yield put(unlikeReviewReplySuccess(response));
  } catch (err) {
    yield put(unlikeReviewReplyFail(err));
  }
}

export function* sendComment({ payload }) {
  try {
    const dataRequest = clone(payload);
    const { images } = dataRequest;
    if (images && images.length) {
      const imageResponse = yield call(
        [imageService, 'createCollectionImage'],
        'products-review',
        images,
      );
      const id = get(imageResponse, 'data.collectionId');
      if (id) {
        set(dataRequest, 'imageCollectionId', id);
      }
    }
    unset(dataRequest, 'images');
    set(dataRequest, 'isAvailable', true);

    const response = yield call(
      [productReviewService, 'addReview'],
      dataRequest,
    );
    yield put(sendCommentSuccess(response));
  } catch (err) {
    yield put(sendCommentFail(err));
  }
}

// Individual exports for testing
export default function* productCommentSaga() {
  yield takeLatest(GET_PRODUCT_REVIEWS_REQUEST, getProductReviews);
  yield takeLatest(LIKE_REVIEW_REQUEST, likeReview);
  yield takeLatest(UNLIKE_REVIEW_REQUEST, unlikeReview);
  yield takeLatest(LIKE_REVIEW_REPLY_REQUEST, likeReviewReply);
  yield takeLatest(UNLIKE_REVIEW_REPLY_REQUEST, unlikeReviewReply);
  yield takeLatest(SEND_COMMENT_REQUEST, sendComment);
}
