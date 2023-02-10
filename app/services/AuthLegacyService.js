export default class AuthLegacyService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  login(payload) {
    return this.apiService.post('/social/v3/login', payload);
  }

  loginSocial(payload) {
    return this.apiService.post('/social/v2/login', payload);
  }

  createAccount(payload) {
    return this.apiService.post('/social/create-account', payload);
  }

  verifyPhone(payload) {
    return this.apiService.post('/verify-phone', payload);
  }

  verifyToken() {
    return this.apiService.post('/account/info');
  }

  getPrivacy() {
    return this.apiService.post('/get-join-tos');
  }

  getFaqs() {
    return this.apiService.post('/faqs');
  }

  requestSMSVerificationCode(recaptchaToken, phone, retry) {
    const params = {
      phone,
      retry,
    };
    if (recaptchaToken) {
      params.recaptchaToken = recaptchaToken;
    }
    return this.apiService.post('/social/v3/send-verification-code', params);
  }

  loginSms(payload) {
    return this.apiService.post('/social/v3/login-sms', payload);
  }
}
