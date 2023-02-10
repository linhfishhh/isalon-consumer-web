export default class BlogService {
  constructor(apiService) {
    this.apiService = apiService;
  }

  getLatestBlogs() {
    return this.apiService.get('/get_recent_posts');
  }
}
