/*
 *
 * BecomeSalonManager actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_PRIVACY } from './constants';

export const [
  getPrivacyRequest,
  getPrivacySuccess,
  getPrivacyFail,
] = createSideEffectAction(GET_PRIVACY);
