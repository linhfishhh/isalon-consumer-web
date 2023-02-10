import APIService from './APIService';

export default class LegacyNotificationService {
  constructor(apiService = new APIService()) {
    this.apiService = apiService;
  }

  getNotifications(page = 1) {
    return this.apiService.post('/notification/list', { page });
  }

  getNotificationCount() {
    return this.apiService.post('/notification/count');
  }

  markAsReadNotification(notificationId) {
    return this.apiService.post(`/notification/${notificationId}/read`);
  }

  deleteNotification(ids) {
    return this.apiService.post('/notification/delete', { ids });
  }
}
