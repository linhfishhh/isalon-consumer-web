import format from 'date-fns/format';
import { storageCryptData } from './localStorage/storage';
import storageKeys from './localStorage/storageKeys';

function getDisplayDatePopup() {
  return storageCryptData.getItem(storageKeys.POPUP, false);
}

function setDisplayDatePopup(date) {
  storageCryptData.setItem(storageKeys.POPUP, date, false);
}

function removeDisplayDatePopup() {
  storageCryptData.removeItem(storageKeys.POPUP);
}

export function resetShowPopup() {
  removeDisplayDatePopup();
}

export function canShowPopup() {
  const displayDate = getDisplayDatePopup();
  if (displayDate) {
    const currentDate = format(new Date(), 'MM/dd/yyyy');
    return currentDate !== displayDate;
  }
  return true;
}

export function popupDisplay() {
  const displayDate = format(new Date(), 'MM/dd/yyyy');
  setDisplayDatePopup(displayDate);
}
