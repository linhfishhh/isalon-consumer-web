/*
 *
 * SalonServiceDetail actions
 *
 */

import { createSideEffectAction, createSingleAction } from 'utils/reduxHelper';

import { GET, CLEAN_DATA } from './constants';

export const [getRequest, getSuccess, getFail] = createSideEffectAction(GET);

export const cleanDataAction = createSingleAction(CLEAN_DATA);
