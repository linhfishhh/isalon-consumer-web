/*
 *
 * WalletPage reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import {
  GET_TRANSACTIONS_SUCCESS,
  GET_TRANSACTIONS_FAIL,
  GET_WALLET_REQUEST,
  GET_WALLET_SUCCESS,
  GET_WALLET_FAIL,
  NEED_UPDATE_WALLET,
  CLEAN_DATA,
  WALLET_INVITED,
} from './constants';

export const initialState = {
  wallet: {},
  needUpdate: true,
  transactions: {
    content: [],
    isLast: true,
    page: 0,
  },
  error: {},
};

const walletPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_WALLET_REQUEST:
        draftClone.needUpdate = false;
        break;

      case NEED_UPDATE_WALLET:
        draftClone.needUpdate = true;
        break;

      case GET_TRANSACTIONS_SUCCESS: {
        const data = get(action, 'payload.data', {});
        const { last, content, pageable } = data;
        const { pageNumber = 0 } = pageable;
        const { transactions } = draftClone;
        if (pageNumber === 0) {
          transactions.content = content;
        } else if (transactions.page !== pageNumber) {
          transactions.content = [...transactions.content, ...content];
        }
        transactions.isLast = last;
        transactions.page = pageNumber;
        draftClone.transactions = transactions;
        break;
      }
      case GET_WALLET_SUCCESS:
        draftClone.wallet = get(action, 'payload.data', []);
        break;
      case GET_WALLET_FAIL:
      case GET_TRANSACTIONS_FAIL:
        draftClone.error = get(action, 'payload', {});
        break;
      case CLEAN_DATA: {
        draftClone.wallet = initialState.wallet;
        draftClone.needUpdate = initialState.needUpdate;
        draftClone.transactions = initialState.transactions;
        draftClone.error = initialState.error;
        break;
      }
      case WALLET_INVITED:
        draftClone.wallet.isInvited = false;
        break;
      default:
        break;
    }
  });

export default walletPageReducer;
