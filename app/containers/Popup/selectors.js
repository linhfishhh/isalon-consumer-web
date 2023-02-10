import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';

const selectPopupDomain = state => state[CONTEXT] || initialState;

const makeSelectOpenPopup = () =>
  createSelector(
    selectPopupDomain,
    substate => substate.open,
  );

export { makeSelectOpenPopup };
