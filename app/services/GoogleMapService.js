export default class GoogleMapService {
  constructor(apiService) {
    this.apiService = apiService;
    this.key = process.env.GOOGLE_MAP_API_KEY;
  }

  getGeocoding(params) {
    return this.apiService.get('/geocode/json', { ...params, key: this.key });
  }
}
