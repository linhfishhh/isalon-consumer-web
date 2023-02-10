export default class BookingSearchService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getSearchConfigs() {
    return this.apiService.post('/search/configs');
  }

  findLocation(params) {
    return this.apiService.post('/search/location-find', { ...params });
  }

  searchSalon(params) {
    return this.apiService.post('/search/v2', {
      ...params,
    });
  }

  getProvinceList() {
    return this.apiService.post('/search/location-list');
  }

  getSearchHistory() {
    return this.apiService.get('/history/get');
  }

  addSearchHistory(params) {
    return this.apiService.post('/history/add', params);
  }

  getSearchHints(params) {
    return this.apiService.post('/search/hints', params);
  }
}
