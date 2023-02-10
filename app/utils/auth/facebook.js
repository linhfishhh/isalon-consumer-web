const getUseInfo = (authResponse, success, failure) => {
  window.facebookConnectPlugin.api(
    '/me?fields=name,picture,email',
    ['public_profile', 'email'],
    response => {
      success({ ...response, ...authResponse });
    },
    failure,
  );
};

const login = (success, failure) => {
  window.facebookConnectPlugin.login(
    ['public_profile', 'email'],
    response => {
      if (response.authResponse) {
        getUseInfo(response.authResponse, success, failure);
      } else {
        failure(response.status);
      }
    },
    failure,
  );
};

export const loginFacebook = (success, failure) => {
  window.facebookConnectPlugin.getLoginStatus(response => {
    if (response.status === 'connected') {
      getUseInfo(response.authResponse, success, failure);
    } else {
      login(success, failure);
    }
  }, failure);
};

export const logoutFacebook = (success, failure) => {
  window.facebookConnectPlugin.logout(success, failure);
};
