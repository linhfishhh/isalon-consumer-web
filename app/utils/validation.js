import isUndefined from 'lodash/isUndefined';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import isNaN from 'lodash/isNaN';

const isEmail = email => {
  if (email) {
    const pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
    );
    if (pattern.test(email)) {
      return true;
    }
    return false;
  }
  return false;
};

const isEmptyValue = value =>
  isUndefined(value) ||
  isNull(value) ||
  isNaN(value) ||
  `${value}`.length === 0;

const emptyValidate = (validate, object, keys, messages = []) => {
  const result = { ...validate };
  keys.forEach((key, index) => {
    if (
      (isEmpty(validate) || isUndefined(validate[key])) &&
      (isUndefined(object[key]) || isEmptyValue(object[key]))
    ) {
      result[key] = {
        error: true,
        helperText: `${key}IsRequired`,
        helperMessageText: messages[index],
      };
    }
  });
  return result;
};

const emailValidate = (validate, object, keys, messages = []) => {
  const result = { ...validate };
  keys.forEach((key, index) => {
    if (
      (isEmpty(validate) || isUndefined(validate[key])) &&
      (isUndefined(object[key]) || !isEmail(`${object[key]}`.trim()))
    ) {
      result[key] = {
        error: true,
        helperText: `${key}IsValidate`,
        helperMessageText: messages[index],
      };
    }
  });
  return result;
};

const validation = payload => {
  let result;
  payload.forEach(validate => {
    const { type, model, keys, messages } = validate;
    if (type === 'empty') {
      result = emptyValidate(result, model, keys, messages);
    }
    if (type === 'email') {
      result = emailValidate(result, model, keys, messages);
    }
  });
  return result;
};

export default validation;
