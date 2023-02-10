import delivered from 'assets/icons/delivered.svg';
import progress from 'assets/icons/progress.svg';

export const radiusList = [1000, 1500, 2000];

export const unitSearch = {
  types: [
    { value: 'all', label: 'Toàn quốc' },
    { value: 'province', label: 'Quận/huyện' },
  ],
  valueWithIndex(index) {
    return this.types[index].value;
  },
  typeOfValue(value) {
    return this.types.find(item => item.value === value);
  },
  isProvince(value) {
    return this.types[1].value === value;
  },
  isAll(value) {
    return this.types[0].value === value;
  },
};

export const sortTypes = [
  { value: 'default', label: 'Sắp xếp mặc định' },
  { value: 'booking', label: 'Sắp xếp theo độ phổ biến' },
  { value: 'price', label: 'Sắp xếp theo giá' },
  { value: 'sale', label: 'Sắp xếp theo giảm giá' },
  { value: 'rating ', label: 'Sắp xếp theo đánh giá' },
];

export const viewTypes = {
  types: [
    { value: 'default', label: 'Tất cả' },
    { value: 'latest', label: 'Mới nhất' },
    { value: 'near_me', label: 'Gần tôi' },
    { value: 'most_booking', label: 'Đặt nhiều' },
  ],
  valueWithIndex(index) {
    return this.types[index].value;
  },
  typeOfValue(value) {
    return this.types.find(item => item.value === value);
  },
  isNearMe(value) {
    return this.types[2].value === value;
  },
  isDefault(value) {
    return this.types[0].value === value;
  },
};

export const searchTypes = {
  types: [
    {
      value: 'salon',
      label: 'Salon',
      placeholder: 'Tìm kiếm theo salon',
    },
    {
      value: 'service',
      label: 'Dịch vụ',
      placeholder: 'Tìm kiếm theo dịch vụ',
    },
  ],
  valueWithIndex(index) {
    return this.types[index].value;
  },
  typeOfValue(value) {
    return this.types.find(item => item.value === value);
  },
};

export const bookingStatus = {
  types: [
    { status: -4, name: 'Tất cả' },
    { status: 0, name: 'Chờ xử lý', color: '#ff931f' },
    { status: 2, name: 'Chờ thực hiện', color: '#F42C2C' },
    { status: 1, name: 'Chờ thanh toán', color: '#FF5C39' },
    { status: 3, name: 'Đã hoàn thành', color: 'green' },
    { status: -3, name: 'Hủy do quá hạn', color: '#999999' },
    { status: -2, name: 'Hủy bởi salon', color: '#999999' },
    { status: -1, name: 'Hủy bởi khách', color: '#999999' },
    { status: 4, name: 'Khách không đến', color: '#999999' },
  ],
  typeOfValue(value) {
    return this.types.find(item => item.status === value);
  },
};

export const shoppingStatus = {
  tabs: [
    {
      key: 'all',
      name: 'Tất cả',
    },
    {
      key: 'pending',
      name: 'Chờ vận chuyển',
      orderStatus: 'WAIT_FOR_SHIPPING',
    },
    {
      key: 'paid',
      name: 'Đã thanh toán',
      orderStatus: 'PAY_SUCCESS',
    },
    {
      key: 'cancel',
      name: 'Huỷ',
      orderStatus: 'CANCELLED',
    },
  ],
  orderStatus(status) {
    let color = '#eeeeee';
    let text = '';
    let background = '';
    switch (status) {
      case 'USER_CANCEL':
      case 'MANAGER_CANCEL':
        color = '#EC1C24';
        text = 'Đã huỷ';
        background = '#eeeeee';
        break;
      case 'SHIP_FAILED':
        color = '#F05D3E';
        text = 'Giao hàng thất bại';
        background = '#eeeeee';
        break;
      case 'RETURN':
        color = '#eeeeee';
        text = 'Trả lại hàng';
        background = '#fff';
        break;
      case 'UNCONFIRMED':
        color = '#fff';
        text = 'Đang xử lý';
        background = '#39B54A';
        break;
      case 'CONFIRMED':
      case 'SHIPPING':
        color = '#fff';
        text = 'Chờ vận chuyển';
        background = '#F05D3E';
        break;
      case 'SHIP_SUCCESS':
      case 'DONE':
        color = '#fff';
        text = 'Đã thanh toán';
        background = '#39B54A';
        break;
      default:
        break;
    }
    return { text, color, background };
  },
  shippingStatus(status) {
    let color = '';
    let text = '';
    let icon;
    switch (status) {
      case 'CONFIRMED':
      case 'UNCONFIRMED':
        color = '#F05D3E';
        text = 'Đang xử lý';
        icon = progress;
        break;
      case 'SHIPPING':
        color = '#F05D3E';
        text = 'Đang giao hàng';
        icon = delivered;
        break;
      case 'SHIP_SUCCESS':
      case 'DONE':
        color = '#F05D3E';
        text = 'Đã giao hàng';
        icon = progress;
        break;
      default:
        break;
    }
    return { text, color, icon };
  },
};

export const ImageOrientation = {
  types: { 3: 180, 6: 90, 8: 270 },
  valueOfType(type) {
    const value = this.types[type];
    if (!value) {
      return 0;
    }
    return value;
  },
};

export const transactionTypes = {
  types: [
    { status: 'INVITER_REWARD', name: 'Mời bạn bè thành công' },
    { status: 'INVITEE_REWARD', name: 'Đăng ký mới thành công' },
    { status: 'PRODUCT_PAY', name: 'Thanh toán sản phẩm' },
    { status: 'SERVICE_PAY', name: 'Thanh toán dịch vụ' },
    { status: 'PRODUCT_RETURN', name: 'Huỷ đơn hàng' },
    { status: 'SERVICE_RETURN', name: 'Huỷ đơn đặt chỗ' },
    { status: 'UPDATE_COIN', name: 'Cập nhật xu từ hệ thống' },
  ],
  typeOfValue(value) {
    return this.types.find(item => item.status === value);
  },
};

export const notificationType = {
  types: ['SYSTEM', 'BOOKING', 'SHOP', 'COIN', 'UNKNOWN'],
  typeOfValue(value) {
    let type = 'SYSTEM';
    switch (value) {
      case 'SYSTEM':
        type = 'SYSTEM';
        break;
      case 'UPDATE_ORDER':
        type = 'SHOP';
        break;
      // case 'INVITEE_REWARD':
      case 'INVITER_REWARD':
      case 'UPDATE_COIN':
        type = 'COIN';
        break;
      case 'order_created':
      case 'order_accept_pay_online':
      case 'order_accept_paid':
      case 'order_accept_pay_at_salon':
      case 'order_finished':
      case 'order_canceled':
      case 'order_rejected':
      case 'order_expired':
        type = 'BOOKING';
        break;
      default:
        type = 'UNKNOWN';
        break;
    }
    return type;
  },
};
