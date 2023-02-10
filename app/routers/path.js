import { generatePath } from 'react-router';

const path = {
  home: '/',
  bookingHome: '/lam-dep',
  bookingSearch: '/lam-dep/tim-kiem',
  bookingSearchOld: '/tim-kiem',
  salonDetail: '/lam-dep/:salonId/:provinceName/:salonName',
  salonDetailOld: '/salon/:salonId/:provinceName/:salonName',
  salonDetailOldest: '/salon/:salonId/:salonName',
  booking: '/lam-dep/dat-cho/:salonId',
  personal: '/tai-khoan/trang-ca-nhan',
  profile: '/tai-khoan/thong-tin-ca-nhan',
  editProfile: '/tai-khoan/chinh-sua',
  addressBook: '/tai-khoan/dia-chi-giao-hang',
  addressBookNew: '/tai-khoan/dia-chi-giao-hang/them-moi',
  addressBookEdit: '/tai-khoan/dia-chi-giao-hang/:addressId/chinh-sua',
  notification: '/tai-khoan/thong-bao',
  bookingHistory: '/tai-khoan/lich-su-dat-cho',
  shoppingHistory: '/tai-khoan/lich-su-mua-hang',
  payment: '/tai-khoan/thanh-toan',
  favorite: '/tai-khoan/yeu-thich',
  support: '/tai-khoan/tro-giup',
  productHome: '/san-pham',
  productSearch: '/san-pham/tim-kiem',
  productDetail: '/san-pham/:productId/:productName',
  cart: '/san-pham/gio-hang',
  confirmOrder: '/san-pham/xac-nhan-don-hang',
  promotion: '/uu-dai',
  account: '/tai-khoan',
  history: '/lich-su',
  becomeSalonManager: '/dang-ky-salon',
  contactUs: '/lien-he',
  privacy: '/dieu-khoan-su-dung',
  news: '/tin-tuc/',
  operationRule: '/tin-tuc/quy-che-hoat-dong',
  termOfUse: '/tin-tuc/dieu-khoan-su-dung',
  privacyPolicy: '/tin-tuc/chinh-sach-bao-mat',
  notFound: '/not-found',
  help: '/tro-giup',
  wallet: '/tai-khoan/vi-tien',
  affiliate: '/register',
};

const createPath = (pattern, params) => generatePath(pattern, params);

export { path, createPath };