import APIService from './APIService';

export default class CommunicationService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getMyNotifications(page, limit, types) {
    return this.apiService.get('/user-notifications/mine', {
      page,
      limit,
      types,
    });
  }

  getSystemNotifications(page, limit) {
    return this.apiService.get('/user-notifications/system', { page, limit });
  }

  getShopNotificationCount() {
    return this.apiService.get('/user-notifications/count-all');
  }

  markRead(userNotificationId) {
    return this.apiService.post(
      `/user-notifications/mark-read/${userNotificationId}`,
    );
  }

  delete(userNotificationId) {
    return this.apiService.delete(`/user-notifications/${userNotificationId}`);
  }
}
