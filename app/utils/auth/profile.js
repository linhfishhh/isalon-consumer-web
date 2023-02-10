import isEmpty from 'lodash/isEmpty';
import { getLoggedInUser } from './auth';

export function needUpdateEmail() {
  const userInfo = getLoggedInUser();
  const { email } = userInfo;
  return isEmpty(email);
}
