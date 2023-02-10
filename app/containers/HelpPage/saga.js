import { takeLatest, call, put } from 'redux-saga/effects';
import { authLegacyService } from 'services';
import { getHelpSuccess, getHelpFail } from './actions';
import { GET_HELP_REQUEST } from './constants';

export function* getHelp() {
  try {
    const response = yield call([authLegacyService, 'getFaqs']);
    yield put(getHelpSuccess(response));
  } catch (err) {
    yield put(getHelpFail(err));
  }
}

export default function* saga() {
  yield takeLatest(GET_HELP_REQUEST, getHelp);
}
