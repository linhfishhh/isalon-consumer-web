import { path, createPath } from 'routers/path';
import { convertToSlug } from 'utils/stringFormat';

const hostName = process.env.ORIGIN;

export const shareFacebook = (link, success, failure) => {
  const options = { method: 'share', href: link };
  window.facebookConnectPlugin.showDialog(options, success, failure);
};

export const getLinkShareProduct = data => {
  const link = createPath(path.productDetail, {
    productId: `${data.productId}`,
    productName: convertToSlug(data.name),
  });
  return `${hostName}${link}`;
};

export const getLinkShareSalon = data => {
  const province = (data.address_cache || data.address).split(',').pop();
  const link = createPath(path.salonDetail, {
    salonId: `${data.id}`,
    salonName: convertToSlug(data.name),
    provinceName: convertToSlug(province),
  });
  return `${hostName}${link}`;
};

// data is object includes title, text, url
export const webShareApi = (data, success, failure) => {
  if (navigator.share) {
    navigator
      .share(data)
      .then(() => success())
      .catch(failure());
  }
};
