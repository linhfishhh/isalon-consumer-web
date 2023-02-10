import Cookies from 'js-cookie';

const setCookie = (key, value) => {
  if (process.browser) {
    Cookies.set(key, value, {
      expires: 1,
      path: '/',
    });
  }
};

const removeCookie = key => {
  if (process.browser) {
    Cookies.remove(key, {
      expires: 1,
    });
  }
};

const removeAllCookies = () => {
  if (process.browser) {
    Object.keys(Cookies.get()).forEach(key => {
      removeCookie(key);
    });
  }
};

const getCookie = key => Cookies.get(key);

export { setCookie, removeCookie, removeAllCookies, getCookie };
