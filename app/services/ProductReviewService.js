import { DEFAULT_PAGE_SIZE } from 'utils/constants';

export default class ProductReviewService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getAllReviews({ productId, page, limit = DEFAULT_PAGE_SIZE }) {
    return this.apiService.get('/product-reviews', { productId, page, limit });
  }

  likeReview(id) {
    return this.apiService.post(`/product-reviews/${id}/like`);
  }

  unlikeReview(id) {
    return this.apiService.post(`/product-reviews/${id}/unlike`);
  }

  likeReply(id) {
    return this.apiService.post(`/product-review-messages/${id}/like`);
  }

  unlikeReply(id) {
    return this.apiService.post(`/product-review-messages/${id}/unlike`);
  }

  getAllFAQ({ productId, page, limit = DEFAULT_PAGE_SIZE }) {
    return this.apiService.get('/questions', { productId, page, limit });
  }

  addFAQ(data) {
    return this.apiService.post('/questions', data);
  }

  addReview(data) {
    return this.apiService.post('/product-reviews/create', data);
  }
}
