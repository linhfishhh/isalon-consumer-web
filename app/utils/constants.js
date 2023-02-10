import { isIOS } from 'react-device-detect';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';
export const TENANT_ID = 'isalon';
export const DEFAULT_PAGE_SIZE = 20;
export const SMALL_PAGE_SIZE = 10;
export const NUMBER_PAGE_SIZE = 25;
export const NAVIGATION_HEIGHT = isIOS ? 44 : 56;
export const TABBAR_BOTTOM_HEIGHT = 50;

export const SpotlightTypes = {
  banner: 'banner',
  flashSale: 'flashsale',
  category: 'category',
  newProduct: 'newProduct',
  hotSale: 'bestSelling',
  targeted: 'targetedProduct',
  search: 'search',
};

export const SortType = {
  PRICE: 'PRICE',
  HOT_ORDER: 'HOT_ORDER',
  HOT_SALE: 'HOT_SALE',
  HOT_REVIEW: 'HOT_REVIEW',
  NEW_PRODUCT: 'NEW_PRODUCT',
};

export const SortTypes = [
  {
    id: 0,
    value: 'Mặc định',
  },
  {
    id: 1,
    sortType: SortType.NEW_PRODUCT,
    sortDirection: 'DESC',
    value: 'Hàng mới',
  },
  {
    id: 2,
    sortType: SortType.HOT_ORDER,
    sortDirection: 'DESC',
    value: 'Bán chạy',
  },
  {
    id: 3,
    sortType: SortType.HOT_SALE,
    sortDirection: 'DESC',
    value: 'Giảm giá nhiều',
  },
  {
    id: 4,
    sortType: SortType.PRICE,
    sortDirection: 'ASC',
    value: 'Giá thấp',
  },
  {
    id: 5,
    sortType: SortType.PRICE,
    sortDirection: 'DESC',
    value: 'Giá cao',
  },
  {
    id: 6,
    sortType: SortType.HOT_REVIEW,
    sortDirection: 'DESC',
    value: 'Sự nổi tiếng',
  },
];
