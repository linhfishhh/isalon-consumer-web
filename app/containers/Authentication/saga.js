import { takeLatest, call, put } from 'redux-saga/effects';
import get from 'lodash/get';
import { isNative } from 'utils/platform';
import sentryTracking from 'utils/sentryTracking';
import { authService, authLegacyService } from 'services';
import {
  // signInWithPhoneNumber,
  // fbVerifyCode,
  // getRecaptchaToken,
  setToken,
  setTokenLegacy,
  saveLoggedInUser,
  removeAllCookies,
  // signOut,
  getUUID,
  logoutFacebook,
} from 'utils/auth';
import { clearLocalStorage } from 'utils/localStorage';
import {
  FB_VERIFY_PHONE_REQUEST,
  LOGIN_REQUEST,
  LOGIN_SOCIAL_REQUEST,
  CREATE_ACCOUNT_REQUEST,
  VERIFY_PHONE_REQUEST,
  LOGOUT_REQUEST,
  VERIFY_TOKEN_REQUEST,
} from './constants';
import {
  fbVerifyPhoneSuccess,
  fbVerifyPhoneFail,
  loginSuccess,
  loginFail,
  logoutSuccess,
  logoutFail,
  verifyPhoneFail,
  verifyTokenSuccess,
  verifyTokenFail,
} from './actions';

export function* fbVerifyPhone({ payload }) {
  const { phone, /* retry = 0, */ success, failure } = payload;
  let recaptchaToken;
  const forceRetry = 1;
  // ! STOP USE FIREBASE AUTHENTICATION
  // let forceRetry = retry;

  // if (!isNative) {
  //   try {
  //     recaptchaToken = yield call(getRecaptchaToken);
  //   } catch (err) {
  //     console.log('function*fbVerifyPhone recaptcha failed -> err', err);
  //     forceRetry = 1;
  //   }
  // } else if (forceRetry === 0) {
  //   try {
  //     const verificationId = yield call(signInWithPhoneNumber, phone);
  //     console.log('function*fbVerifyPhone -> verificationId', verificationId);

  //     const sessionInfo = {
  //       data: {
  //         sessionInfo: verificationId,
  //       },
  //       type: 'firebase',
  //     };

  //     success(sessionInfo);
  //     fbVerifyPhoneSuccess();
  //     return;
  //   } catch (err) {
  //     forceRetry = 1;
  //     console.log('function*fbVerifyPhone -> can not signin firebase');
  //   }
  // }

  try {
    const sessionInfo = yield call(
      [authLegacyService, 'requestSMSVerificationCode'],
      recaptchaToken,
      phone,
      forceRetry,
    );
    success(sessionInfo);
    fbVerifyPhoneSuccess();
  } catch (err) {
    failure();
    sentryTracking.captureException(err);
    yield put(fbVerifyPhoneFail(err));
  }
}

export function* loginLegacy({ payload }) {
  try {
    const { phone, code, type, token } = payload;
    const uuid = getUUID();
    const response = yield call([authLegacyService, 'loginSms'], {
      phone,
      code,
      type,
      token,
      uuid,
    });
    const accessToken = get(response, 'login.token');
    const user = get(response, 'login.user');
    setTokenLegacy(accessToken);
    saveLoggedInUser(user);
    const secondaryToken = get(response, 'login.secondaryToken');
    setToken(secondaryToken);
    yield put(loginSuccess(user));
  } catch (err) {
    sentryTracking.captureException(err);
    yield put(loginFail(err));
  }
}

export function* loginSocialLegacy({ payload }) {
  try {
    const { data, accountNotExist } = payload;
    data.uuid = getUUID();
    const response = yield call([authLegacyService, 'loginSocial'], data);
    if (response.exist) {
      const accessToken = get(response, 'login.token');
      const user = get(response, 'login.user');
      setTokenLegacy(accessToken);
      saveLoggedInUser(user);
      const secondaryToken = get(response, 'login.secondaryToken');
      setToken(secondaryToken);
      yield put(loginSuccess(user));
    } else {
      accountNotExist();
    }
  } catch (err) {
    sentryTracking.captureException(err);
    yield put(loginFail(err));
  }
}

export function* createAccount({ payload }) {
  try {
    const request = {
      ...payload,
      uuid: getUUID(),
    };
    const response = yield call([authLegacyService, 'createAccount'], request);
    const accessToken = get(response, 'token');
    const user = get(response, 'user');
    setTokenLegacy(accessToken);
    saveLoggedInUser(user);
    const secondaryToken = get(response, 'secondaryToken');
    setToken(secondaryToken);
    yield put(loginSuccess(user));
  } catch (err) {
    sentryTracking.captureException(err);
    yield put(loginFail(err));
  }
}

export function* verifyPhone({ payload }) {
  const { data, success, failure } = payload;
  try {
    const response = yield call([authLegacyService, 'verifyPhone'], data);
    if (response) {
      success();
    } else {
      failure();
    }
  } catch (err) {
    failure();
    sentryTracking.captureException(err);
    yield put(verifyPhoneFail(err.response));
  }
}

export function* verifyToken() {
  try {
    const response = yield call([authLegacyService, 'verifyToken']);
    yield put(verifyTokenSuccess(response));
    saveLoggedInUser(response);
  } catch (err) {
    sentryTracking.captureException(err);
    verifyTokenFail(err);
  }
}

export function* logout() {
  try {
    yield call([authService, 'logout']);
    yield call(clearLocalStorage);
    yield call(removeAllCookies);
    yield put(logoutSuccess());
  } catch (err) {
    yield call(clearLocalStorage);
    yield call(removeAllCookies);
    yield put(logoutFail(err));
  }
  // yield call(signOut);
  if (isNative) {
    logoutFacebook();
  }
}

export default function* signInSaga() {
  yield takeLatest(FB_VERIFY_PHONE_REQUEST, fbVerifyPhone);
  yield takeLatest(LOGIN_REQUEST, loginLegacy);
  yield takeLatest(LOGIN_SOCIAL_REQUEST, loginSocialLegacy);
  yield takeLatest(CREATE_ACCOUNT_REQUEST, createAccount);
  yield takeLatest(VERIFY_PHONE_REQUEST, verifyPhone);
  yield takeLatest(LOGOUT_REQUEST, logout);
  yield takeLatest(VERIFY_TOKEN_REQUEST, verifyToken);
}
