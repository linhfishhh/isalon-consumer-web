/*
 *
 * Cart reducer
 *
 */
import produce from 'immer';
import { get } from 'lodash';
import { GET_MY_ADDRESSES_SUCCESS } from 'containers/AddressBook/constants';
import {
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  ADD_PRODUCT_ITEM_SUCCESS,
  REMOVE_PRODUCT_ITEM_SUCCESS,
  REMOVE_CART_ITEM_SUCCESS,
  SELECT_CART_ITEM_SUCCESS,
  SELECT_ALL_CART_ITEMS_SUCCESS,
  SELECT_ADDRESS,
  GET_CART_QUANTITY_SUCCESS,
  SHOW_ERROR,
  LIKE_PRODUCT_SUCCESS,
  UNLIKE_PRODUCT_SUCCESS,
  CLEAR_CART_VIEW,
  CALCULATE_CART_SUCCESS,
  CALCULATE_CART_FAIL,
} from './constants';

export const initialState = {
  loading: true,
  cart: null,
  price: { product: 0, ship: 0, discount: 0, total: 0 },
  address: {},
  errors: [],
  giftCode: undefined,
  order: undefined,
  cartQuantity: 0,
  prePaySuccess: false,
};

/* eslint-disable default-case, no-param-reassign */
const cartReducer = (state = initialState, action) =>
  produce(state, draft => {
    const cloneDraft = draft;
    switch (action.type) {
      case GET_CART_FAIL: {
        cloneDraft.loading = false;
        break;
      }
      case GET_CART_SUCCESS:
      case ADD_PRODUCT_ITEM_SUCCESS:
      case REMOVE_PRODUCT_ITEM_SUCCESS:
      case SELECT_CART_ITEM_SUCCESS:
      case SELECT_ALL_CART_ITEMS_SUCCESS:
      case REMOVE_CART_ITEM_SUCCESS:
      case CALCULATE_CART_SUCCESS: {
        const cart = get(action, 'payload', {});
        cart.items.sort(
          (first, second) => first.cartItemId - second.cartItemId,
        );
        cloneDraft.loading = false;
        cloneDraft.cart = cart;
        cloneDraft.price.product = cart.estimatedItemPrice;
        cloneDraft.price.total = cart.estimatedTotalPrice;
        cloneDraft.price.discount = cart.discount;
        cloneDraft.price.ship = cart.shippingCost || 0;
        if (cart.errors && cart.errors.length > 0) {
          cloneDraft.errors = cart.errors.map(e => e.message);
        } else {
          cloneDraft.errors = [];
          cloneDraft.giftCode = cart.giftCode;
        }
        cloneDraft.cartQuantity = cart.quantity;
        break;
      }
      case SELECT_ADDRESS: {
        const address = get(action, 'payload', {});
        cloneDraft.address = address;
        break;
      }
      case GET_MY_ADDRESSES_SUCCESS: {
        const addresses = get(action, 'payload.data', []);
        let findDefault = addresses.find(address => address.isDefault);
        if (!findDefault && addresses.length > 0) {
          [findDefault] = addresses;
        }
        cloneDraft.addresses = addresses;
        cloneDraft.address = findDefault;
        break;
      }
      case GET_CART_QUANTITY_SUCCESS: {
        const { quantity } = get(action, 'payload', {});
        cloneDraft.cartQuantity = quantity;
        break;
      }
      case SHOW_ERROR: {
        const { message } = get(action, 'payload', {});
        cloneDraft.errors = [message];
        break;
      }
      case LIKE_PRODUCT_SUCCESS:
      case UNLIKE_PRODUCT_SUCCESS: {
        const { isFavorite, productId } = get(action, 'payload', {});
        const findIndex = state.cart.items.findIndex(
          item => item.product.productId === productId,
        );
        if (findIndex >= 0) {
          const arr = [...state.cart.items];
          const newItem = { ...arr[findIndex] };
          newItem.product.isFavorite = isFavorite;
          arr[findIndex] = newItem;
          cloneDraft.cart = { ...state.cart, items: arr };
        }
        break;
      }

      case CALCULATE_CART_FAIL: {
        const error = get(action, 'payload.error.response.data.message');
        if (error) {
          cloneDraft.errors = [error];
        } else {
          cloneDraft.errors = ['Có lỗi xảy ra'];
        }
        break;
      }
      case CLEAR_CART_VIEW: {
        cloneDraft.price = { product: 0, ship: 0, discount: 0, total: 0 };
        break;
      }
    }
  });

export default cartReducer;
