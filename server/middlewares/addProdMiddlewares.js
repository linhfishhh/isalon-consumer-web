const path = require('path');
const express = require('express');
const compression = require('compression');
const ejs = require('ejs');
const handler = require('./handler');

module.exports = function addProdMiddlewares(app, options) {
  const publicPath = options.publicPath || '/';
  const outputPath = options.outputPath || path.resolve(process.cwd(), 'www');

  // compression middleware compresses your server responses which makes them
  // smaller (applies also to assets). You can read more about that technique
  // and other good practices on official Express.js docs http://mxs.is/googmy
  app.use(compression());
  app.get('/', (req, res, next) => {
    render(res, next)(outputPath, { meta: handler.defaultMetaData });
  });
  app.use(publicPath, express.static(outputPath));

  app.get('/lam-dep/:salonId/:city/:name', function(req, res, next) {
    const { salonId } = req.params;
    handler.getSalonDetail(salonId).then(function(data) {
      const metaData = {
        'og:title': data.name,
        'og:image': data.cover,
        'og:description': handler.truncateWord(
          handler.stripHTMLTags(data.info),
          50,
        ),
      };
      render(res, next)(outputPath, { meta: metaData });
    });
  });

  app.get('/san-pham/:productId/:name', function(req, res, next) {
    const { productId } = req.params;
    handler.getProductDetail(productId).then(function(data) {
      const product = data.data;
      const metaData = {
        'og:title': product.name,
        'og:image': product.mainImage.imageLocation,
        'og:description': handler.truncateWord(
          handler.stripHTMLTags(product.description),
          50,
        ),
      };
      render(res, next)(outputPath, { meta: metaData });
    });
  });

  app.get('/san-pham', function(req, res, next) {
    const title =
      'Mỹ Phẩm Tóc Chính Hãng, Giá Luôn Tốt Nhất, Chỉ từ 99K | iShop';
    const des =
      'Cung cấp các mỹ phẩm dưỡng tóc chính hãng, với những dòng sản phẩm dưỡng tóc chuyên sâu, đáp ứng mọi nhu cầu về tóc. Chỉ từ 99K. Giá luôn tốt nhất!';
    const meta = {
      ...handler.defaultMetaData,
      'og:description': des,
      'og:title': title,
      description:
        'Cung cấp các mỹ phẩm dưỡng tóc chính hãng, với những dòng sản phẩm dưỡng tóc chuyên sâu, đáp ứng mọi nhu cầu về tóc. Chỉ từ 99K. Giá luôn tốt nhất!',
    };

    render(res, next)(outputPath, { meta, title });
  });

  app.get('*', (req, res, next) => {
    render(res, next)(outputPath, { meta: handler.defaultMetaData });
  });
};

const render = (res, next) => (outputPath, data) => {
  ejs.renderFile(path.resolve(outputPath, 'index.html'), data, function(
    error,
    response,
  ) {
    if (error) {
      next(error);
    } else {
      res.send(response);
    }
  });
};
