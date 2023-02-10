/*
 *
 * ShoppingHistoryPage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import find from 'lodash/find';
import {
  GET_SHOPPING_HISTORY_REQUEST,
  GET_SHOPPING_HISTORY_SUCCESS,
  CANCEL_ORDER_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  shoppingHistory: {
    total: 0,
    content: [],
    isLast: true,
    currentPage: 0,
  },
};

const shoppingHistoryPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_SHOPPING_HISTORY_REQUEST: {
        const payload = get(action, 'payload');
        if (payload.page === 0) {
          cloneDraft.loading = true;
        }
        break;
      }
      case GET_SHOPPING_HISTORY_SUCCESS: {
        const payload = get(action, 'payload');
        const { last = false, content = [], pageable, totalElements } = payload;
        const { pageNumber = 0 } = pageable;
        const obj = get(cloneDraft, 'shoppingHistory', {});
        if (pageNumber === 0) {
          obj.content = content;
        } else if (obj.currentPage !== pageNumber) {
          obj.content = [...obj.content, ...content];
        }
        obj.isLast = last;
        obj.currentPage = pageNumber;
        obj.total = totalElements;
        cloneDraft.shoppingHistory = obj;
        cloneDraft.loading = false;
        break;
      }
      case CANCEL_ORDER_SUCCESS: {
        const payload = get(action, 'payload');
        const content = get(cloneDraft, 'shoppingHistory.content', []);
        const order = find(content, o => o.orderId === payload.orderId);
        if (order) {
          order.status = payload.status;
          cloneDraft.shoppingHistory = {
            content: [...content],
            isLast: get(cloneDraft, 'shoppingHistory.isLast', false),
            currentPage: get(cloneDraft, 'shoppingHistory.currentPage', 0),
          };
        }
        break;
      }
      default:
        break;
    }
  });

export default shoppingHistoryPageReducer;
