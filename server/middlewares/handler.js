const axios = require('axios').default;
const path = require('path');
const he = require('he');

const apiProduction = process.env.API_ENV === 'production';
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    `internals/env/.env.${process.env.API_ENV}`,
  ),
});
const baseLegacyApi = process.env.LEGACY_API_END_POINT;
exports.baseLegacyApi = baseLegacyApi;

const baseApi = process.env.API_END_POINT;
exports.baseApi = baseApi;

exports.defaultMetaData = {
  'og:image': `https://${
    apiProduction ? '' : 'dev.legacy.'
  }isalon.vn/ic_logo.png`,
  'og:title': 'iSalon',
  'og:description':
    'iSalon ra đời là ứng dụng kết nối các salon làm đẹp với người dùng, giúp cho các salon có thể tiếp cận với người dùng một cách dễ dàng, hiệu quả, với mức chi phí tối thiểu.',
};

exports.truncateWord = (str, number) =>
  str
    .split(' ')
    .splice(0, number)
    .join(' ');

exports.stripHTMLTags = html =>
  he.unescape(
    html.replace(/(<([^>]+)>)/gi, '').replace(/(\r\n|\n|\r|\\n)/gm, ' '),
  );

exports.getSalonDetail = salonId =>
  new Promise((resolve, reject) => {
    const url = `${baseLegacyApi}/salon/${salonId}/detail`;
    axios
      .post(url)
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        reject(error);
      });
  });

exports.getProductDetail = productId =>
  new Promise((resolve, reject) => {
    const url = `${baseApi}/shop/products/${productId}/details`;
    axios
      .get(url, { headers: { 'Tenant-Id': 'isalon' } })
      .then(function(response) {
        resolve(response.data);
      })
      .catch(function(error) {
        console.log('error', error);
        reject(error);
      });
  });

exports.getShopImageUrl = imageId => `${baseApi}/storage/images/${imageId}/get`;
