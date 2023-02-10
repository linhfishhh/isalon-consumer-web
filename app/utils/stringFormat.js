import he from 'he';

export const currencyFormat = str =>
  str ? `${String(Math.abs(str)).replace(/(.)(?=(\d{3})+$)/g, '$1,')}₫` : '0₫';

export const currencyFormatExt = (str, separator = '.') =>
  str
    ? `${String(Math.abs(str)).replace(/(.)(?=(\d{3})+$)/g, `$1${separator}`)}`
    : '0';

export const coinFormat = str =>
  str
    ? `${String(Math.abs(str)).replace(/(.)(?=(\d{3})+$)/g, '$1.')} xu`
    : '0 xu';

export const phoneNumberFormat = phoneNumberString => {
  const cleaned = `${phoneNumberString}`.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{3})(\d{4})$/);
  if (match) {
    return `(${match[1]}) ${match[2]} ${match[3]} ${match[4]}`;
  }
  return phoneNumberString;
};

export const appendAreaCode = phone => `+84${phone.substr(1)}`;

export const convertToSlug = (str = '', separator = '-') => {
  // replace all special characters | symbols with a space
  let result = str
    .replace(/[`~!@#$%^&*()_\-+=[\]{};:'"\\|/,.<>?\s]/g, ' ')
    .toLowerCase();

  // replace Diacritics
  result = result.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // trim spaces at start and end of string
  result = result.replace(/^\s+|\s+$/gm, '');

  // replace đ character
  result = result.replace(/đ/g, 'd');

  // replace space with dash/hyphen
  result = result.replace(/\s+/g, separator);
  return result;
};

export const distanceFormat = distance => {
  if (distance && distance > 0) {
    const result = (distance / 1000.0).toFixed(1);
    return `${String(result).replace(/(.)(?=(\d{3})+$)/g, '$1,')}Km`;
  }
  return '';
};

export const numberFormat = str => {
  if (str) return String(str).replace(/(.)(?=(\d{3})+$)/g, '$1,');
  return 0;
};

export const convertToQueryString = params =>
  `?${Object.keys(params)
    .map(key => `${key}=${params[key]}`)
    .join('&')}`;

export const truncateWord = (str, number) =>
  str
    .split(' ')
    .splice(0, number)
    .join(' ');

export const stripHTMLTags = html =>
  he.unescape(
    html.replace(/(<([^>]+)>)/gi, '').replace(/(\r\n|\n|\r|\\n)/gm, ' '),
  );

export const queryStringFromString = str => {
  if (str) {
    const params = new URLSearchParams(str);
    const result = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const key of params.keys()) {
      result[key] = params.get(key);
    }
    return result;
  }
  return {};
};
