/*
 *
 * SalonServiceDetail reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import { GET_SUCCESS, GET_FAIL, CLEAN_DATA } from './constants';

export const initialState = {
  serviceDetail: {},
  error: {},
};

const salonServiceDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_SUCCESS: {
        draftClone.serviceDetail = get(action, 'payload');
        break;
      }
      case GET_FAIL: {
        draftClone.error = get(action, 'payload');
        break;
      }
      case CLEAN_DATA: {
        const payload = get(action, 'payload');
        forEach(isEmpty(payload) ? keysIn(draftClone) : payload, key => {
          set(draftClone, key, initialState[key]);
        });
        break;
      }
      default:
        break;
    }
  });

export default salonServiceDetailReducer;
