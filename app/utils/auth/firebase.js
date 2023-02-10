import * as firebase from 'firebase/app';
import { isNative, cordovaPlugins } from 'utils/platform';
// import sentryTracking from 'utils/sentryTracking';

// const recaptchaVerifier = (buttonId, callBack = () => {}) => {
//   window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(buttonId, {
//     size: 'invisible',
//     callback: response => {
//       callBack(response);
//     },
//   });
// };

// const signInWithPhoneNumber = async phone => {
//   try {
//     if (isNative) {
//       const plugins = cordovaPlugins();
//       const result = await plugins.firebase.auth.verifyPhoneNumber(
//         phone,
//         30000,
//       );
//       window.verificationId = result;
//     } else {
//       const appVerifier = window.recaptchaVerifier;
//       const confirmationResult = await firebase
//         .auth()
//         .signInWithPhoneNumber(phone, appVerifier);
//       window.confirmationResult = confirmationResult;
//     }
//   } catch (error) {
//     sentryTracking.captureException(error);
//     throw error;
//   }
// };

// const fbVerifyCode = async code => {
//   try {
//     if (isNative) {
//       const { verificationId } = window;
//       const plugins = cordovaPlugins();
//       await plugins.firebase.auth.signInWithVerificationId(
//         verificationId,
//         code,
//       );
//       const token = await plugins.firebase.auth.getIdToken();
//       return { idToken: token };
//     }
//     const { confirmationResult } = window;
//     const result = await confirmationResult.confirm(code);
//     const { user } = result;
//     const token = await user.getIdToken(true);
//     return { idToken: token };
//   } catch (error) {
//     sentryTracking.captureException(error);
//     throw error;
//   }
// };

const getRecaptchaToken = async () => {
  // const recaptchaToken = await window.recaptchaVerifier.verify();
  // return recaptchaToken;
  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    'sign-in-button',
    {
      size: 'invisible',
      callback: recaptchaToken => {
        console.log('getRecaptchaToken -> recaptchaToken', recaptchaToken);
        // reCAPTCHA solved, send recapchaToken and phone number to backend.
      },
    },
  );

  // render the rapchaVerifier.
  const widgetId = await window.recaptchaVerifier.render();
  window.recaptchaWidgetId = widgetId;
  const recaptchaToken = await window.recaptchaVerifier.verify();
  return recaptchaToken;
};

const signInWithPhoneNumber = async phone => {
  try {
    if (isNative) {
      const plugins = cordovaPlugins();
      const result = await plugins.firebase.auth.verifyPhoneNumber(
        phone,
        30000,
      );
      return result;
    }
  } catch (error) {
    // sentryTracking.captureException(error);
    throw error;
  }
  return null;
};

const currentUser = () => firebase.auth().currentUser;

const signOut = async () => {
  if (isNative) {
    const plugins = cordovaPlugins();
    await plugins.firebase.auth.signOut();
  } else {
    await firebase.auth().signOut();
  }
};

const signInWithFacebook = (success = () => {}, failure = () => {}) => {
  const provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('email');
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(result => {
      const token = result.credential.accessToken;
      success(token);
    })
    .catch(error => {
      failure(error);
    });
};

export {
  // recaptchaVerifier,
  signInWithPhoneNumber,
  // fbVerifyCode,
  getRecaptchaToken,
  signInWithFacebook,
  currentUser,
  signOut,
};
