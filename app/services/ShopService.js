import { DEFAULT_PAGE_SIZE, SortType } from 'utils/constants';
import { join } from 'lodash';

export default class ShopService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getProductBestSelling() {
    const params = {
      sortType: SortType.HOT_ORDER,
      page: 0,
      limit: DEFAULT_PAGE_SIZE,
    };
    return this.apiService.get('/products/all', params);
  }

  getAllProducts(params) {
    return this.apiService.get('/products/all', params);
  }

  getCurrentFlashSale() {
    return this.apiService.get('/flash-sales/current');
  }

  getFlashSaleProducts(params) {
    return this.apiService.get('flash-sales/all-products', params);
  }

  getSuggestedProduct() {
    const params = {
      page: 0,
      limit: DEFAULT_PAGE_SIZE,
    };
    return this.apiService.get('/products/suggested-products', params);
  }

  getSpotlights() {
    return this.apiService.get('spotlights/home');
  }

  getHistories(params) {
    return this.apiService.get('orders', {
      ...params,
      limit: DEFAULT_PAGE_SIZE,
    });
  }

  getFavoritedProducts({ page, limit = DEFAULT_PAGE_SIZE }) {
    return this.apiService.get('/favorite', { page, limit });
  }

  removeFavoritedProduct(productId) {
    return this.apiService.delete(`/favorite/${productId}`);
  }

  addFavoritedProduct(productId) {
    return this.apiService.post(`/favorite/${productId}`);
  }

  getFavoriteProductCount() {
    return this.apiService.get('/favorite/count');
  }

  getProductDetail(productId) {
    return this.apiService.get(`/products/${productId}/details`);
  }

  getFeaturedBrands() {
    return this.apiService.get('/brands/featured');
  }

  getProductVariants({ productId, variantValueIds }) {
    return this.apiService.get(`/products/${productId}/product-variants/all`, {
      variantValueIds,
    });
  }

  getAllProductVariants(productId) {
    return this.apiService.get(`/products/${productId}/product-variants`);
  }

  getProductVariantValues(productId) {
    return this.apiService.get(`/products/${productId}/variant-values`);
  }

  addProductsToCart(payload) {
    return this.apiService.post('/cart/add-products', {
      cartItems: payload,
    });
  }

  getViewedProducts() {
    return this.apiService.get('/products/histories');
  }

  getPublicDiscountCodes() {
    return this.apiService.get('/gift-codes/all-public');
  }

  likeProduct(productId) {
    return this.apiService.post(`/favorite/${productId}`);
  }

  unlikeProduct(productId) {
    return this.apiService.delete(`/favorite/${productId}`);
  }

  removeProductFromCart(payload) {
    return this.apiService.post('/cart/remove-product', payload);
  }

  getCart() {
    return this.apiService.get('/cart');
  }

  removeCartItems(ids) {
    const idString = join(ids, ',');
    return this.apiService.delete('/cart/remove-items', {
      cartItemIds: idString,
    });
  }

  updateCartItem(payload) {
    return this.apiService.post('/cart/update-item', payload);
  }

  selectAllCartItems(payload) {
    return this.apiService.post('/cart/select-all', payload);
  }

  calculateCart(giftCode, location) {
    return this.apiService.post('/cart/calculate', {
      giftCode,
      location,
    });
  }

  prePay(request) {
    return this.apiService.post('/orders/pre-pay', request);
  }

  pay(request) {
    return this.apiService.post('/orders/pay', request);
  }

  getCartQuantity() {
    return this.apiService.get('/cart/quantity');
  }

  cancelOrder(params) {
    return this.apiService.post('/orders/cancel', params);
  }

  getOrderDetail(orderId) {
    return this.apiService.get(`/orders/${orderId}`);
  }
}
