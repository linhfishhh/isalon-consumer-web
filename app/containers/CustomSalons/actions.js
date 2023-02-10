/*
 *
 * CustomSalons actions
 *
 */

import { createSideEffectAction } from 'utils/reduxHelper';
import { GET_CUSTOM_SALONS } from './constants';

export const [
  getCustomSalonsRequest,
  getCustomSalonsSuccess,
  getCustomSalonsFail,
] = createSideEffectAction(GET_CUSTOM_SALONS);
