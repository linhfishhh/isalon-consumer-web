import { createSelector } from 'reselect';
import { initialState } from './reducer';
import { CONTEXT } from './constants';
/**
 * Direct selector to the inviteFriends state domain
 */

const selectInviteFriendsDomain = state => state[CONTEXT] || initialState;

const makeSelectShowDialog = () =>
  createSelector(
    selectInviteFriendsDomain,
    substate => substate.showDialog,
  );

export { makeSelectShowDialog };
