/*
 *
 * InviteFriends actions
 *
 */

import { createSingleAction } from 'utils/reduxHelper';

import { SHOW_DIALOG } from './constants';

export const showDialogAction = createSingleAction(SHOW_DIALOG);
