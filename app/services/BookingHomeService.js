export default class BookingHomeService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getSalonNearMe(params) {
    return this.apiService.post('/search/v2', params);
  }

  getTopSalon(params) {
    return this.apiService.post('/search/top-salons', params);
  }

  getSalonsNew(params) {
    return this.apiService.post('/search/v2', params);
  }

  getBanners() {
    return this.apiService.get('/banners');
  }

  getCustomSalons(params) {
    return this.apiService.post('/custom-list-salon', params);
  }

  getTopCities() {
    return this.apiService.get('/search/top-cities');
  }

  getTopDeals() {
    return this.apiService.get('/search/top-deals');
  }

  getPromotion() {
    return this.apiService.post('/home/index', {
      v2: true,
    });
  }

  getTopBrands() {
    return this.apiService.get('/search/top-brands');
  }

  getGlobalConfig() {
    return this.apiService.get('/page-config');
  }
}
