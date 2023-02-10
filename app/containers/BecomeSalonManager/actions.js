/*
 *
 * BecomeSalonManager actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_BECOME_SALON_MANAGER_CFG } from './constants';

export const [
  getBecomeSalonManagerCfgRequest,
  getBecomeSalonManagerCfgSuccess,
  getBecomeSalonManagerCfgFail,
] = createSideEffectAction(GET_BECOME_SALON_MANAGER_CFG);
