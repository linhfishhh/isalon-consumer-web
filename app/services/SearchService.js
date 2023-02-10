// import { DEFAULT_PAGE_SIZE } from 'utils/constants';

export default class SearchService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getSuggestionKeywords(keyword) {
    return this.apiService.get('search/suggestion-keywords', { keyword });
  }

  getSuggestionProducts(params) {
    return this.apiService.get('products/suggested-products', params);
  }

  getSearchHistory() {
    return this.apiService.get('search/latest');
  }

  clearSearchHistory() {
    return this.apiService.delete('search');
  }

  getHotKeywords() {
    return this.apiService.get('search/hot');
  }

  getFilterOptions() {
    return this.apiService.get('search/filter-fields');
  }

  findProducts(searchParams) {
    return this.apiService.get('products/all', searchParams);
  }
}
