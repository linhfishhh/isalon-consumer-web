import { isNative } from 'utils/platform';

export default class BookingReviewService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getReviews(variant, id, page = 0) {
    return this.apiService.post(`/${variant}/${id}/reviews`, { id, page });
  }

  likeReview(id) {
    return this.apiService.post(`/review/${id}/like`);
  }

  getServiceToReview(payload) {
    return this.apiService.post('review/services-to-review', payload);
  }

  getCrit(payload) {
    return this.apiService.post('booking/crits', payload);
  }

  sendReview(payload) {
    const { orderID, serviceID, title, content, crit, badge, images } = payload;
    const data = new FormData();

    data.append('title', title);
    data.append('content', content);
    data.append('order_id', orderID);
    data.append('service_id', serviceID);
    crit.forEach((item, index) => {
      data.append(`crits[${index}][id]`, item.id);
      data.append(`crits[${index}][rating]`, item.rating);
    });
    if (badge) {
      data.append('badge_id', badge.id);
    }
    if (images && images.length > 0) {
      images.forEach((image, index) => {
        if (isNative) {
          data.append(`images[${index}]`, image.file.blob, image.file.fileName);
        } else {
          data.append(`images[${index}]`, image.file);
        }
      });
    }
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    return this.apiService.post('review/new', data, config);
  }
}
