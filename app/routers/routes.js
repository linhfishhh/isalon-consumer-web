import HomePage from 'containers/HomePage/Loadable';
import BookingHomePage from 'containers/BookingHomePage/Loadable';
import BookingSearchPage from 'containers/BookingSearchPage/Loadable';
import SalonDetail from 'containers/SalonDetail/Loadable';
import Personal from 'containers/Personal/Loadable';
import EditProfile from 'containers/EditProfile/Loadable';
import AddressBook from 'containers/AddressBook/Loadable';
import BookingPage from 'containers/BookingPage/Loadable';
import UpsertAddress from 'containers/UpsertAddress/Loadable';
import NotificationList from 'containers/NotificationList/Loadable';
import BookingHistoryPage from 'containers/BookingHistoryPage/Loadable';
import ShoppingHistoryPage from 'containers/ShoppingHistoryPage/Loadable';
import FavoritePage from 'containers/FavoritePage/Loadable';
import ProductHomePage from 'containers/ProductHomePage/Loadable';
import ProductDetailPage from 'containers/ProductDetailPage/Loadable';
import Cart from 'containers/Cart/Loadable';
import ProductSearchResult from 'containers/ProductSearchResult/Loadable';
import ConfirmOrder from 'containers/ConfirmOrder/Loadable';
import Promotion from 'containers/Promotion/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import HistoryPage from 'containers/HistoryPage/Loadable';
import BecomeSalonManager from 'containers/BecomeSalonManager/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import PrivacyPage from 'containers/PrivacyPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import HelpPage from 'containers/HelpPage/Loadable';
import WalletPage from 'containers/WalletPage/Loadable';

import { path } from 'routers/path';

const homeRoutes = {
  id: 'home',
  path: path.home,
  component: HomePage,
};

const bookingHomeRoutes = {
  id: 'bookingHome',
  path: path.bookingHome,
  component: BookingHomePage,
};

const productHomeRoutes = {
  id: 'productHome',
  path: path.productHome,
  component: ProductHomePage,
};

const productDetailRoutes = {
  id: 'productDetail',
  path: path.productDetail,
  component: ProductDetailPage,
};

const promotionRoutes = {
  id: 'promotion',
  path: path.promotion,
  component: Promotion,
};

const accountPageRoutes = {
  id: 'accountPage',
  path: path.account,
  component: AccountPage,
};

const historyRoutes = {
  id: 'history',
  path: path.history,
  component: HistoryPage,
};

const searchRoutes = {
  children: [
    {
      id: 'bookingSearchOld',
      path: path.bookingSearchOld,
      component: BookingSearchPage,
    },
    {
      id: 'bookingSearch',
      path: path.bookingSearch,
      component: BookingSearchPage,
    },
    {
      id: 'productSearch',
      path: path.productSearch,
      component: ProductSearchResult,
    },
    {
      id: 'cart',
      path: path.cart,
      component: Cart,
      private: true,
    },
    {
      id: 'confirmOrder',
      path: path.confirmOrder,
      component: ConfirmOrder,
      private: true,
    },
  ],
};

const salonDetailRoutes = {
  children: [
    {
      id: 'salonDetailOld',
      path: path.salonDetailOld,
      component: SalonDetail,
    },
    {
      id: 'salonDetailOldest',
      path: path.salonDetailOldest,
      component: SalonDetail,
    },
    {
      id: 'salonDetail',
      path: path.salonDetail,
      component: SalonDetail,
    },
  ],
};

const accountRoutes = {
  children: [
    {
      id: 'personal',
      path: path.personal,
      component: Personal,
      private: true,
    },
    {
      id: 'editProfile',
      path: path.editProfile,
      component: EditProfile,
      private: true,
    },
    {
      id: 'addressBook',
      path: path.addressBook,
      component: AddressBook,
      private: true,
    },
    {
      id: 'addressBookNew',
      path: path.addressBookNew,
      component: UpsertAddress,
      private: true,
    },
    {
      id: 'addressBookEdit',
      path: path.addressBookEdit,
      component: UpsertAddress,
      private: true,
    },
    {
      id: 'notification',
      path: path.notification,
      component: NotificationList,
      private: true,
    },
    {
      id: 'bookingHistory',
      path: path.bookingHistory,
      component: BookingHistoryPage,
      private: true,
    },
    {
      id: 'shoppingHistory',
      path: path.shoppingHistory,
      component: ShoppingHistoryPage,
      private: true,
    },
    {
      id: 'favorite',
      path: path.favorite,
      component: FavoritePage,
      private: true,
    },
    {
      id: 'wallet',
      path: path.wallet,
      component: WalletPage,
      private: true,
    },
  ],
};

const bookingRoutes = {
  id: 'booking',
  path: path.booking,
  component: BookingPage,
  private: true,
};

const otherRoutes = [
  {
    id: 'salonManager',
    path: path.becomeSalonManager,
    component: BecomeSalonManager,
    private: false,
  },
  {
    id: 'contactUs',
    path: path.contactUs,
    component: ContactPage,
    private: false,
  },
  {
    id: 'termOfUse',
    path: path.termOfUse,
    component: PrivacyPage,
    private: false,
  },
  {
    id: 'notFoundPage',
    path: path.notFound,
    component: NotFoundPage,
  },
];

const otherMobileRoutes = [
  {
    id: 'helpPage',
    path: path.help,
    component: HelpPage,
  },
  {
    id: 'termOfUse',
    path: path.termOfUse,
    component: PrivacyPage,
    private: false,
  },
];

const affiliateRoutes = {
  id: 'affiliate',
  path: path.affiliate,
  component: HomePage,
};

export default [
  homeRoutes,
  bookingHomeRoutes,
  searchRoutes,
  salonDetailRoutes,
  bookingRoutes,
  productHomeRoutes,
  productDetailRoutes,
  affiliateRoutes,
];

const personalRoutes = [accountRoutes];
export { personalRoutes, otherRoutes };

export const mobileTabsRoutes = [
  bookingHomeRoutes,
  productHomeRoutes,
  homeRoutes,
  historyRoutes,
  accountPageRoutes,
];

export const mobileRoutes = [
  searchRoutes,
  salonDetailRoutes,
  bookingRoutes,
  accountRoutes,
  promotionRoutes,
  productDetailRoutes,
  ...otherMobileRoutes,
];
