export default class SalonDetailService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getSalonDetail(id, data) {
    return this.apiService.post(`/salon/${id}/detail`, data);
  }

  getServiceDetail(id, data) {
    return this.apiService.post(`/service/${id}/detail`, data);
  }

  favoriteSalon(id) {
    return this.apiService.post(`/salon/${id}/like`);
  }

  favoriteSalonV2(id) {
    return this.apiService.post(`/salon/${id}/likeV2`);
  }

  favoriteCollection(id) {
    return this.apiService.post(`/showcase/${id}/like`);
  }

  getSalonOpenTime(id) {
    return this.apiService.post(`/salon/${id}/open-time-list`);
  }

  getSalonInfo(id) {
    return this.apiService.post(`/salon/${id}/info`);
  }
}
