/*
 *
 * Personal reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_ORDER_DETAIL_SUCCESS,
  CLEAR_ORDER_DETAIL,
  CANCEL_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  orderDetail: {},
};

const orderDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_ORDER_DETAIL_SUCCESS: {
        const payload = get(action, 'payload', {});
        cloneDraft.orderDetail = payload;
        break;
      }
      case CLEAR_ORDER_DETAIL: {
        cloneDraft.orderDetail = {};
        break;
      }
      case CANCEL_ORDER_SUCCESS: {
        const payload = get(action, 'payload');
        if (payload.orderId === get(cloneDraft, 'orderDetail.orderId')) {
          const o = { ...cloneDraft.orderDetail };
          o.status = payload.status;
          cloneDraft.orderDetail = o;
        }
        break;
      }
      default:
        break;
    }
  });

export default orderDetailReducer;
