import APIService from './APIService';
import AuthService from './AuthService';
import AuthLegacyService from './AuthLegacyService';
import ProfileService from './ProfileService';
import ImageService from './ImageService';
import SalonDetailService from './SalonDetailService';
import BlogService from './BlogService';
import BookingReviewService from './BookingReviewService';
import BookingHomeService from './BookingHomeService';
import BookingSearchService from './BookingSearchService';
import GoogleMapService from './GoogleMapService';
import BookingService from './BookingService';
import ShopService from './ShopService';
import ProductReviewService from './ProductReviewService';
import LegacyProfileService from './LegacyProfileService';
import LegacyNotificationService from './LegacyNotificationService';
import SearchService from './SearchService';
import CommunicationService from './CommunicationService';
import WalletService from './WalletService';

const legacyApiService = new APIService(
  {
    baseURL: `${process.env.LEGACY_API_END_POINT}`,
  },
  { isLegacy: true },
);

const uaaApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/uaa`,
});

const profileApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/profile`,
});

const shopApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/shop`,
});

const rISalonApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/r-isalon`,
});

const storageApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/storage`,
});

const communicationApiService = new APIService({
  baseURL: `${process.env.API_END_POINT}/communication`,
});

const blogApiService = new APIService({
  baseURL: `${process.env.BLOG_API_END_POINT}`,
});

const googleMapApiService = new APIService(
  {
    baseURL: `${process.env.GOOGLE_MAP_END_POINT}`,
  },
  { isOutside: true },
);

const authService = new AuthService(uaaApiService);
const authLegacyService = new AuthLegacyService(legacyApiService);
const profileService = new ProfileService(profileApiService);
const imageService = new ImageService(storageApiService);
const communicationService = new CommunicationService(communicationApiService);

const salonDetailService = new SalonDetailService(legacyApiService);
const blogService = new BlogService(blogApiService);
const bookingReviewService = new BookingReviewService(legacyApiService);
const bookingHomeService = new BookingHomeService(legacyApiService);
const bookingSearchService = new BookingSearchService(legacyApiService);
const bookingService = new BookingService(legacyApiService);

const googleMapService = new GoogleMapService(googleMapApiService);

const legacyProfileService = new LegacyProfileService(legacyApiService);
const legacyNotificationService = new LegacyNotificationService(
  legacyApiService,
);
const shopService = new ShopService(shopApiService);
const searchService = new SearchService(shopApiService);
const productReviewService = new ProductReviewService(shopApiService);
const walletService = new WalletService(rISalonApiService);

export {
  authService,
  authLegacyService,
  profileService,
  imageService,
  salonDetailService,
  blogService,
  bookingReviewService,
  bookingHomeService,
  bookingSearchService,
  googleMapService,
  bookingService,
  legacyProfileService,
  legacyNotificationService,
  shopService,
  searchService,
  productReviewService,
  communicationService,
  walletService,
};
