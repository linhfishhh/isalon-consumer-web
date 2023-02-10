/*
 *
 * Popup actions
 *
 */

import { createSingleAction } from 'utils/reduxHelper';
import { SHOW_POPUP_ACTION } from './constants';

export const showPopupAction = createSingleAction(SHOW_POPUP_ACTION);
