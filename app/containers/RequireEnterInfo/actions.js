/*
 *
 * RequireEnterInfo actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';
import { UPDATE_EMAIL, CLEAN_DATA } from './constants';

export const [
  updateEmailRequest,
  updateEmailSuccess,
  updateEmailFail,
] = createSideEffectAction(UPDATE_EMAIL);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
