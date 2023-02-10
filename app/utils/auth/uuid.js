import { v1 } from 'uuid';
import { storageKeys } from '../localStorage';

export const uuidExists = () => !!getUUID();

export const setUUID = uuid => localStorage.setItem(storageKeys.UUID, uuid);
export const getUUID = () => localStorage.getItem(storageKeys.UUID);
export const removeUUID = () => localStorage.removeItem(storageKeys.UUID);

export const createUUID = () => {
  if (!uuidExists()) {
    const uuidV1 = v1();
    setUUID(uuidV1);
  }
};
