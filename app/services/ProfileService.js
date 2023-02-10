import APIService from './APIService';

export default class ProfileService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getProfile() {
    return this.apiService.get('/profile', { fetchType: 'all' });
  }

  getProfileById(profileId) {
    return this.apiService.get('/profile', { profileId });
  }

  getProvinceList() {
    return this.apiService.get('/address/get-all-provinces');
  }

  getDistrictList(provinceId) {
    return this.apiService.get('/address/get-all-districts', { provinceId });
  }

  getWardList(districtId) {
    return this.apiService.get('/address/get-all-communes', { districtId });
  }

  getMyAddresses() {
    return this.apiService.get('/profile/get-all-addresses');
  }

  getMyAddress(payload) {
    const { addressId } = payload;
    return this.apiService.get(`/profile/address/${addressId}`);
  }

  addMyAddress(payload) {
    return this.apiService.post('/profile/address', payload);
  }

  updateMyAddress(payload) {
    return this.apiService.put('/profile/address', payload);
  }

  deleteMyAddress(payload) {
    return this.apiService.delete('/profile/address', payload);
  }
}
