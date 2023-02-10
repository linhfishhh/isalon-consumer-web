import { createSingleAction } from 'utils/reduxHelper';

import { SHOW_LOADING, HIDE_LOADING } from './constants';

export const showLoadingAction = createSingleAction(SHOW_LOADING);
export const hideLoadingAction = createSingleAction(HIDE_LOADING);
