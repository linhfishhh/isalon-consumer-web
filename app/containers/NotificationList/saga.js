import { takeLatest, call, put } from 'redux-saga/effects';
import { legacyNotificationService, communicationService } from 'services';
import { SMALL_PAGE_SIZE } from 'utils/constants';
import {
  getNotificationsSuccess,
  getNotificationsFail,
  markAsReadNotificationSuccess,
  markAsReadNotificationFail,
  getNotificationCountSuccess,
  getNotificationCountFail,
  deleteNotificationSuccess,
  deleteNotificationFail,
  getMyShopNotificationsSuccess,
  getMyShopNotificationsFail,
  getSystemShopNotificationsSuccess,
  getSystemShopNotificationsFail,
  getShopNotificationCountSuccess,
  getShopNotificationCountFail,
  getCoinNotificationsSuccess,
  getCoinNotificationsFail,
} from './actions';
import {
  GET_NOTIFICATIONS_REQUEST,
  MARK_AS_READ_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_COUNT_REQUEST,
  DELETE_NOTIFICATION_REQUEST,
  GET_SHOP_NOTIFICATION_COUNT_REQUEST,
  GET_MY_SHOP_NOTIFICATIONS_REQUEST,
  GET_SYSTEM_SHOP_NOTIFICATIONS_REQUEST,
  GET_COIN_NOTIFICATIONS_REQUEST,
} from './constants';

export function* getNotifications({ payload = {} }) {
  try {
    const { page = 0 } = payload;
    const response = yield call(
      [legacyNotificationService, 'getNotifications'],
      page,
    );
    yield put(getNotificationsSuccess(response));
  } catch (err) {
    yield put(getNotificationsFail(err));
  }
}

export function* markAsReadNotification({ payload }) {
  try {
    const { notificationId, type } = payload;
    if (type === 'booking') {
      const response = yield call(
        [legacyNotificationService, 'markAsReadNotification'],
        notificationId,
      );
      yield put(getNotificationCountSuccess(response));
    } else if (type === 'shop' || type === 'coin') {
      yield call([communicationService, 'markRead'], notificationId);
    }
    yield put(markAsReadNotificationSuccess({ notificationId, type }));
  } catch (err) {
    yield put(markAsReadNotificationFail(err));
  }
}

export function* getNotificationCount() {
  try {
    const response = yield call([
      legacyNotificationService,
      'getNotificationCount',
    ]);
    yield put(getNotificationCountSuccess(response));
  } catch (err) {
    yield put(getNotificationCountFail(err));
  }
}

export function* deleteNotification({ payload }) {
  try {
    const { notificationId, type } = payload;
    if (type === 'booking') {
      const response = yield call(
        [legacyNotificationService, 'deleteNotification'],
        [notificationId],
      );
      yield put(getNotificationCountSuccess(response));
    } else if (type === 'shop' || type === 'coin') {
      yield call([communicationService, 'delete'], notificationId);
    }
    yield put(deleteNotificationSuccess({ notificationId, type }));
  } catch (err) {
    yield put(deleteNotificationFail(err));
  }
}

function* getMyShopNotifications({ payload = {} }) {
  try {
    const { page = 0, limit = SMALL_PAGE_SIZE } = payload;
    const types = 'UPDATE_ORDER';
    const response = yield call(
      [communicationService, 'getMyNotifications'],
      page,
      limit,
      types,
    );
    yield put(getMyShopNotificationsSuccess(response));
  } catch (err) {
    yield put(getMyShopNotificationsFail(err));
  }
}

function* getSystemNotifications({ payload = {} }) {
  try {
    const { page = 0, limit = SMALL_PAGE_SIZE } = payload;
    const response = yield call(
      [communicationService, 'getSystemNotifications'],
      page,
      limit,
    );
    yield put(getSystemShopNotificationsSuccess(response));
  } catch (err) {
    yield put(getSystemShopNotificationsFail(err));
  }
}

function* getShopNotificationCount() {
  try {
    const response = yield call([
      communicationService,
      'getShopNotificationCount',
    ]);
    yield put(getShopNotificationCountSuccess(response));
  } catch (err) {
    yield put(getShopNotificationCountFail(err));
  }
}

function* getCoinNotifications({ payload = {} }) {
  try {
    const { page = 0, limit = SMALL_PAGE_SIZE } = payload;
    const types = 'UPDATE_COIN,INVITEE_REWARD,INVITER_REWARD';
    const response = yield call(
      [communicationService, 'getMyNotifications'],
      page,
      limit,
      types,
    );
    yield put(getCoinNotificationsSuccess(response));
  } catch (err) {
    yield put(getCoinNotificationsFail(err));
  }
}

export default function* notificationSaga() {
  yield takeLatest(GET_NOTIFICATIONS_REQUEST, getNotifications);
  yield takeLatest(MARK_AS_READ_NOTIFICATION_REQUEST, markAsReadNotification);
  yield takeLatest(GET_NOTIFICATION_COUNT_REQUEST, getNotificationCount);
  yield takeLatest(DELETE_NOTIFICATION_REQUEST, deleteNotification);
  yield takeLatest(GET_MY_SHOP_NOTIFICATIONS_REQUEST, getMyShopNotifications);
  yield takeLatest(
    GET_SYSTEM_SHOP_NOTIFICATIONS_REQUEST,
    getSystemNotifications,
  );
  yield takeLatest(
    GET_SHOP_NOTIFICATION_COUNT_REQUEST,
    getShopNotificationCount,
  );
  yield takeLatest(GET_COIN_NOTIFICATIONS_REQUEST, getCoinNotifications);
}
