import isToday from 'date-fns/isToday';
import getHours from 'date-fns/getHours';
import getMinutes from 'date-fns/getMinutes';
import addHours from 'date-fns/addHours';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isEmpty from 'lodash/isEmpty';
import keysIn from 'lodash/keysIn';

const filterOpenTimeList = (date, times) => {
  if (isToday(date)) {
    const newDate = addHours(new Date(), 0);
    if (isToday(newDate)) {
      const hour = getHours(newDate);
      const minutes = getMinutes(newDate);
      const predicate = item => {
        const h = Number(item.split(':')[0].trim());
        const m = Number(item.split(':')[1].trim());
        if (h > hour) {
          return true;
        }
        if (h === hour && m > minutes) {
          return true;
        }
        return false;
      };
      const result = times.filter(item => predicate(item));
      return result;
    }
    return [];
  }
  return times;
};

const datetimeISOFormat = (time, strFormat = 'dd-MM-yyyy | HH:mm') =>
  format(parseISO(time), strFormat);

const datetimeFormat = (time, strFormat = 'dd-MM-yyyy | HH:mm') =>
  format(time, strFormat);

const dateFormat = (timeStamp, strFormat = 'dd/MM/yyyy') =>
  format(new Date(timeStamp), strFormat);

const getHolidays = openTime => {
  if (!isEmpty(openTime)) {
    const days = keysIn(openTime).flatMap(key =>
      isEmpty(openTime[key]) ? [key] : [],
    );
    return days;
  }
  return [];
};

export {
  filterOpenTimeList,
  datetimeISOFormat,
  datetimeFormat,
  dateFormat,
  getHolidays,
};
