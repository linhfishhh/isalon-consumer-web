export default class BookingService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  addBooking(params) {
    return this.apiService.post('/booking/add', params);
  }

  addBookingV2(params) {
    return this.apiService.post('/booking/add/v2', params);
  }

  getBookingItems(salonId, params) {
    return this.apiService.post(`/booking/${salonId}/cart-items`, params);
  }

  updateBooking(params) {
    return this.apiService.post('/booking/update', params);
  }

  getHistories(params) {
    return this.apiService.post('/booking/history', params);
  }

  getHistoryDetail(params) {
    const { bookingId } = params;
    return this.apiService.post('/booking/detail', { id: bookingId });
  }

  getBookingWaiting() {
    return this.apiService.post('/booking/waiting');
  }

  cancelBooking(id) {
    return this.apiService.post('/booking/cancel', { id });
  }
}
