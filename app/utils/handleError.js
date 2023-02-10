// import { removeToken } from 'utils/auth';

export const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
};

const handleError = error => {
  const toast = { variant: 'error' };
  if (error.response) {
    switch (error.response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        // removeToken();
        toast.messageId = 'userOrPasswordIncorrect';
        break;
      case HTTP_STATUS.NOT_FOUND:
        toast.messageId = 'error';
        break;
      default:
        toast.messageId = 'internalServerError';
        break;
    }
  } else {
    toast.messageId = 'networkError';
  }
};

export { handleError };
