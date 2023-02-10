import { setCookie, getCookie, removeCookie } from './cookies';
import {
  storageCryptJsonData,
  storageCryptData,
  storageKeys,
} from '../localStorage';
import { encryptData, decryptData } from '../crypto';

const cookies = {
  setItem: (key, value) => {
    try {
      setCookie(key, encryptData(value));
    } catch (err) {
      setCookie(key, value);
    }
  },
  getItem: key => {
    const data = getCookie(key);
    try {
      return decryptData(data);
    } catch (err) {
      return data;
    }
  },
  removeItem: key => removeCookie(key),
};

export const setTokenLegacy = token =>
  storageCryptData.setItem(storageKeys.OAUTH_TOKEN_LEGACY, token);
export const getTokenLegacy = () =>
  storageCryptData.getItem(storageKeys.OAUTH_TOKEN_LEGACY);
export const removeTokenLegacy = () =>
  storageCryptData.removeItem(storageKeys.OAUTH_TOKEN_LEGACY);

export const setToken = token =>
  storageCryptData.setItem(storageKeys.OAUTH_TOKEN, token);
export const getToken = () => storageCryptData.getItem(storageKeys.OAUTH_TOKEN);
export const removeToken = () =>
  storageCryptData.removeItem(storageKeys.OAUTH_TOKEN);

export const isAuthenticated = () => !!getToken() && !!getTokenLegacy();

export const setRefreshToken = refreshToken =>
  cookies.setItem(storageKeys.OAUTH_REFRESH_TOKEN, refreshToken);
export const getRefreshToken = () =>
  cookies.getItem(storageKeys.OAUTH_REFRESH_TOKEN);
export const removeRefreshToken = () =>
  cookies.removeItem(storageKeys.OAUTH_REFRESH_TOKEN);

export const saveLoggedInUser = user =>
  storageCryptJsonData.setItem(storageKeys.CURRENT_USER, user);
export const getLoggedInUser = () =>
  storageCryptJsonData.getItem(storageKeys.CURRENT_USER);
export const removeLoggedInUser = () =>
  storageCryptJsonData.removeItem(storageKeys.CURRENT_USER);
export const updateLoggedInUser = info => {
  const user = getLoggedInUser();
  const newUser = { ...user, ...info };
  storageCryptJsonData.setItem(storageKeys.CURRENT_USER, newUser);
};

export const getExpires = () => cookies.getItem(storageKeys.TOKEN_EXPIRE_TIME);
export const setExpires = expires =>
  cookies.setItem(storageKeys.TOKEN_EXPIRE_TIME, expires);

export const convertExpires = expires =>
  (new Date().getTime() + Number(expires) * 1000).toString();
