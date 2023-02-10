import APIService from './APIService';

export default class LegacyProfileService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProfile() {
    return this.apiService.post('/profile/get');
  }

  updateProfile(params) {
    return this.apiService.upload('/profile/update', params);
  }

  updatePhone(params) {
    return this.apiService.post('/profile/update-phone', params);
  }

  getFavoritedSalons() {
    return this.apiService.post('/fav/list');
  }

  removeFavoritedSalon(payload) {
    return this.apiService.post('/fav/salon/delete', payload);
  }

  removeFavoritedShowcase(payload) {
    return this.apiService.post('/fav/showcase/delete', payload);
  }

  getBecomeSalonManagerCfg() {
    return this.apiService.get('/become-salon-manager-config');
  }

  getContactPageCfg() {
    return this.apiService.get('/contact-config');
  }

  sendContact(params) {
    return this.apiService.post('/gui-lien-he', params);
  }

  updateEmail(params) {
    return this.apiService.post('/profile/update-email', params);
  }
}
