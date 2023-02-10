/*
 *
 * SalonDetail reducer
 *
 */
import produce from 'immer';
import get from 'lodash/get';
import set from 'lodash/set';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import keysIn from 'lodash/keysIn';
import saleImg from 'assets/images/sale.svg';
import allImg from 'assets/images/all.svg';
import {
  GET_SUCCESS,
  GET_FAIL,
  CLEAN_DATA,
  BOOKING_SUCCESS,
  FAVORITE_SUCCESS,
  FAVORITE_FAIL,
  FAVORITE_COLLECTION_SUCCESS,
  FAVORITE_COLLECTION_FAIL,
} from './constants';

export const initialState = {
  salonDetail: {},
  error: {},
  bookingSuccess: false,
};

const updateFavoriteCollection = (collection, payload) => {
  const { collectionId, liked } = payload;
  const result = collection.map(item =>
    set(item, 'liked', item.id === collectionId ? liked : item.liked),
  );
  return result;
};

const updateSalonDetail = detail => {
  const { cats, saleOff } = detail;
  const allService = cats.flatMap(item => item.services);
  const allCat = {
    name: 'Tất cả',
    image: allImg,
    count: allService.length,
    services: allService,
  };
  const newCats = [allCat, ...cats];
  if (!isEmpty(saleOff)) {
    const saleCat = {
      name: 'Khuyến mãi',
      image: saleImg,
      count: saleOff.length,
      services: saleOff,
    };
    newCats.unshift(saleCat);
  }
  const result = { ...detail, cats: newCats };
  return result;
};

const salonDetailReducer = (state = initialState, action) =>
  produce(state, draft => {
    const draftClone = draft;
    switch (action.type) {
      case GET_SUCCESS: {
        draftClone.salonDetail = updateSalonDetail(get(action, 'payload'));
        break;
      }
      case GET_FAIL:
      case FAVORITE_FAIL:
      case FAVORITE_COLLECTION_FAIL:
      case FAVORITE_SUCCESS: {
        const payload = get(action, 'payload', {});
        draftClone.salonDetail.liked = get(payload, 'liked', false);
        draftClone.salonDetail.likes = get(payload, 'likes', 0);
        break;
      }
      case FAVORITE_COLLECTION_SUCCESS: {
        draftClone.salonDetail.showcase = updateFavoriteCollection(
          state.salonDetail.showcase,
          get(action, 'payload'),
        );
        break;
      }
      case BOOKING_SUCCESS: {
        draftClone.bookingSuccess = true;
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

export default salonDetailReducer;
