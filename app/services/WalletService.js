import { SMALL_PAGE_SIZE } from 'utils/constants';

export default class WalletService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getTransactions(page = 0, size = SMALL_PAGE_SIZE) {
    const params = {
      page,
      size,
    };
    return this.apiService.get('/user-wallets/transactions', params);
  }

  getCurrentWallet(params) {
    return this.apiService.get('/user-wallets/current', params);
  }

  getAffiliateInfo(params) {
    return this.apiService.get('/user-wallets/affiliate-info', params);
  }

  prePayBookingCoin(params) {
    return this.apiService.post('/payment/validate-book-service', params);
  }

  getAffiliateSettings() {
    return this.apiService.get('/settings/affiliate');
  }
}
