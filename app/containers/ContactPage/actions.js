/*
 *
 * BecomeSalonManager actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_CONTACT_PAGE_CFG, SEND_CONTACT } from './constants';

export const [
  getContactPageCfgRequest,
  getContactPageCfgSuccess,
  getContactPageCfgFail,
] = createSideEffectAction(GET_CONTACT_PAGE_CFG);

export const [
  sendContactRequest,
  sendContactSuccess,
  sendContactFail,
] = createSideEffectAction(SEND_CONTACT);
