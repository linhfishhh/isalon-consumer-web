/*
 *
 * BecomeSalonManager actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_HELP } from './constants';

export const [
  getHelpRequest,
  getHelpSuccess,
  getHelpFail,
] = createSideEffectAction(GET_HELP);
